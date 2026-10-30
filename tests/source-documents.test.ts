import {EventEmitter} from 'node:events';
import {describe, expect, it, vi, afterEach} from 'vitest';
import {createSourceDocumentStore, createSourceDocumentProvider, sourceDocumentStorageId} from '../src/source-documents.js';
import {getSourceDocumentRegistry, encodeSourceDocumentReference, decodeSourceDocumentReference, sourceDocumentRegistrySymbol} from '../src/composition.js';
import {SourceDocumentNamedDataProvider} from '../src/source-named-data-provider.js';
import {DocumentDataExtension} from '../src/extension.js';

function fixture() {
  const runtime = Object.assign(new EventEmitter(), {extensionStorage: {} as Record<string, unknown>, targets: [{isOriginal:true,name:'Stage'}], dirty:0,
    emitProjectChanged(this: EventEmitter & {dirty:number}) {this.dirty++;this.emit('PROJECT_CHANGED');}});
  const vm = {runtime, stopAll() {runtime.emit('PROJECT_STOP_ALL');runtime.targets=runtime.targets.filter(target=>target.isOriginal);}};
  const store = createSourceDocumentStore(vm);
  return {runtime,vm,store};
}
const yaml = '# original\r\nvalue: 1 # keep\r\n';
const input = {id:'settings',filename:'settings.yaml',format:'yaml' as const,source:yaml};
afterEach(()=>vi.unstubAllGlobals());

describe('persistent YAML/JSON source documents',()=>{
  it('keeps raw source, comments, CRLF, filenames and distinct document identities through an SB3 JSON roundtrip',()=>{
    const f=fixture();f.store.put(input);const json=' { "value" : 1 } \r\n';f.store.put({id:'json',filename:'same-name.yaml',format:'json',source:json});
    const serialized=JSON.stringify(f.runtime.extensionStorage);const reload=fixture();reload.runtime.extensionStorage=JSON.parse(serialized);reload.runtime.emit('PROJECT_LOADED');
    expect(reload.store.read('settings').source).toBe(yaml);expect(reload.store.read('json')).toMatchObject({format:'json',filename:'same-name.yaml',source:json});
    f.vm.stopAll();expect(f.store.read('settings').source).toBe(yaml);f.store.dispose();reload.store.dispose();
  });
  it('validates through the owner codec and Schema2020 before changing stored source',()=>{
    const f=fixture();f.store.put(input);const before=JSON.stringify(f.runtime.extensionStorage);
    expect(()=>f.store.put({...input,source:'value: [broken'})).toThrow();expect(JSON.stringify(f.runtime.extensionStorage)).toBe(before);
    f.store.put({id:'typed',filename:'typed.json',format:'json',source:'[1,"two"]',schema:{id:'https://example.invalid/tuple.schema.json',schema:{$schema:'https://json-schema.org/draft/2020-12/schema',type:'array',prefixItems:[{type:'number'},{type:'string'}],items:false}}});
    const typed=f.store.read('typed');expect(()=>f.store.put({...typed,source:'["wrong","two"]'})).toThrow();expect(f.store.read('typed')).toEqual(typed);f.store.dispose();
  });
  it('does not serialize or dirty an unchanged document and never mutates a returned read snapshot',()=>{
    const f=fixture();f.store.put(input);const before=f.runtime.dirty;const document=f.store.read('settings');expect(Object.isFrozen(document)).toBe(true);
    f.store.put(input);expect(f.runtime.dirty).toBe(before);expect(f.store.read('settings').revision).toBe('1');f.store.dispose();
  });
  it('uses one dirty notification and preserves all other documents on a semantic source edit',async()=>{
    const f=fixture();f.store.put(input);f.store.put({id:'other',filename:'other.json',format:'json',source:'{"keep":true}'});
    const provider=createSourceDocumentProvider(f.vm),adapter=provider.open('settings'),snapshot=adapter.capture(),other=f.store.read('other');
    const before=f.runtime.dirty;let notices=0;const stop=f.store.subscribe(()=>notices++);
    const edited='# original\r\nvalue: 2 # keep\r\n';await adapter.commit(snapshot,await adapter.prepare(snapshot,edited));
    expect(f.store.read('settings').source).toBe(edited);expect(f.store.read('other')).toEqual(other);expect(f.runtime.dirty-before).toBe(1);expect(notices).toBe(1);
    stop();provider.dispose?.();f.store.dispose();
  });
  it('rejects stale source, document removal and project replacement including identical data',async()=>{
    for(const mode of ['edit','remove','reload']as const){const f=fixture();f.store.put(input);const p=createSourceDocumentProvider(f.vm),a=p.open('settings'),s=a.capture(),candidate=await a.prepare(s,yaml+'# pending\r\n');
      if(mode==='edit')f.store.put({...input,source:'value: 3\n'});else if(mode==='remove')f.store.remove('settings');else{f.runtime.extensionStorage=JSON.parse(JSON.stringify(f.runtime.extensionStorage));f.runtime.emit('PROJECT_LOADED');}
      const before=JSON.stringify(f.runtime.extensionStorage);await expect(a.commit(s,candidate)).rejects.toThrow();expect(JSON.stringify(f.runtime.extensionStorage)).toBe(before);p.dispose?.();f.store.dispose();}
  });
  it('rejects forged candidates and closed adapters without changing canonical source',async()=>{
    const f=fixture();f.store.put(input);const p=createSourceDocumentProvider(f.vm),a=p.open('settings'),s=a.capture();
    await expect(a.commit(s,{source:'value: 9\n'})).rejects.toThrow();a.dispose();await expect(a.prepare(s,'value: 9\n')).rejects.toThrow();expect(f.store.read('settings').source).toBe(yaml);p.dispose?.();f.store.dispose();
  });
  it('preserves static bundle root/components identities and an existing nonenumerable owner alias',async()=>{
    const f=fixture();const bundle={components:{}as Record<string,unknown>};f.runtime.extensionStorage={bundle};
    Object.defineProperty(f.runtime.extensionStorage,sourceDocumentStorageId,{enumerable:false,configurable:true,get:()=>bundle.components[sourceDocumentStorageId],set:value=>{bundle.components[sourceDocumentStorageId]=value;}});
    f.store.put(input);const root=f.runtime.extensionStorage,owner=bundle.components[sourceDocumentStorageId];const p=createSourceDocumentProvider(f.vm),a=p.open('settings'),s=a.capture();await a.commit(s,await a.prepare(s,'value: 2\r\n'));
    expect(f.runtime.extensionStorage).toBe(root);expect(root.bundle).toBe(bundle);expect(bundle.components[sourceDocumentStorageId]).toBe(owner);expect(f.store.read('settings').source).toBe('value: 2\r\n');p.dispose?.();f.store.dispose();
  });
  it('propagates HTTPS docs and inline Schema metadata while rejecting unsafe documentation URLs',()=>{
    const f=fixture();const docsURL='https://example.invalid/docs#yaml';f.store.put({...input,docsURL,schema:{id:'https://example.invalid/schema',schema:{type:'object'}}});
    const p=createSourceDocumentProvider(f.vm);expect(p.list()[0]).toMatchObject({documentId:'settings',format:'yaml',docsURL,schema:{id:'https://example.invalid/schema'}});
    for(const docsURL of ['http://example.invalid','javascript:alert(1)','https://user:password@example.invalid','not a URL'])expect(()=>f.store.put({...input,docsURL})).toThrow();
    expect(f.store.read('settings').docsURL).toBe(docsURL);p.dispose?.();f.store.dispose();
  });
  it('releases provider listeners and adapter sessions without deleting source documents',()=>{
    const f=fixture();f.store.put(input);const p=createSourceDocumentProvider(f.vm),a=p.open('settings');expect(f.runtime.listenerCount('PROJECT_LOADED')).toBe(2);p.dispose?.();expect(a.inspect().available).toBe(false);expect(f.runtime.listenerCount('PROJECT_LOADED')).toBe(1);expect(f.store.read('settings').source).toBe(yaml);f.store.dispose();expect(f.runtime.listenerCount('PROJECT_LOADED')).toBe(0);
  });
});

describe('canonical registry compatibility',()=>{
  it('preserves format/docs metadata and the legacy reference encoding under a single VM symbol',()=>{
    const f=fixture();f.store.put({...input,format:'json',source:'{"x":1}',docsURL:'https://example.invalid/docs'});const p=createSourceDocumentProvider(f.vm);const r=getSourceDocumentRegistry(f.vm);const off=r.register(p);
    expect(decodeSourceDocumentReference(encodeSourceDocumentReference({providerId:'document-data',documentId:'settings'}))).toEqual({providerId:'document-data',documentId:'settings'});
    expect(r.list()[0]).toMatchObject({format:'json',docsURL:'https://example.invalid/docs'});expect(getSourceDocumentRegistry(f.vm)).toBe(r);off();r.dispose();f.store.dispose();
  });
  it('refuses an actual legacy v1 registry that silently drops native format rather than creating a second registry',async()=>{
    const {createProviderRegistry}=await import(new URL('./fixtures/legacy-embedded-yaml/registry.js', import.meta.url).href);
    const vm={};const legacy=createProviderRegistry();Object.defineProperty(vm,sourceDocumentRegistrySymbol,{value:legacy,configurable:true});
    expect(()=>getSourceDocumentRegistry(vm)).toThrow(/incompatible/i);expect(Object.getOwnPropertyDescriptor(vm,sourceDocumentRegistrySymbol)?.value).toBe(legacy);legacy.dispose();
  });
});

describe('native source blocks and Named Data',()=>{
  function scratch(vm:ReturnType<typeof fixture>['vm']){return {BlockType:{COMMAND:'command',REPORTER:'reporter',BOOLEAN:'boolean',HAT:'hat'},ArgumentType:{STRING:'string'},Cast:{toString:(value:unknown)=>String(value)},translate:(value:string)=>value,vm};}
  it('captures DOCUMENT_SOURCE once and leaves legacy HTML/Markdown stop cleanup intact',()=>{
    const f=fixture();vi.stubGlobal('Scratch',scratch(f.vm));vi.stubGlobal('DOCUMENT_SOURCE',false);const disabled=new DocumentDataExtension(false);vi.stubGlobal('DOCUMENT_SOURCE',true);expect(disabled.getInfo().blocks).toEqual([]);
    const extension=new DocumentDataExtension(true);const target={};extension.parseMarkdown({NAME:'legacy',TEXT:'# transient'}, {target});extension.createYamlSource({NAME:'settings',FILENAME:'settings.yaml',TEXT:yaml});
    vi.stubGlobal('DOCUMENT_SOURCE',false);f.vm.stopAll();expect(extension.hasDocument({NAME:'legacy'},{target})).toBe(false);expect(extension.getSourceDocument({NAME:'settings'})).toBe(yaml);expect(extension.sourceDocument()).toBe(false);
    expect(extension.sourceDocumentMenu()[0]?.text).toBe('settings.yaml');void extension.dispose();void disabled.dispose();f.store.dispose();
  });
  it('serves raw YAML/JSON through project-scoped readonly Named Data without cross-format conversion',()=>{
    const f=fixture();f.store.put(input);f.store.put({id:'json',filename:'settings.json',format:'json',source:' {"x":1}\r\n'});const provider=new SourceDocumentNamedDataProvider(f.store);const project={};
    const ref={namespace:'document-source',kind:'document' as const,scope:'project' as const,name:'settings'};
    const body=provider.openBody(ref,'yaml',{project});expect(new TextDecoder().decode(body.body as Uint8Array)).toBe(yaml);expect(body.nativeRepresentation).toBe('yaml');expect(()=>provider.openBody(ref,'json',{project})).toThrow();
    provider.clearSession();expect(f.store.read('settings').source).toBe(yaml);expect(new TextDecoder().decode(provider.openBody({...ref,name:'json'},'json',{project}).body as Uint8Array)).toBe(' {"x":1}\r\n');provider.release();f.store.dispose();
  });
});

describe('owner representation ports',()=>{
  it('snapshots representation metadata and forwards prepare/commit only while the provider remains active',async()=>{
    const f=fixture(),registry=getSourceDocumentRegistry(f.vm);let committed=0,closed=0;
    const provider={id:'converter',list:()=>[{documentId:'one',filename:'one.yaml',activeRepresentation:'source',representations:[{kind:'yaml-blocks',label:'YAML blocks',fromSource:true,toSource:true}]}],open:()=>({inspect:()=>({available:true}),capture:()=>({source:'value: 1\n'}),prepare:async()=>({source:'value: 1\n'}),commit:async()=>({source:'value: 1\n'}),prepareRepresentation:async()=>({summary:'Create blocks'}),commitRepresentation:async()=>{committed++;return{source:'value: 1\n'};},dispose(){closed++;}})};
    const unregister=registry.register(provider);const adapter=registry.open({providerId:'converter',documentId:'one'});const snapshot=adapter.capture();
    expect(Object.isFrozen(registry.list()[0]?.representations)).toBe(true);expect(registry.list()[0]?.activeRepresentation).toBe('source');const candidate=await adapter.prepareRepresentation!(snapshot,{kind:'yaml-blocks',direction:'from-source'});expect(committed).toBe(0);
    await expect(adapter.prepareRepresentation!(snapshot,{kind:'unknown',direction:'from-source'})).rejects.toThrow();await adapter.commitRepresentation!(snapshot,candidate);expect(committed).toBe(1);
    unregister();await expect(adapter.commitRepresentation!(snapshot,candidate)).rejects.toThrow();expect(closed).toBe(1);registry.dispose();f.store.dispose();
  });
});


it('uses the explicit draft07 profile for a declared draft07 owner Schema',()=>{
  const f=fixture();const schema={id:'https://example.invalid/draft07',schema:{$schema:'http://json-schema.org/draft-07/schema#',type:'object',required:['enabled'],properties:{enabled:{type:'boolean'}},additionalProperties:false}};
  f.store.put({id:'oldSchema',filename:'config.json',format:'json',source:'{ "enabled": true }\r\n',schema});
  expect(f.store.read('oldSchema').source).toBe('{ "enabled": true }\r\n');
  expect(()=>f.store.put({id:'oldSchema',filename:'config.json',format:'json',source:'{"enabled":"wrong"}',schema})).toThrow();
  expect(f.store.read('oldSchema').source).toBe('{ "enabled": true }\r\n');f.store.dispose();
});

it('keeps the same raw provider registered across runtime clear/load while invalidating all old captures',async()=>{
 const f=fixture();f.store.put(input);const provider=createSourceDocumentProvider(f.vm),registry=getSourceDocumentRegistry(f.vm),off=registry.register(provider);
 const ref={providerId:'document-data',documentId:'settings'},old=registry.open(ref),snapshot=old.capture(),candidate=await old.prepare(snapshot,yaml+'# old session\r\n');
 // The reset event alone must invalidate captures, even before storage or target identity changes.
 f.runtime.emit('RUNTIME_DISPOSED');await expect(old.prepare(snapshot,yaml)).rejects.toMatchObject({code:'PROJECT_CONFLICT'});
 f.runtime.extensionStorage={};f.runtime.targets=[];expect(registry.list()).toEqual([]);await expect(old.commit(snapshot,candidate)).rejects.toThrow();
 f.store.put({...input,source:'value: 10\r\n'});f.runtime.targets=[{isOriginal:true,name:'Stage'}];f.runtime.emit('PROJECT_LOADED');
 expect(registry.list()[0]?.reference).toEqual(ref);expect(registry.open(ref).capture().source).toBe('value: 10\r\n');
 const next=registry.open(ref),fresh=next.capture();await next.commit(fresh,await next.prepare(fresh,'value: 11\r\n'));expect(f.store.read('settings').source).toBe('value: 11\r\n');
 off();f.store.dispose();
});

it('reuses a cached native extension after project replacement without closing menus or persistent Named Data',async()=>{
 const f=fixture();vi.stubGlobal('Scratch',{BlockType:{COMMAND:'command',REPORTER:'reporter',BOOLEAN:'boolean',HAT:'hat'},ArgumentType:{STRING:'string'},Cast:{toString:(value:unknown)=>String(value)},translate:(value:string)=>value,vm:f.vm});
 const extension=new DocumentDataExtension(true,true),target={};extension.parseMarkdown({NAME:'legacy',TEXT:'# transient'},{target});extension.createYamlSource({NAME:'settings',FILENAME:'settings.yaml',TEXT:yaml});
 const registry=getSourceDocumentRegistry(f.vm),ref={providerId:'document-data',documentId:'settings'},old=registry.open(ref),snapshot=old.capture();
 const named=extension.getNamedDataRegistry()!,namedRef={namespace:'document-source',kind:'document' as const,scope:'project' as const,name:'settings'};
 expect(named.canResolve(namedRef,'yaml')).toBe(true);f.runtime.emit('RUNTIME_DISPOSED');f.runtime.extensionStorage={};f.runtime.targets=[];
 expect(extension.hasDocument({NAME:'legacy'},{target})).toBe(false);expect(()=>extension.getInfo()).not.toThrow();expect(()=>extension.sourceDocumentMenu()).not.toThrow();expect(registry.list()).toEqual([]);expect(named.canResolve(namedRef,'yaml')).toBe(true);
 extension.createYamlSource({NAME:'settings',FILENAME:'new.yaml',TEXT:'value: 20\r\n'});f.runtime.targets=[{isOriginal:true,name:'Stage'}];f.runtime.emit('PROJECT_LOADED');
 expect(extension.sourceDocumentMenu()[0]?.text).toBe('new.yaml');await expect(old.prepare(snapshot,yaml)).rejects.toMatchObject({code:'PROJECT_CONFLICT'});
 const fresh=registry.open(ref),s=fresh.capture();await fresh.commit(s,await fresh.prepare(s,'value: 21\r\n'));const body=await named.openBody(namedRef,'yaml',{project:{}});expect(new TextDecoder().decode(body.body as Uint8Array)).toBe('value: 21\r\n');await body.release('complete');
 const json=' { "enabled" : true }\r\n';extension.createJsonSource({NAME:'json',FILENAME:'new.json',TEXT:json});const jsonBody=await named.openBody({...namedRef,name:'json'},'json',{project:{}});expect(new TextDecoder().decode(jsonBody.body as Uint8Array)).toBe(json);await jsonBody.release('complete');
 await extension.dispose();expect(registry.list()).toEqual([]);expect(named.canResolve(namedRef,'yaml')).toBe(false);f.store.dispose();
});

import {describe,it,expect} from 'vitest';
import {createSourceDocumentRegistry,normalizeSourceDocumentPreview,type SourceDocumentProvider,type SourceDocumentPreview} from '@kubohiroya/turbowarp-document-data/composition';
const model=(kind:string):SourceDocumentPreview=>kind==='source'?{kind,source:'# kept\nvalue: 2\n'}:{kind,source:'# kept\nvalue: 2\n',blocks:{hat:{opcode:'owner_hat',parent:null,next:null}},rootIds:['hat'],blockDefinitions:[{opcode:'owner_hat',blockType:'hat',text:'document'}],menus:{documents:{items:['one']}}};
function provider(preview:(kind:string)=>Promise<SourceDocumentPreview>):SourceDocumentProvider{return{id:'owner',list:()=>[{documentId:'one',filename:'one.yaml'}],open:()=>({inspect:()=>({available:true}),capture:()=>({source:'value: 1\n'}),prepare:async(_s,source)=>({source}),commit:async(_s,p)=>({source:p.source}),previewRepresentation:(_s,request)=>preview(request.kind),dispose(){}})}}
describe('pure preview public boundary',()=>{
 it('forwards all three preview kinds and freezes independent finite model copies',async()=>{
  const registry=createSourceDocumentRegistry();let calls=0;const original=model('yaml-blocks');registry.register(provider(async kind=>{calls++;return kind==='yaml-blocks'?original:model(kind)}));const adapter=registry.open({providerId:'owner',documentId:'one'}),snapshot=adapter.capture();
  for(const kind of ['source','yaml-blocks','schema-blocks']){const preview=await adapter.previewRepresentation!(snapshot,{kind});expect(preview.kind).toBe(kind);expect(preview.source).toBe('# kept\nvalue: 2\n');expect(Object.isFrozen(preview)).toBe(true);}
  expect(calls).toBe(3);const copied=await adapter.previewRepresentation!(snapshot,{kind:'yaml-blocks'});expect(copied).not.toBe(original);expect(Object.isFrozen(copied.blocks!.hat)).toBe(true);registry.dispose();
 });
 it('guards lifetime after an asynchronous owner preview',async()=>{
  const registry=createSourceDocumentRegistry();let resolve!:(value:SourceDocumentPreview)=>void;const off=registry.register(provider(()=>new Promise(done=>{resolve=done;})));const adapter=registry.open({providerId:'owner',documentId:'one'}),pending=adapter.previewRepresentation!(adapter.capture(),{kind:'source'});off();resolve(model('source'));await expect(pending).rejects.toThrow(/closed/);registry.dispose();
 });
 it('rejects project/assets/archive fields, callbacks, dynamic menus, cycles and mismatched kinds',()=>{
  const cycle:Record<string,unknown>={};cycle.self=cycle;
  for(const invalid of [{...model('source'),project:{}},{...model('source'),assets:{}},{...model('source'),archive:'bytes'},{...model('source'),source:()=>''},{...model('yaml-blocks'),menus:{bad:{items:'method'}}},{...model('yaml-blocks'),blocks:{cycle}},{kind:'other',source:''}])expect(()=>normalizeSourceDocumentPreview(invalid,'source')).toThrow();
 });
 it('does not invoke accessor callbacks and enforces finite output limits',()=>{
  let invoked=0;const getter={kind:'source',get source(){invoked++;return'';}};expect(()=>normalizeSourceDocumentPreview(getter,'source')).toThrow(/accessors/);expect(invoked).toBe(0);
  expect(()=>normalizeSourceDocumentPreview({kind:'source',source:'x'.repeat(8*1024*1024+1)},'source')).toThrow(/byte limit/);
  expect(()=>normalizeSourceDocumentPreview({...model('yaml-blocks'),rootIds:['missing']},'yaml-blocks')).toThrow(/roots/);
  expect(()=>normalizeSourceDocumentPreview({...model('yaml-blocks'),rootIds:['__proto__']},'yaml-blocks')).toThrow(/roots/);
  for(const blockIconURI of ['javascript:alert(1)','data:application/javascript;base64,ZXZhbA=='])expect(()=>normalizeSourceDocumentPreview({...model('yaml-blocks'),blockDefinitions:[{opcode:'owner_hat',blockType:'hat',text:'document',blockIconURI}]},'yaml-blocks')).toThrow(/executable/);
 });
});

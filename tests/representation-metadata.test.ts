import {describe,it,expect} from 'vitest';
import {createSourceDocumentRegistry} from '../src/composition.js';
import type {SourceDocumentProvider,SourceDocumentRepresentation} from '@kubohiroya/turbowarp-document-data/composition';
const publicCrossOnly: SourceDocumentRepresentation={kind:'schema-blocks',label:'Schema',fromSource:false,toSource:true,fromRepresentations:['yaml-blocks']};
const representation=(extra:Record<string,unknown>={})=>({kind:'schema-blocks',label:'Schema',fromSource:true,toSource:true,...extra});
function fixture({active='source',omitActive=false,options=[representation()]}:{active?:string;omitActive?:boolean;options?:ReturnType<typeof representation>[]}={}){
 const registry=createSourceDocumentRegistry();let prepared=0;
 const provider:SourceDocumentProvider={id:'owner',list:()=>[{documentId:'one',filename:'one.yaml',...(omitActive?{}:{activeRepresentation:active}),representations:options}],open:()=>({inspect:()=>({available:true}),capture:()=>({source:'value: 1\n'}),prepare:async(_s,source)=>({source}),commit:async(_s,p)=>({source:p.source}),prepareRepresentation:async()=>{prepared++;return {summary:'Atomic conversion'};},commitRepresentation:async()=>({source:'value: 1\n'}),dispose(){}})};
 return{registry,register:()=>registry.register(provider),get prepared(){return prepared;}};
}
const open=(f:ReturnType<typeof fixture>)=>f.registry.open({providerId:'owner',documentId:'one'});
describe('bounded cross representation metadata',()=>{
 it('copies and freezes advertised source kinds without mutating old metadata',()=>{
  expect(publicCrossOnly.fromRepresentations).toEqual(['yaml-blocks']);
  const kinds=['yaml-blocks'],f=fixture({options:[representation({fromRepresentations:kinds})]});f.register();
  const first=f.registry.list()[0]!.representations![0]!.fromRepresentations!;
  expect(first).toEqual(['yaml-blocks']);expect(Object.isFrozen(first)).toBe(true);expect(first).not.toBe(kinds);kinds.push('other');expect(first).toEqual(['yaml-blocks']);expect(()=>{(first as string[]).push('no');}).toThrow();f.registry.dispose();
  const old=fixture();old.register();expect(old.registry.list()[0]!.representations![0]).not.toHaveProperty('fromRepresentations');old.registry.dispose();
 });
 it('rejects invalid, nonfinite, excessive, duplicate, sparse and oversized kinds',()=>{
  const nonfinite=new Proxy([],{get(target,key,receiver){return key==='length'?Infinity:Reflect.get(target,key,receiver);}});
  for(const invalid of [null,{},nonfinite,new Array(1),Array.from({length:17},(_,i)=>'kind'+i),['same','same'],[Infinity],[''],['bad\nkind'],['x'.repeat(1025)]]){
   const f=fixture({options:[representation({fromRepresentations:invalid})]});expect(()=>f.register()).toThrow();f.registry.dispose();
  }
  const boundary=fixture({options:[representation({fromRepresentations:Array.from({length:16},(_,i)=>'kind'+i)})]});boundary.register();expect(boundary.registry.list()[0]!.representations![0]!.fromRepresentations).toHaveLength(16);boundary.registry.dispose();
 });
 it('does not invoke an unbounded custom iterator on otherwise valid indexed metadata',()=>{
  const kinds=['yaml-blocks'];Object.defineProperty(kinds,Symbol.iterator,{value(){throw Error('Untrusted iterator must not run');}});
  const f=fixture({options:[representation({fromRepresentations:kinds})]});f.register();expect(f.registry.list()[0]!.representations![0]!.fromRepresentations).toEqual(['yaml-blocks']);f.registry.dispose();
 });
 it('permits raw source conversion and explicitly declared cross-only conversion',async()=>{
  for(const options of [{omitActive:true,options:[representation()]},{active:'source',options:[representation()]},{active:'yaml-blocks',options:[representation({fromSource:false,fromRepresentations:['yaml-blocks']})]}]){
   const f=fixture(options);f.register();const adapter=open(f);await adapter.prepareRepresentation!(adapter.capture(),{kind:'schema-blocks',direction:'from-source'});expect(f.prepared).toBe(1);f.registry.dispose();
  }
 });
 it('refuses missing, wrong, self and raw-disabled conversion kinds before calling the owner',async()=>{
  for(const options of [{active:'yaml-blocks',options:[representation()]},{active:'yaml-blocks',options:[representation({fromRepresentations:['other']})]},{active:'schema-blocks',options:[representation({fromRepresentations:['schema-blocks']})]},{active:'source',options:[representation({fromSource:false,fromRepresentations:['yaml-blocks']})]}]){
   const f=fixture(options);f.register();const adapter=open(f);await expect(adapter.prepareRepresentation!(adapter.capture(),{kind:'schema-blocks',direction:'from-source'})).rejects.toThrow(/not supported/);expect(f.prepared).toBe(0);f.registry.dispose();
  }
 });
 it('preserves existing block-to-source forwarding',async()=>{
  const f=fixture({active:'schema-blocks'});f.register();const adapter=open(f);await adapter.prepareRepresentation!(adapter.capture(),{kind:'schema-blocks',direction:'to-source'});expect(f.prepared).toBe(1);f.registry.dispose();
 });
});

import {build} from 'esbuild';
import {fileURLToPath, URL} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const common = {absWorkingDir:root, bundle:true, format:'esm',platform:'browser',target:'es2022',legalComments:'inline'};
await build({...common,entryPoints:['src/composition.js'],outfile:'dist/composition.js'});
await build({...common,entryPoints:['src/source-documents.js'],outfile:'dist/source-documents.js',packages:'external',plugins:[{
  name:'keep-canonical-composition-identity',setup(builder){builder.onResolve({filter:/^\.\/composition\.js$/},()=>({path:'./composition.js',external:true}));}
}]});

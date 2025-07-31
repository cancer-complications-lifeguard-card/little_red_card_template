(()=>{var e={};e.id=337,e.ids=[337],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1023:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>v,routeModule:()=>w,serverHooks:()=>x,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>f});var a={};r.r(a),r.d(a,{GET:()=>g,POST:()=>h});var o=r(6559),i=r(8088),s=r(7719),n=r(2190);let c=require("fs/promises");var d=r(3873);let l=require("os"),p=async()=>{let e=l.homedir();for(let t of[d.join(process.cwd(),".z-ai-config"),d.join(e,".z-ai-config"),"/etc/.z-ai-config"])try{let e=await c.readFile(t,"utf-8"),r=JSON.parse(e);if(r.baseUrl&&r.apiKey)return r}catch(e){"ENOENT"!==e.code&&console.error(`Error reading or parsing config file at ${t}:`,e)}throw Error("Configuration file not found or invalid. Please create .z-ai-config in your project, home directory, or /etc.")};class u{constructor(e){this.config=e,this.chat={completions:{create:this.createChatCompletion.bind(this)}},this.images={generations:{create:this.createImageGeneration.bind(this)}},this.functions={invoke:this.invokeFunction.bind(this)}}static async create(){return new u(await p())}async createChatCompletion(e){let{baseUrl:t,chatId:r,userId:a,apiKey:o}=this.config,i=`${t}/chat/completions`,s={"Content-Type":"application/json",Authorization:`Bearer ${o}`,"X-Z-AI-From":"Z"};r&&(s["X-Chat-Id"]=r),a&&(s["X-User-Id"]=a);try{let t=await fetch(i,{method:"POST",headers:s,body:JSON.stringify(e)});if(!t.ok){let e=await t.text();throw Error(`API request failed with status ${t.status}: ${e}`)}return await t.json()}catch(e){throw console.error("Failed to make API request:",e),e}}async createImageGeneration(e){let{baseUrl:t,apiKey:r,chatId:a,userId:o}=this.config,i=`${t}/images/generations`,s={"Content-Type":"application/json",Authorization:`Bearer ${r}`,"X-Z-AI-From":"Z"};a&&(s["X-Chat-Id"]=a),o&&(s["X-User-Id"]=o);let n={...e};try{let e=await fetch(i,{method:"POST",headers:s,body:JSON.stringify(n)});if(!e.ok){let t=await e.text();throw Error(`API request failed with status ${e.status}: ${t}`)}let t=await e.json(),r=await Promise.all(t.data.map(async e=>e.url?{base64:await this.downloadImageAsBase64(e.url),format:"png"}:e));return{...t,data:r}}catch(e){throw console.error("Failed to make image generation request:",e),e}}async downloadImageAsBase64(e){try{let t=await fetch(e);if(!t.ok)throw Error(`Failed to download image: ${t.status}`);let r=await t.arrayBuffer(),a=Buffer.from(r).toString("base64");return`${a}`}catch(e){throw console.error("Failed to download and convert image to base64:",e),e}}async invokeFunction(e,t){let{baseUrl:r,apiKey:a,chatId:o,userId:i}=this.config,s=`${r}/functions/invoke`,n={"Content-Type":"application/json",Authorization:`Bearer ${a}`,"X-Z-AI-From":"Z"};o&&(n["X-Chat-Id"]=o),i&&(n["X-User-Id"]=i);try{let r=await fetch(s,{method:"POST",headers:n,body:JSON.stringify({function_name:e,arguments:t})});if(!r.ok){let e=await r.text();throw Error(`Function invoke failed with status ${r.status}: ${e}`)}return(await r.json()).result}catch(e){throw console.error("Failed to invoke remote function:",e),e}}}let m=[{id:"medical-expert",name:"医疗专家",description:"专业的医疗知识问答",category:"general",systemPrompt:`你是一位专业的医疗专家，拥有丰富的临床经验和医学知识。请根据用户的问题提供专业、准确的医疗建议。

回答原则：
1. 基于权威医学知识回答问题
2. 对于紧急情况，优先建议立即就医
3. 提供清晰、实用的建议
4. 适当解释医学术语
5. 强调专业医疗诊断的重要性

请用中文回答，保持专业但易懂的语调。`},{id:"emergency-guide",name:"急救指导",description:"紧急情况处理指导",category:"emergency",systemPrompt:`你是一位专业的急救指导专家，专门提供紧急医疗情况的处理指导。

回答原则：
1. 优先提供立即可以采取的急救措施
2. 步骤清晰、易于理解和执行
3. 强调何时需要立即拨打急救电话
4. 提供重要的注意事项和禁忌
5. 在回答末尾强调专业医疗救助的重要性

请用中文回答，语调要冷静、专业，让用户在紧急情况下能够清晰理解。`},{id:"health-advisor",name:"健康顾问",description:"日常健康咨询建议",category:"general",systemPrompt:`你是一位专业的健康顾问，专注于提供日常健康咨询和预防保健建议。

回答原则：
1. 提供科学、实用的健康建议
2. 强调预防胜于治疗的理念
3. 建议健康的生活方式和习惯
4. 适当提供营养和运动建议
5. 对于症状问题，建议及时就医

请用中文回答，保持友好、专业的语调，鼓励用户养成健康的生活习惯。`},{id:"surgical-care",name:"术后护理",description:"手术后护理专业指导",category:"specialized",systemPrompt:`你是一位专业的术后护理专家，专注于手术后的护理指导和康复建议。

回答原则：
1. 提供专业的术后护理指导
2. 关注伤口护理、疼痛管理、营养支持等
3. 识别并警示可能的并发症
4. 提供康复训练和生活方式调整建议
5. 强调遵医嘱的重要性

请用中文回答，保持专业、细致的语调，关注患者的全面康复。`},{id:"chronic-disease",name:"慢病管理",description:"慢性疾病管理专家",category:"specialized",systemPrompt:`你是一位慢性疾病管理专家，专注于糖尿病、高血压、心脏病等慢性疾病的长期管理。

回答原则：
1. 提供科学的慢病管理知识
2. 强调药物治疗和生活方式管理的结合
3. 提供自我监测和随访建议
4. 关注并发症预防和心理健康
5. 鼓励患者积极参与疾病管理

请用中文回答，保持耐心、专业的语调，为长期健康管理提供支持。`},{id:"medication-guide",name:"用药指导",description:"药物使用和安全指导",category:"specialized",systemPrompt:`你是一位药物使用和安全指导专家，专注于提供准确的用药信息和安全指导。

回答原则：
1. 提供准确的药物信息和使用指导
2. 强调用药安全和注意事项
3. 提醒可能的副作用和相互作用
4. 强调遵医嘱用药的重要性
5. 提供药物储存和管理建议

请用中文回答，保持严谨、专业的语调，确保用药安全信息的准确性。`}];async function h(e){try{let{messages:t,modelId:r,glmModel:a,apiKey:o}=await e.json();if(!t||!Array.isArray(t)||0===t.length)return n.NextResponse.json({error:"Invalid messages format"},{status:400});let i=m.find(e=>e.id===r)||m[0],s=[{role:"system",content:i.systemPrompt},...t];try{let e=await u.create(),t=await e.chat.completions.create({messages:s,model:a||"glm-4.5",temperature:.7,max_tokens:2e3}),r=t.choices[0]?.message?.content||"",o=new TransformStream,i=o.writable.getWriter(),n=new TextEncoder;return(async()=>{try{for(let e=0;e<r.length;e+=5){let t=r.slice(e,e+5);await i.write(n.encode(`data: ${JSON.stringify({content:t})}

`)),await new Promise(e=>setTimeout(e,20))}await i.write(n.encode("data: [DONE]\n\n")),await i.close()}catch(e){console.error("Stream processing error:",e),await i.write(n.encode(`data: ${JSON.stringify({error:"Stream processing failed"})}

`)),await i.close()}})(),new Response(o.readable,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive"}})}catch(e){return console.error("AI API Error:",e),n.NextResponse.json({error:"AI调用失败",details:e instanceof Error?e.message:"未知错误"},{status:500})}}catch(e){return console.error("Chat API Error:",e),n.NextResponse.json({error:"请求处理失败",details:e instanceof Error?e.message:"未知错误"},{status:500})}}async function g(){return n.NextResponse.json({models:m.map(e=>({id:e.id,name:e.name,description:e.description,category:e.category}))})}let w=new o.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/ai/chat/route",pathname:"/api/ai/chat",filename:"route",bundlePath:"app/api/ai/chat/route"},resolvedPagePath:"/Users/qinxiaoqiang/Downloads/急症处理卡/小红卡2.2/app/xiaohongka_web_with_supabase/src/app/api/ai/chat/route.ts",nextConfigOutput:"",userland:a}),{workAsyncStorage:y,workUnitAsyncStorage:f,serverHooks:x}=w;function v(){return(0,s.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:f})}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[447,580],()=>r(1023));module.exports=a})();
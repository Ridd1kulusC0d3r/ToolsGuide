'use strict';
const $ = id => document.getElementById(id);
const KEY = 'toolsguide.study.v1';
const levels = ['0 · Explorar', '1 · Explicar', '2 · Praticar', '3 · Questionar', '4 · Ensinar'];
let tools = [], state = {levels:{}, notes:'', reflections:{}}, storageOK = true;
try {
 const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
 if(saved && typeof saved === 'object') {
  state.notes = typeof saved.notes === 'string' ? saved.notes : '';
  if(saved.levels && typeof saved.levels === 'object') for(const [k,v] of Object.entries(saved.levels)) if(Number.isInteger(v) && v>=0 && v<=4) state.levels[k]=v;
  if(saved.reflections && typeof saved.reflections === 'object') for(const [k,v] of Object.entries(saved.reflections)) if(typeof v === 'string') state.reflections[k]=v;
 }
} catch { storageOK = false; }
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;} storageMessage();}
function storageMessage(){$('storageStatus').textContent=storageOK?'Salvo somente neste navegador.':'Armazenamento indisponível ou inválido. Exporte o caderno para preservar suas notas.';}
function element(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function render(){
 const query=$('search').value.toLocaleLowerCase('pt-BR');
 const subset=tools.filter(t=>(!$('area').value||t.area===$('area').value)&&[t.name,t.title,t.area,t.story].join(' ').toLocaleLowerCase('pt-BR').includes(query)&&(!$('status').value||($('status').value==='done'?(state.levels[t.id]||0)===4:(state.levels[t.id]||0)<4)));
 $('cards').replaceChildren();
 for(const t of subset){const card=element('article',undefined,'card');const meta=element('div',undefined,'meta');meta.append(element('span',`0${t.order} / ${t.area}`),element('span',`${t.minutes} MIN`));card.append(meta,element('h3',t.name),element('p',t.title,'tagline'),element('p',t.analogy));const p=element('progress');p.max=4;p.value=state.levels[t.id]||0;p.setAttribute('aria-label',`Autoavaliação ${t.name}`);card.append(p,element('p',levels[p.value],'stage'));const b=element('button','Abrir missão →');b.addEventListener('click',()=>openMission(t));card.append(b);$('cards').append(card);}
 $('feedback').textContent=subset.length?`${subset.length} missões encontradas. Comandos são executados por você no terminal.`:'Nenhuma missão encontrada. Tente outro termo ou remova os filtros.';
 $('total').textContent=tools.length;$('mastered').textContent=tools.filter(t=>state.levels[t.id]===4).length;
 $('progressText').textContent=Math.round(tools.reduce((s,t)=>s+(state.levels[t.id]||0),0)/(tools.length*4)||0)+'%';
}
function openMission(t){
 const box=$('detail');box.replaceChildren();box.append(element('p',`${t.area} / MISSÃO 0${t.order}`,'eyebrow'),element('h2',`${t.name}: ${t.title}`),element('p',t.story));
 const section=(heading,text,cls)=>{box.append(element('h3',heading),element('p',text,cls));};
 section('01 / Explique antes de executar',t.analogy);box.append(element('p',t.limit,'boundary'));
 section('02 / Prepare e preveja',`Pré-requisitos: ${t.prerequisites.join(', ')}. Entrada: ${t.input}. Registre sua previsão antes de executar. Consulte o guia completo para instalação e preparação.`);
 box.append(element('pre',t.command));section('Leia o comando',t.explain);
 const details=element('details');details.append(element('summary','Revelar resultado esperado — não é execução real'),element('p',t.expected));box.append(details);
 section('03 / Questione',t.challenge);const answer=element('details');answer.append(element('summary','Comparar meu raciocínio'),element('p',t.answer));box.append(answer);
 section('Se algo falhar',t.pitfall);section('04 / Ensine de volta','Explique com suas palavras a finalidade, a saída e o que ela não permite concluir. Registre uma lacuna e sua explicação revisada.');
 const label=element('label','Sua explicação para esta missão');label.htmlFor='reflection';const reflection=element('textarea');reflection.id='reflection';reflection.rows=5;reflection.value=state.reflections[t.id]||'';reflection.addEventListener('input',()=>{state.reflections[t.id]=reflection.value;save();});box.append(label,reflection);
 const levelLabel=element('label','Autoavaliação de domínio');levelLabel.htmlFor='level';const select=element('select');select.id='level';levels.forEach((v,i)=>{const opt=element('option',v);opt.value=i;select.append(opt);});select.value=state.levels[t.id]||0;select.addEventListener('change',()=>{state.levels[t.id]=Number(select.value);save();render();});box.append(levelLabel,select);
 const guide=element('a','Guia completo e preparação ↗');guide.href=t.path;guide.target='_blank';guide.rel='noopener';const source=element('a','Documentação oficial ↗');source.href=t.source;source.target='_blank';source.rel='noopener';box.append(guide,element('br'),source,element('p',`Revisão documental: ${t.reviewed_at}. Veja docs/VALIDATION.md para testes executados.`));
 $('mission').showModal();$('mission').scrollTop=0;
}
$('close').addEventListener('click',()=>$('mission').close());
for(const id of ['search','area','status'])$(id).addEventListener('input',render);
$('notes').value=state.notes;$('notes').addEventListener('input',()=>{state.notes=$('notes').value;save();});
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({schema_version:'1.0',exported_at:new Date().toISOString(),...state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=element('a');a.href=url;a.download='toolsguide-caderno.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('reset').addEventListener('click',()=>{if(confirm('Apagar suas notas e autoavaliações deste navegador? Exporte antes se quiser preservá-las.')){state={levels:{},notes:'',reflections:{}};$('notes').value='';save();render();}});
storageMessage();
fetch('catalog.json').then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json();}).then(data=>{if(!Array.isArray(data.tools))throw new Error('Catálogo inválido');tools=data.tools;render();}).catch(()=>{$('feedback').textContent='Não foi possível carregar o catálogo. Sirva a raiz com python3 -m http.server 8765 --bind 127.0.0.1 e abra http://127.0.0.1:8765/.';});

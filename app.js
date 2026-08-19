const POS={portero:'POR',defensa:'DEF',medio:'MED',delantero:'DEL'};
const POS_NAMES={portero:'Portero',defensa:'Defensa',medio:'Medio',delantero:'Delantero'};
const FORMATIONS={
 '4-3-3':{slots:[['POR','portero',50,89],['DEF','defensa',22,68],['DEF','defensa',41,68],['DEF','defensa',59,68],['DEF','defensa',78,68],['MED','medio',34,45],['MED','medio',50,40],['MED','medio',66,45],['DEL','delantero',34,19],['DEL','delantero',50,14],['DEL','delantero',66,19]]},
 '3-4-3':{slots:[['POR','portero',50,89],['DEF','defensa',32,68],['DEF','defensa',50,68],['DEF','defensa',68,68],['MED','medio',24,44],['MED','medio',41,40],['MED','medio',59,40],['MED','medio',76,44],['DEL','delantero',34,19],['DEL','delantero',50,14],['DEL','delantero',66,19]]},
 '4-4-2':{slots:[['POR','portero',50,89],['DEF','defensa',22,68],['DEF','defensa',41,68],['DEF','defensa',59,68],['DEF','defensa',78,68],['MED','medio',24,43],['MED','medio',41,38],['MED','medio',59,38],['MED','medio',76,43],['DEL','delantero',43,17],['DEL','delantero',57,17]]},
 '4-2-3-1':{slots:[['POR','portero',50,89],['DEF','defensa',22,68],['DEF','defensa',41,68],['DEF','defensa',59,68],['DEF','defensa',78,68],['MED','medio',38,49],['MED','medio',62,49],['MED','medio',28,31],['MED','medio',50,33],['MED','medio',72,31],['DEL','delantero',50,14]]},
 '3-5-2':{slots:[['POR','portero',50,89],['DEF','defensa',32,68],['DEF','defensa',50,68],['DEF','defensa',68,68],['MED','medio',20,48],['MED','medio',35,43],['MED','medio',50,40],['MED','medio',65,43],['MED','medio',80,48],['DEL','delantero',43,17],['DEL','delantero',57,17]]},
 '4-1-2-1-2':{slots:[['POR','portero',50,89],['DEF','defensa',22,68],['DEF','defensa',41,68],['DEF','defensa',59,68],['DEF','defensa',78,68],['MED','medio',50,51],['MED','medio',35,38],['MED','medio',65,38],['MED','medio',50,28],['DEL','delantero',43,15],['DEL','delantero',57,15]]}
};
const CLUB_SHIELDS=[{"name": "Bastard Dragons", "path": "imagenes mejor calidad/assets/escudos/Bastard Dragons.png"}, {"name": "Aguacate Team", "path": "imagenes mejor calidad/assets/escudos/Aguacate Team.png"}, {"name": "AD Fesios", "path": "imagenes mejor calidad/assets/escudos/AD Fesios.png"}, {"name": "Minabo de Piev", "path": "imagenes mejor calidad/assets/escudos/Minabo de Piev.png"}, {"name": "Stay United", "path": "imagenes mejor calidad/assets/escudos/Stay United.png"}, {"name": "Cárcel Azul", "path": "imagenes mejor calidad/assets/escudos/Cárcel Azul.png"}, {"name": "MV Football Association", "path": "imagenes mejor calidad/assets/escudos/MV Football Association.png"}, {"name": "Real Cohólicos FC", "path": "imagenes mejor calidad/assets/escudos/Real Cohólicos FC.png"}, {"name": "Hohe y los Hohes", "path": "imagenes mejor calidad/assets/escudos/Hohe y los Hohes.png"}, {"name": "Tojo FC", "path": "imagenes mejor calidad/assets/escudos/Tojo FC.png"}, {"name": "Instituto Ramón", "path": "imagenes mejor calidad/assets/escudos/Instituto Ramón.png"}, {"name": "Secundaria Nuevo Equipo", "path": "imagenes mejor calidad/assets/escudos/Secundaria Nuevo Equipo.png"}, {"name": "Esfinter de Miano", "path": "imagenes mejor calidad/assets/escudos/Esfinter de Miano.png"}, {"name": "Recreativo de Juerga", "path": "imagenes mejor calidad/assets/escudos/Recreativo de Juerga.png"}, {"name": "Happy FC", "path": "imagenes mejor calidad/assets/escudos/Happy FC.png"}, {"name": "Vodka Juniors", "path": "imagenes mejor calidad/assets/escudos/Vodka Juniors.png"}, {"name": "Sacándole Brillo SD", "path": "imagenes mejor calidad/assets/escudos/Sacándole Brillo SD.png"}, {"name": "Real Vintage CF", "path": "imagenes mejor calidad/assets/escudos/Real Vintage CF.png"}];
const DEFAULT_PROFILE={teamName:'Liga Bardina',username:'Jugador',shield:'Bastard Dragons'};
const app=document.getElementById('app');
let state=loadState();
function loadState(){try{const x=JSON.parse(localStorage.getItem('liga_bardina_state'))||fresh();if(!x.profile)x.profile={...DEFAULT_PROFILE};if(!x.profile.teamName)x.profile.teamName=DEFAULT_PROFILE.teamName;if(!x.profile.username)x.profile.username=DEFAULT_PROFILE.username;if(!x.profile.shield)x.profile.shield=DEFAULT_PROFILE.shield;if(!Array.isArray(x.packs)){x.packs=Array.isArray(x.packQueue)?x.packQueue.map((q,i)=>({id:q.id||`pack_migrated_${Date.now()}_${i}`,type:q.type==='good'?'rare':q.type==='unique'?'unique':'common'})):[]}else{x.packs=x.packs.map((p,i)=>({...p,type:p.type==='good'?'rare':p.type==='basic'?'common':(['common','rare','unique'].includes(p.type)?p.type:'common'),id:p.id||`pack_${Date.now()}_${i}`}))}if(!Array.isArray(x.collection))x.collection=[];x.collection=x.collection.filter(id=>!!cardById(id));if(!Array.isArray(x.newCards))x.newCards=[];x.newCards=x.newCards.filter(id=>x.collection.includes(id));if(!('packConfirm' in x))x.packConfirm=null;if(!('packOpen' in x))x.packOpen=null;if(x.packOpen){x.packOpen.type=x.packOpen.type==='good'?'rare':x.packOpen.type==='basic'?'common':(['common','rare','unique'].includes(x.packOpen.type)?x.packOpen.type:'common');if(!Array.isArray(x.packOpen.cards))x.packOpen.cards=[];if(!Number.isInteger(x.packOpen.revealed))x.packOpen.revealed=0;if(!Array.isArray(x.packOpen.newFlags))x.packOpen.newFlags=[]}if(x.draft){if(!('phase' in x.draft))x.draft.phase=x.draft.picks?.some(Boolean)?'normal':'captain';if(!('activeSlot' in x.draft))x.draft.activeSlot=null;if(!('captainPending' in x.draft))x.draft.captainPending=null;if(!('swapSlot' in x.draft))x.draft.swapSlot=null;if(!Array.isArray(x.draft.matchHistory))x.draft.matchHistory=[];if(!Array.isArray(x.draft.usedShields))x.draft.usedShields=[]}if(!['home','draft','tournament','profile','summary','packs','collection'].includes(x.view))x.view='home';return x}catch{return fresh()}}
function fresh(){return{view:'home',formation:null,draft:null,profile:{...DEFAULT_PROFILE},packs:[],collection:[],newCards:[],packConfirm:null,packOpen:null}}
function save(){localStorage.setItem('liga_bardina_state',JSON.stringify(state))}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
const ASSET_ROOTS=['imagenes mejor calidad/','../imagenes mejor calidad/','./imagenes mejor calidad/','assets/','../assets/','./assets/'];
function assetRel(path){let p=String(path||'').replace(/^\.\//,'');if(p.startsWith('imagenes mejor calidad/'))p=p.slice('imagenes mejor calidad/'.length);return p}
function tokenizedUnicodePath(p){return p.replace(/[^\x00-\x7F]/g,ch=>`#U${ch.codePointAt(0).toString(16).padStart(4,'0')}`)}
function assetCandidates(path){const rel=assetRel(path);const variants=[rel,tokenizedUnicodePath(rel)];const out=[];for(const root of ASSET_ROOTS)for(const v of variants){const u=root+v;if(!out.includes(u))out.push(u)}const direct=String(path||'');if(direct&&!out.includes(direct))out.push(direct);return out}
function safeAssetUrl(u){return encodeURI(u).replace(/#/g,'%23')}
function assetUrl(path){return safeAssetUrl(assetCandidates(path)[0])}
function fallbackImage(el){const list=assetCandidates(el.dataset.assetPath||'');let i=Number(el.dataset.assetIndex||0)+1;while(i<list.length){const next=safeAssetUrl(list[i++]);el.dataset.assetIndex=String(i-1);if(next!==el.src){el.src=next;return}}el.onerror=null}
function assetImg(path,cls='',alt=''){const src=assetUrl(path);return `<img class="${cls}" src="${src}" data-asset-path="${esc(String(path||''))}" data-asset-index="0" alt="${esc(alt)}" onerror="fallbackImage(this)">`}
function setAsset(el,path){if(!el)return;el.dataset.assetPath=String(path||'');el.dataset.assetIndex='0';el.onerror=()=>fallbackImage(el);el.src=assetUrl(path)}
function img(path){return assetUrl(path)}
function cardById(id){return LIGA_BARDINA_CARDS.find(c=>c.id===id)}
function cardName(c){return c.id.replace(/ESP$/,'').replace(/^(portero|defensa|medio|delantero)/,'$1 ')+(c.special?' ★':'')}
const SIM_PLAYER_NAMES={
"portero1":"Adachi Wawa",
"portero2":"Zacarías Leche",
"portero3":"Larry Capija",
"portero4":"Kepa Jamecho",
"portero5":"Fista Nalparti",
"portero6":"Bad Bunny",
"portero7":"Shimano",
"portero8":"Ròdak",
"portero9":"Marco Evangelista",
"portero10":"Benjamín Precios",
"portero11":"Guillermo Garrido",
"defensa1":"Julen Anitto",
"defensa2":"Carles Castro",
"defensa3":"Enzo Kette",
"defensa4":"Jesús Tomás Dado",
"defensa5":"Ken Aboh",
"defensa6":"Abraham Selano",
"defensa7":"Keko Ñete",
"defensa8":"Jorge Nitales",
"defensa9":"Felipe Lotas",
"defensa10":"Victor Tazo",
"defensa11":"Pere Gil",
"defensa12":"Jala Melano",
"defensa13":"Berg Ottä",
"defensa14":"Kehpo John",
"defensa15":"Abel Huevo",
"defensa16":"Alex Cremento",
"defensa17":"Kerry Cassalgas",
"defensa18":"Elf Hollon",
"defensa19":"Hugh Jass",
"defensa20":"Jack Wallside",
"defensa21":"Figg",
"defensa22":"Oh",
"defensa23":"IShowSpeed",
"defensa24":"Saejima",
"defensa25":"Kazama",
"defensa26":"Nishikiyama",
"defensa27":"Kido",
"defensa28":"Rodolfo",
"defensa29":"Blackcat Trans",
"defensa30":"Pong Lenis",
"defensa31":"Don Ramón",
"defensa32":"Nicolás Silva",
"defensa33":"Jacobo Paredes",
"defensa34":"Borja Sierra",
"defensa35":"Toni Ibarra",
"defensa36":"Tadeo Celaya",
"defensa37":"Cristian Navarro",
"defensa38":"Ramón Iraola",
"defensa39":"Sebastián Torres",
"defensa40":"Jairo Alarcón",
"defensa41":"Iker Nieto",
"defensa42":"Hipólito Chillón",
"defensa43":"Miguel Bachata",
"medio1":"Marco Tilla",
"medio2":"Elvis Tek",
"medio3":"Obi Oba",
"medio4":"Lorenzo Bacco",
"medio5":"Sancho Chazo",
"medio6":"Phillip Hoyas",
"medio7":"Omar Hicón",
"medio8":"Elton Tito",
"medio9":"Leo Diario",
"medio10":"Lucho Portuano",
"medio11":"Cindy Entes",
"medio12":"Aitor Tilla",
"medio13":"Elmor Ciyón",
"medio14":"Mike Oxlong",
"medio15":"Paco Gerte",
"medio16":"Terros Oltoto",
"medio17":"Elba Zurita",
"medio18":"Kaga Sawa",
"medio19":"Beth Amelnabo",
"medio20":"Ligma Balls",
"medio21":"Hohe el Crasheos",
"medio22":"Chi",
"medio23":"Mark Evans",
"medio24":"AA Anuel",
"medio25":"Kuze",
"medio26":"Daigo",
"medio27":"Kasuga",
"medio28":"Paco Boyrat",
"medio29":"Rufino",
"medio30":"Caranchoa",
"medio31":"Morlock",
"medio32":"Tomás Sánchez",
"medio33":"Enrique Águila",
"medio34":"Maxi Carreras",
"medio35":"Julián Tiburón",
"medio36":"Andrés Ugarte",
"medio37":"Manuel Ibañez",
"medio38":"Miguel Toledo",
"medio39":"Tadeo Carranza",
"medio40":"Elías Otero",
"medio41":"Kepa Iturribe",
"medio42":"Sergio Navas",
"medio43":"Ismael Yuste",
"delantero1":"Misco Jones",
"delantero2":"Armando Laguardia",
"delantero3":"Leandro Gao",
"delantero4":"Yotoko Tutoto",
"delantero5":"Lamine Gafloja",
"delantero6":"Stoikav Txondo",
"delantero7":"Benito Camela",
"delantero8":"Elver Galarga",
"delantero9":"Tomás Turbado",
"delantero10":"Ming Atiesa",
"delantero11":"Paul Bazzo",
"delantero12":"Tresco Jones",
"delantero13":"Emanem",
"delantero14":"Mine",
"delantero15":"Kiryu",
"delantero16":"Majima",
"delantero17":"Tomasín",
"delantero18":"Chipirito",
"delantero19":"Alejandro Brasero",
"delantero20":"Kevin Domínguez",
"delantero21":"Agustín Tejero",
"delantero22":"Telmo Castro",
"delantero23":"Saturnino Ortiz",
"delantero24":"Ricardo Íñiguez",
"portero1ESP":"Adachi Wawa",
"portero4ESP":"Kepa Jamecho",
"portero12ESP":"LeBron James",
"defensa3ESP":"Enzo Kette",
"defensa4ESP":"Jesús Tomás Dado",
"defensa8ESP":"Jorge Nitales",
"defensa29ESP":"Blackcat Trans",
"defensa33ESP":"Jacobo Paredes",
"defensa44ESP":"Papi Gavi",
"medio3ESP":"Obi Oba",
"medio19ESP":"Beth Amelnabo",
"medio22ESP":"Chi",
"medio26ESP":"Daigo",
"medio44ESP":"Ancelotti",
"medio45ESP":"Maradona",
"medio46ESP":"Zidane",
"medio47ESP":"Ronaldinho",
"delantero1ESP":"Misco Jones",
"delantero2ESP":"Armando Laguardia",
"delantero4ESP":"Yotoko Tutoto",
"delantero6ESP":"Stoikav Txondo",
"delantero11ESP":"Paul Bazzo",
"delantero25ESP":"Alex Hunter",
"delantero26ESP":"DjMaRiiO",
"delantero27ESP":"Usain Bolt",
"delantero28ESP":"Florentino Pérez",
"delantero29ESP":"Messi",
"delantero30ESP":"Cristiano Ronaldo",
"delantero31ESP":"Neymar Jr",
"delantero32ESP":"Pelé"
};
function simPlayerName(cardId){
  const c=cardById(cardId);
  return SIM_PLAYER_NAMES[cardId] || (c?.baseId ? SIM_PLAYER_NAMES[c.baseId] : null) || cardName(c||{id:cardId});
}

function chooseScorer(d){const picks=(d.picks||[]).filter(Boolean).map(id=>cardById(id)).filter(Boolean);if(!picks.length)return 'Tu jugador';const weighted=[];picks.forEach(c=>{const w=c.position==='delantero'?7:c.position==='medio'?4:c.position==='defensa'?2:1;for(let i=0;i<w;i++)weighted.push(c)});const c=weighted[Math.floor(Math.random()*weighted.length)];return simPlayerName(c.id)}
function homeKeeperName(d){const c=(d.picks||[]).map(id=>cardById(id)).find(c=>c?.position==='portero');return c?simPlayerName(c.id):'Tu portero'}

function showToast(t){const el=document.querySelector('.toast');if(!el)return;el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
function nav(){const p=state.profile||DEFAULT_PROFILE;const shield=(CLUB_SHIELDS.find(x=>x.name===p.shield)||CLUB_SHIELDS[0]);const packCount=Array.isArray(state.packs)?state.packs.length:0;const collectionCount=Array.isArray(state.collection)?state.collection.length:0;return `<header class="topbar"><div class="brand" onclick="go('home')" style="cursor:pointer">${assetImg(shield.path,'brand-crest','')}<div><h1>${esc(p.teamName)}</h1><span>${esc(p.username)} · FUT Draft</span></div></div><nav class="nav"><button class="${state.view==='home'?'active':''}" onclick="go('home')">Draft</button><button class="${state.view==='collection'?'active':''}" onclick="go('collection')">Colección</button><button class="${state.view==='packs'?'active':''}" onclick="go('packs')">Sobres${packCount?` <span class="nav-count">${packCount}</span>`:''}</button><button class="${state.view==='profile'?'active':''}" onclick="go('profile')">Perfil</button></nav></header>`}
function render(){const isDraft=state.view==='draft';app.innerHTML=`<div class="app ${isDraft?'draft-app':''}">${isDraft?'':nav()}<main class="shell ${isDraft?'draft-shell':''}">${state.view==='home'?renderHome():state.view==='draft'?renderDraft():state.view==='tournament'?renderTournament():state.view==='profile'?renderProfile():state.view==='summary'?renderSummary():state.view==='packs'?renderPacks():state.view==='collection'?renderCollection():renderHome()}</main><div id="modalRoot"></div><div class="toast"></div></div>`;if(state.packConfirm!==null)renderPackConfirm()}
function go(v){state.view=v;if(v==='collection'){state.newCards=[]}save();render()}
function renderHome(){return `${state.draft?`<div class="home-draft-action"><button class="btn" onclick="resumeDraft()">Continuar draft</button></div>`:''}<div class="notice">Elige una formación para empezar. Las especiales tienen menor probabilidad de aparecer, pero el sistema procura que un draft completo tenga varias.</div><div style="height:20px"></div><div class="formation-grid">${Object.keys(FORMATIONS).map(f=>formationCard(f)).join('')}</div>`}
function formationCard(f){const coords=FORMATIONS[f].slots.map(s=>[s[2],s[3]]);const minX=Math.min(...coords.map(p=>p[0])),maxX=Math.max(...coords.map(p=>p[0])),minY=Math.min(...coords.map(p=>p[1])),maxY=Math.max(...coords.map(p=>p[1]));const padX=6,padY=6;const left=Math.max(4,minX-padX),top=Math.max(4,minY-padY),right=Math.min(96,maxX+padX),bottom=Math.min(96,maxY+padY);return `<div class="formation-card card-panel" onclick="startDraft('${f}')"><div class="mini-pitch"><div class="mini-focus" style="left:${left}%;top:${top}%;width:${right-left}%;height:${bottom-top}%"></div>${coords.map(([x,y])=>`<i class="dot" style="left:${x}%;top:${y}%"></i>`).join('')}</div><div class="formation-title">${f}</div><div class="formation-desc">${FORMATIONS[f].slots.filter(s=>s[1]==='defensa').length} DEF · ${FORMATIONS[f].slots.filter(s=>s[1]==='medio').length} MED · ${FORMATIONS[f].slots.filter(s=>s[1]==='delantero').length} DEL</div></div>`}
function startDraft(f){state.view='draft';state.formation=f;state.draft={formation:f,picks:Array(11).fill(null),activeSlot:null,swapSlot:null,phase:'captain',captainPending:null,stage:'Octavos',teamRating:null,opponent:null,result:null};save();render()}
function resumeDraft(){state.view='draft';render()}
function renderDraft(){const d=state.draft;if(!d)return renderHome();const f=FORMATIONS[d.formation];const picked=d.picks.filter(Boolean);const rating=picked.length?Math.round(picked.reduce((a,id)=>a+cardById(id).rating,0)/picked.length):'—';const special=picked.filter(id=>cardById(id).special).length;const me=state.profile||DEFAULT_PROFILE;const shield=CLUB_SHIELDS.find(x=>x.name===me.shield)||CLUB_SHIELDS[0];const selectionOpen=d.activeSlot!==null || (d.phase==='captain' && !d.captainPending);return `<section class="draft-fullscreen ${selectionOpen?'selection-open':''}"><div class="draft-hud"><div class="draft-brand">${assetImg(shield.path,'draft-brand-crest','')}<div><span class="eyebrow">FUT Draft</span><strong>${esc(me.teamName)}</strong><small>${esc(me.username)} · ${d.formation}</small></div></div><div class="draft-actions"><button class="draft-exit" onclick="resetDraft()">Nuevo draft</button><button class="draft-exit draft-profile-btn" onclick="go('profile')">Editar perfil</button></div></div><div class="draft-stats"><span>JUGADORES <b>${picked.length}/11</b></span><span>MEDIA <b>${rating}</b></span><span>ESPECIALES <b>${special}</b></span></div><div class="draft-field"><div class="pitch">${f.slots.map((ss,i)=>slotHtml(ss,i,d.picks[i])).join('')}</div></div><div class="draft-choice-layer ${picked.length===11?'complete-layer':''}">${renderSelectionPanel()}</div></section>`}

function slotHtml(s,i,id){const d=state.draft;const active=d&&d.activeSlot===i&&!id;const swapSelected=d&&d.swapSlot===i&&!!id;const canCaptain=d&&d.phase==='captain'&&d.captainPending&&d.captainPending.position===s[1]&&!id;return `<div class="slot ${active?'active':''} ${swapSelected?'swap-selected':''} ${canCaptain?'captain-target':''}" style="left:${s[2]}%;top:${s[3]}%" onclick="handleSlotClick(${i})">${id?assetImg(cardById(id).path,'player-card',''):assetImg('imagenes mejor calidad/assets/huecojugador.png','placeholder','')}</div>`}
function renderSelectionPanel(){const d=state.draft;if(!d)return '';const full=d.picks.filter(Boolean).length===d.picks.length;if(full){return `<div class="draft-complete-actions"><button class="btn" onclick="beginTournament()">🏆 Iniciar torneo</button></div>`}if(d.phase==='captain'){if(d.captainPending){return ''}const choices=makeCaptainChoices();return `<div class="selection-modal"><div class="selection-help"><span class="selection-kicker">ELECCIÓN ESPECIAL</span><strong>ELIGE UN CAPITÁN</strong><p>Selecciona una de las 4 cartas.</p></div><div class="choices compact animated-choices">${choices.map(c=>choiceHtml(c,'captain')).join('')}</div></div>`}if(d.activeSlot===null)return '';const slot=FORMATIONS[d.formation].slots[d.activeSlot];const choices=makeChoices(slot[1]);return `<div class="selection-modal"><div class="selection-help"><span class="selection-kicker">${esc(POS_NAMES[slot[1]]).toUpperCase()}</span><strong>ELIGE UN JUGADOR</strong><p>Selecciona una de las 4 cartas para tu ${POS_NAMES[slot[1]].toLowerCase()}.</p></div><div class="choices compact animated-choices">${choices.map(c=>choiceHtml(c,d.activeSlot)).join('')}</div></div>`}

function handleSlotClick(i){
  const d=state.draft;
  if(!d)return;
  const full=d.picks.filter(Boolean).length===d.picks.length;
  if(full){
    if(!d.picks[i])return;
    if(d.swapSlot===null){d.swapSlot=i;save();render();return}
    if(d.swapSlot===i){d.swapSlot=null;save();render();return}
    [d.picks[d.swapSlot],d.picks[i]]=[d.picks[i],d.picks[d.swapSlot]];
    d.swapSlot=null;
    save();
    render();
    return;
  }
  if(d.picks[i])return;
  const slot=FORMATIONS[d.formation].slots[i];
  if(d.phase==='captain'){
    if(!d.captainPending)return;
    if(d.captainPending.position!==slot[1]){showToast('El capitán debe colocarse en una posición compatible.');return}
    d.picks[i]=d.captainPending.id;
    d.captainPending=null;
    d.phase='normal';
    d.activeSlot=null;
    save();
    render();
    return;
  }
  d.activeSlot=i;
  save();
  render();
}
function renderProfile(){
  const p=state.profile||DEFAULT_PROFILE;
  return `<section class="hero"><div><div class="eyebrow">Perfil</div><h2>Personaliza tu equipo</h2><p>Elige el nombre, usuario y escudo que aparecerán durante tus Drafts y partidos.</p></div><button class="btn" onclick="saveProfile()">Guardar cambios</button></section><div class="profile-grid"><div class="card-panel profile-form"><label>Nombre del equipo<input id="profileTeam" maxlength="28" value="${esc(p.teamName)}"></label><label>Nombre de usuario<input id="profileUser" maxlength="20" value="${esc(p.username)}"></label><div class="eyebrow">Escudo</div><div class="shield-grid">${CLUB_SHIELDS.map(s=>`<button type="button" class="shield-option ${s.name===p.shield?'selected':''}" onclick='selectShield(${JSON.stringify(s.name)})'>${assetImg(s.path,'',s.name)}<span>${esc(s.name)}</span></button>`).join('')}</div><input type="hidden" id="profileShield" value="${esc(p.shield)}"></div><div class="card-panel profile-preview"><div class="eyebrow">Vista previa</div>${assetImg((CLUB_SHIELDS.find(x=>x.name===p.shield)||CLUB_SHIELDS[0]).path,'profile-crest','').replace('<img ','<img id="profilePreviewShield" ')}<h3 id="profilePreviewTeam">${esc(p.teamName)}</h3><p id="profilePreviewUser">${esc(p.username)} · FUT Draft</p></div></div>`
}
function selectShield(name){
  const s=CLUB_SHIELDS.find(x=>x.name===name);
  if(!s)return;
  const hidden=document.getElementById('profileShield');
  if(hidden)hidden.value=s.name;
  document.querySelectorAll('.shield-option').forEach(x=>x.classList.remove('selected'));
  const btn=[...document.querySelectorAll('.shield-option')].find(x=>x.querySelector('span')?.textContent===s.name);
  if(btn)btn.classList.add('selected');
  const preview=document.getElementById('profilePreviewShield');
  if(preview)setAsset(preview,s.path);
}
function saveProfile(){
  const team=(document.getElementById('profileTeam')?.value||'Liga Bardina').trim().slice(0,28)||'Liga Bardina';
  const username=(document.getElementById('profileUser')?.value||'Jugador').trim().slice(0,20)||'Jugador';
  const shield=document.getElementById('profileShield')?.value||DEFAULT_PROFILE.shield;
  state.profile={teamName:team,username,shield};
  state.view='profile';
  save();
  render();
  showToast('Perfil guardado');
}
function renderSummary(){
  const s=state.lastSummary;
  if(!s||!Array.isArray(s.history))return renderHome();
  const me=state.profile||DEFAULT_PROFILE;
  const shield=(CLUB_SHIELDS.find(x=>x.name===me.shield)||CLUB_SHIELDS[0]).path;
  const wins=s.history.filter(x=>x.won).length;
  return `<section class="hero"><div><div class="eyebrow">Torneo terminado</div><h2>${s.place==='Campeón'?'¡CAMPEÓN!':'Fin del Draft'}</h2><p>${esc(me.teamName)} · ${esc(me.username)} · Media del equipo <b>${s.teamRating}</b> · Has conseguido <b>${s.packsEarned||0} sobre${(s.packsEarned||0)===1?'':'s'}</b>.</p></div><div class="hero-actions"><button class="btn secondary" onclick="go('packs')">Ver sobres</button><button class="btn" onclick="go('home')">Nuevo Draft</button></div></section><div class="summary-grid"><div class="card-panel summary-main"><div class="summary-team">${assetImg(shield,'score-crest','')}<div><h3>${esc(me.teamName)}</h3><p>${wins}/${s.history.length} victorias · Media ${s.teamRating}</p></div></div><h3>Resumen de partidos</h3>${s.history.length?s.history.map(x=>`<div class="summary-match"><div class="summary-round">${esc(x.stage)}</div>${assetImg(x.opponent.shield,'summary-crest','')}<div><b>${esc(x.opponent.name)}</b><small>Media ${x.opponent.rating}</small></div><strong class="${x.won?'win':'loss'}">${x.a} - ${x.b}</strong><span>${x.won?'VICTORIA':'DERROTA'}</span></div>`).join(''):'<p class="muted">No hay partidos registrados.</p>'}</div><div class="card-panel summary-side"><div class="eyebrow">Datos del Draft</div><div class="stat"><span>Resultado</span><b>${esc(s.place)}</b></div><div class="stat"><span>Media</span><b>${s.teamRating}</b></div><div class="stat"><span>Partidos</span><b>${s.history.length}</b></div><div class="stat"><span>Victorias</span><b>${wins}</b></div></div></div>`
}
function shuffleChoices(arr){const out=[...arr];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
function makeCaptainChoices(){const used=new Set((state.draft.picks||[]).filter(Boolean).map(id=>cardById(id).baseId));return shuffleChoices(sampleWeighted(LIGA_BARDINA_CARDS.filter(c=>c.rating>=83&&!used.has(c.baseId)),4))}
function chooseCaptain(id){const d=state.draft;if(!d||d.phase!=='captain')return;d.captainPending={id,position:cardById(id).position};save();render()}
function closeModal(){const root=document.getElementById('modalRoot');if(root)root.innerHTML=''}
function sampleWeighted(arr,n){const pool=[...arr],out=[];while(pool.length&&out.length<n){let total=pool.reduce((a,c)=>a+(c.special?.25:1),0),r=Math.random()*total,idx=0;for(;idx<pool.length;idx++){r-=pool[idx].special?.25:1;if(r<=0)break}out.push(pool.splice(Math.min(idx,pool.length-1),1)[0])}return out}
function makeChoices(pos){const d=state.draft;const used=new Set((d.picks||[]).filter(Boolean).map(id=>cardById(id).baseId));let pool=LIGA_BARDINA_CARDS.filter(c=>c.position===pos&&!used.has(c.baseId));let choices=sampleWeighted(pool,4);const pickedSpecial=d.picks.filter(id=>id&&cardById(id).special).length;const remaining=11-d.picks.filter(Boolean).length;if(pickedSpecial<3&&remaining<=3&&!choices.some(c=>c.special)){const sp=pool.filter(c=>c.special&&!choices.some(x=>x.baseId===c.baseId));if(sp.length)choices[0]=sp[Math.floor(Math.random()*sp.length)]}return shuffleChoices(choices)}
function choiceHtml(c,i){return `<button class="choice" onclick="${i==='captain'?`chooseCaptain('${c.id}')`:`pickCard('${c.id}',${i})`}">${assetImg(c.path,'','')}</button>`}
function pickCard(id,i){const d=state.draft;if(!d||d.phase!=='normal'||d.activeSlot!==i||d.picks[i])return;d.picks[i]=id;d.activeSlot=null;save();render();if(d.picks.filter(Boolean).length===11)showToast('Draft completado. ¡Once listo!')}
function resetDraft(){if(confirm('¿Empezar un draft nuevo? El progreso actual se perderá.')){state.draft=null;state.formation=null;go('home')}}
function beginTournament(){const d=state.draft;if(!d||!d.picks.every(Boolean))return;d.teamRating=Math.round(d.picks.reduce((a,id)=>a+cardById(id).rating,0)/11);d.stage='Octavos';d.result=null;d.match=null;d.tournamentStarted=true;d.matchHistory=[];d.usedShields=[];d.opponent=makeOpponent(d.stage,d.teamRating);state.view='tournament';save();render();}const stageOrder=['Octavos','Cuartos','Semifinal','Final'];
function makeOpponent(stage,my){let min,max;if(stage==='Octavos'){min=my-8;max=my-2}else if(stage==='Cuartos'){min=my-6;max=my}else if(stage==='Semifinal'){min=my-3;max=my+4}else{min=my-2;max=my+6}min=Math.max(65,Math.round(min));max=Math.min(95,Math.round(max));const used=new Set(state.draft?.usedShields||[]);let available=CLUB_SHIELDS.filter(x=>!used.has(x.name));if(!available.length){state.draft.usedShields=[];available=[...CLUB_SHIELDS]}const club=available[Math.floor(Math.random()*available.length)];state.draft.usedShields.push(club.name);return{name:club.name,shield:club.path,rating:Math.floor(min+Math.random()*(max-min+1))}}
function createMatchEvents(d){
 const diff=d.teamRating-d.opponent.rating;
 // Dificultad ligeramente más amable: el equipo tiene una pequeña ventaja
 // de base, pero la diferencia de medias sigue teniendo bastante peso.
 let p=0.58+diff*0.045;
 p=Math.max(.28,Math.min(.86,p));
 const won=Math.random()<p;
 let a,b;
 if(won){a=Math.floor(1+Math.random()*3);b=Math.floor(Math.random()*Math.max(1,a));if(a<=b)b=a-1}
 else{b=Math.floor(1+Math.random()*3);a=Math.floor(Math.random()*Math.max(1,b));if(b<=a)a=b-1}
 a=Math.max(1,a);b=Math.max(0,b);
 if(a===b){if(won)a++;else b++}
 const events=[];
 for(let i=0;i<a;i++)events.push({minute:Math.floor(5+Math.random()*86),team:'home',type:'goal',name:chooseScorer(d)});
 for(let i=0;i<b;i++)events.push({minute:Math.floor(5+Math.random()*86),team:'away',type:'goal'});
 const extraCount=2+Math.floor(Math.random()*4);
 for(let i=0;i<extraCount;i++){
   const team=Math.random()<0.5?'home':'away';
   const r=Math.random();
   const type=r<0.34?'miss':r<0.57?'post':'save';
   events.push({minute:Math.floor(4+Math.random()*87),team,type,name:team==='home'?chooseScorer(d):null,keeper:team==='away'?homeKeeperName(d):null});
 }
 events.sort((x,y)=>x.minute-y.minute);
 return {minute:0,home:0,away:0,events,log:[],finalHome:a,finalAway:b,playing:true,done:false};
}
function describeMatchEvent(ev,d){
 if(ev.type==='goal') return ev.team==='home'?`⚽ GOL · ${esc(ev.name)} ha marcado`:'⚽ GOL DEL RIVAL';
 if(ev.type==='post') return ev.team==='home'?`🪵 AL PALO · ${esc(ev.name)} ha estrellado el balón en el palo`:'🪵 AL PALO · El rival ha dado al palo';
 if(ev.type==='save') return ev.team==='away'?`🧤 PARADÓN · ${esc(ev.keeper)} ha evitado el gol del rival`:'🧤 PARADA · El portero rival ha evitado el gol';
 return ev.team==='home'?`❌ FALLO · ${esc(ev.name)} ha fallado una ocasión`:'❌ FALLO DEL RIVAL';
}
function simulateMatch(){const d=state.draft;if(!d?.opponent||d.match?.playing)return;if(d.match?.done){continueTournament();return}d.match=createMatchEvents(d);state.view='tournament';save();render();runMatchClock()}
function runMatchClock(){const d=state.draft;if(!d?.match?.playing)return;const tick=()=>{const m=d.match;if(!m||!m.playing)return;m.minute=Math.min(90,m.minute+1);while(m.events.length&&m.events[0].minute<=m.minute){const ev=m.events.shift();if(ev.type==='goal'){if(ev.team==='home')m.home++;else m.away++;}m.log.unshift({minute:ev.minute,team:ev.team,type:ev.type,description:describeMatchEvent(ev,d),score:`${m.home}-${m.away}`});}save();render();if(m.minute>=90){m.playing=false;m.done=true;d.result={won:m.home>m.away,a:m.home,b:m.away,stage:d.stage};d.matchHistory.push({stage:d.stage,opponent:{...d.opponent},a:m.home,b:m.away,won:d.result.won});save();render();return}setTimeout(tick,120)};setTimeout(tick,120)}
function continueTournament(){const d=state.draft;if(!d?.result)return;const won=d.result.won;if(won){const idx=stageOrder.indexOf(d.stage);if(idx===stageOrder.length-1){finishDraft('Campeón');return}d.stage=stageOrder[idx+1];d.opponent=makeOpponent(d.stage,d.teamRating);d.result=null;d.match=null;state.view='tournament';save();render()}else{finishDraft(d.stage)}}
function finishDraft(place){const rewards=packRewardsForPlace(place);const finished=state.draft;state.lastSummary={place,teamRating:finished.teamRating,history:[...(finished.matchHistory||[])],packsEarned:rewards.length};rewards.forEach(type=>state.packs.push({id:`pack_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,type}));state.draft=null;state.formation=null;state.view='summary';save();render();showToast(`Has conseguido ${rewards.length} sobre${rewards.length===1?'':'s'}`)}
function packRewardsForPlace(place){if(place==='Campeón')return ['unique','rare','rare'];if(place==='Final')return ['unique','rare'];if(place==='Semifinal')return ['rare','common'];if(place==='Cuartos')return ['common','common'];return ['common']}
function renderTournament(){const d=state.draft;if(!d)return renderHome();const m=d.match;const home=m?m.home:0,away=m?m.away:0,minute=m?m.minute:0;const status=m?.playing?'EN JUEGO':m?.done?'FINAL':'LISTO';const me=state.profile||DEFAULT_PROFILE;const myShield=(CLUB_SHIELDS.find(x=>x.name===me.shield)||CLUB_SHIELDS[0]).path;return `<section class="tournament-screen"><div class="tournament-head"><div><div class="eyebrow">Torneo · ${d.stage}</div><h2>${d.stage}</h2><p>${esc(me.teamName)} contra ${esc(d.opponent.name)} · Media ${d.teamRating} vs ${d.opponent.rating}</p></div><div class="tournament-actions">${m?.done?`<button class="btn" onclick="continueTournament()">${d.result?.won?(d.stage==='Final'?'Ver resumen':'Siguiente ronda'):'Ver resumen'}</button>`:`<button class="btn" onclick="simulateMatch()">⚽ Simular ${d.stage}</button>`}<button class="btn secondary" onclick="go('draft')">Ver Draft</button></div></div><div class="scoreboard card-panel"><div class="score-team">${assetImg(myShield,'score-crest','')}<h3>${esc(me.teamName)}</h3><small>${esc(me.username)} · Media ${d.teamRating}</small></div><div class="score-center"><div class="live-badge ${m?.playing?'live':''}">${status}</div><div class="big-score">${home} <span>-</span> ${away}</div><div class="minute">${minute}'</div></div><div class="score-team">${assetImg(d.opponent.shield,'score-crest rival','')}<h3>${esc(d.opponent.name)}</h3><small>Media ${d.opponent.rating}</small></div></div><div class="match-events card-panel"><div class="eyebrow">Incidencias</div>${m?.log?.length?m.log.map(e=>`<div class="event-row"><b>${e.minute}'</b><span>${e.description}</span><strong>${e.score}</strong></div>`).join(''):'<p class="muted">'+(m?.playing?'Partido en juego…':'Pulsa «Simular» para comenzar el partido.')+'</p>'}<div class="timeline"><span>0'</span><i></i><span>45'</span><i></i><span>90'</span></div></div></section>`}
function packLabel(type){return type==='unique'?'SOBRE ÚNICO':type==='rare'?'SOBRE RARO':'SOBRE COMÚN'}
function packImage(type){return type==='unique'?'imagenes mejor calidad/assets/sobreunico.png':type==='rare'?'imagenes mejor calidad/assets/sobreraro.png':'imagenes mejor calidad/assets/sobrecomun.png'}
function renderPacks(){
  const packs=Array.isArray(state.packs)?state.packs:[];
  const open=state.packOpen;
  return `<section class="hero"><div><div class="eyebrow">Recompensas</div><h2>Sobres</h2><p>Aquí aparecen todos los sobres que has conseguido en los torneos. Cada sobre contiene 5 jugadores.</p></div><button class="btn secondary" onclick="go('home')">Volver al Draft</button></section>${packs.length?`<div class="packs-grid">${packs.map((pack,i)=>`<button class="pack-inventory-card ${pack.type}" onclick="confirmPack(${i})"><img class="pack-art inventory-art" src="${assetUrl(packImage(pack.type))}" data-asset-path="${esc(packImage(pack.type))}" data-asset-index="0" alt="${esc(packLabel(pack.type))}" onerror="fallbackImage(this)"><span class="pack-name">${packLabel(pack.type)}</span><span>Haz clic para abrir</span></button>`).join('')}</div>`:`<div class="empty packs-empty card-panel"><h3>No tienes sobres todavía</h3></div>`}${open?renderPackOpening(open):''}`;
}
function confirmPack(index){if(!Array.isArray(state.packs)||!state.packs[index])return;state.packConfirm=index;save();render()}
function cancelPackConfirm(){state.packConfirm=null;save();render()}
function acceptPackConfirm(){const index=state.packConfirm;if(index===null||!state.packs?.[index])return;const pack=state.packs[index];state.packs.splice(index,1);state.packConfirm=null;state.packOpen={id:pack.id,type:pack.type,cards:makePack(pack.type),opening:true,revealed:0};save();render();setTimeout(()=>finishPackEnvelopeAnimation(),720)}
function renderPackConfirm(){const root=document.getElementById('modalRoot');if(!root)return;const pack=state.packs?.[state.packConfirm];if(!pack)return;root.innerHTML=`<div class="pick-modal open"><div class="modal pack-confirm-modal"><img class="pack-confirm-art" src="${assetUrl(packImage(pack.type))}" data-asset-path="${esc(packImage(pack.type))}" data-asset-index="0" alt="${esc(packLabel(pack.type))}" onerror="fallbackImage(this)"><div class="eyebrow">${packLabel(pack.type)}</div><h3>¿Estás seguro de abrir este sobre?</h3><p>Contiene <b>5 jugadores</b>. Una vez abierto, el sobre desaparecerá de tus recompensas.</p><div class="pack-confirm-actions"><button class="btn secondary" onclick="cancelPackConfirm()">Cancelar</button><button class="btn" onclick="acceptPackConfirm()">Aceptar</button></div></div></div>`}
function renderPackOpening(open){const cards=open.cards||[];return `<div class="pack-opening-overlay"><div class="pack-opening-stage"><div class="pack-opening-kicker">${open.opening?'ABRIENDO SOBRE':'JUGADORES OBTENIDOS'}</div>${open.opening?`<div class="pack-envelope-hero is-opening"><img class="pack-art opening-pack-art" src="${assetUrl(packImage(open.type))}" data-asset-path="${esc(packImage(open.type))}" data-asset-index="0" alt="${esc(packLabel(open.type))}" onerror="fallbackImage(this)"></div>`:`<div class="pack-reveal-title">${open.revealed} / 5</div><div class="pack-reveal-row">${cards.map((c,i)=>i<open.revealed?`<div class="pack-reveal-item"><div class="pack-new-badge ${open.newFlags?.[i]?'show':''}">NEW</div><div class="pack-reveal-card is-revealed" style="--reveal-index:${i}">${assetImg(c.path,'','')}</div></div>`:`<div class="pack-reveal-item reveal-empty" aria-hidden="true"></div>`).join('')}</div>${open.revealed>=cards.length&&cards.length?`<button class="btn" onclick="closePackOpening()">Continuar</button>`:''}`}</div></div>`}
function finishPackEnvelopeAnimation(){if(!state.packOpen?.opening)return;state.packOpen.opening=false;state.packOpen.revealed=0;save();render();setTimeout(()=>revealPackCard(0),260)}
function revealPackCard(index){if(!state.packOpen||state.packOpen.opening)return;const cards=state.packOpen.cards||[];if(index>=cards.length)return;const card=cards[index];const already=state.collection.includes(card.id);if(!already){state.collection.push(card.id);state.newCards.push(card.id)}if(!Array.isArray(state.packOpen.newFlags))state.packOpen.newFlags=[];state.packOpen.newFlags[index]=!already;state.packOpen.revealed=index+1;save();render();if(index<cards.length-1)setTimeout(()=>revealPackCard(index+1),620)}
function closePackOpening(){state.packOpen=null;save();go('packs')}
function makePack(type='common'){const choices=[],used=new Set();for(let i=0;i<5;i++){let pool=LIGA_BARDINA_CARDS.filter(c=>!used.has(c.baseId));if(type==='common')pool=pool.filter(c=>c.rating<=82);else if(type==='unique')pool=pool.filter(c=>c.rating>=82);const card=samplePackCard(pool,type);if(!card)break;choices.push(card);used.add(card.baseId)}return choices}
function samplePackCard(arr,type){if(!arr.length)return null;const pool=[...arr];const weights=pool.map(c=>{let w=1;if(type==='common'){w=c.special?.12:1;if(c.rating>=80)w*=.7;if(c.rating<=75)w*=1.15}else if(type==='rare'){if(c.special)w=1.8;else if(c.rating>=85)w=1.25;else if(c.rating>=80)w=1.05;else w=.9}else{if(c.special)w=2.2;else if(c.rating>=90)w=1.8;else if(c.rating>=85)w=1.25;else w=.8}return w});let total=weights.reduce((a,b)=>a+b,0),r=Math.random()*total;for(let i=0;i<pool.length;i++){r-=weights[i];if(r<=0)return pool[i]}return pool[pool.length-1]}

function renderCollection(){const owned=new Set(state.collection||[]);const unique=owned.size;const total=LIGA_BARDINA_CARDS.length;return `<section class="hero"><div><div class="eyebrow">Colección</div><h2>Tus cartas</h2><p>${unique} / ${total} cartas conseguidas. Las cartas que todavía no tienes aparecen oscurecidas.</p></div><div class="collection-progress"><b>${unique}</b><span>/ ${total}</span></div></section><div class="filters"><button class="filter active" onclick="filterCollection('todos',this)">Todas</button><button class="filter" onclick="filterCollection('normal',this)">Normales</button><button class="filter" onclick="filterCollection('especial',this)">Especiales</button><button class="filter" onclick="filterCollection('portero',this)">POR</button><button class="filter" onclick="filterCollection('defensa',this)">DEF</button><button class="filter" onclick="filterCollection('medio',this)">MED</button><button class="filter" onclick="filterCollection('delantero',this)">DEL</button></div><div id="collectionGrid" class="collection-grid">${collectionHtml()}</div><div class="collection-reset-wrap"><button class="btn danger" onclick="resetCollection()">Resetear colección</button></div>`}
function collectionHtml(filter='todos'){const owned=new Set(state.collection||[]);const fresh=new Set(state.newCards||[]);let cards=LIGA_BARDINA_CARDS.filter(c=>filter==='todos'||(filter==='especial'&&c.special)||(filter==='normal'&&!c.special)||c.position===filter);if(filter==='todos'){const order=['portero','defensa','medio','delantero'];const rank=c=>order.indexOf(c.position);cards=[...cards.filter(c=>!c.special).sort((a,b)=>rank(a)-rank(b)||a.id.localeCompare(b.id,undefined,{numeric:true})),...cards.filter(c=>c.special).sort((a,b)=>rank(a)-rank(b)||a.id.localeCompare(b.id,undefined,{numeric:true}))]}return cards.length?cards.map(c=>{const isOwned=owned.has(c.id);const isNew=isOwned&&fresh.has(c.id);return `<button class="collection-card image-only ${isOwned?'owned':'locked'} ${isNew?'is-new':''}" title="${isOwned?esc(cardName(c)):'Carta no conseguida'}">${isNew?'<span class="collection-new-badge">NEW</span>':''}${assetImg(c.path,'','')}</button>`}).join(''):`<div class="empty">No hay cartas en este filtro.</div>`}
function resetCollection(){if(!confirm('¿Seguro que quieres resetear la colección? Perderás todas las cartas conseguidas y tendrás que volver a conseguirlas.'))return;state.collection=[];state.newCards=[];save();render();showToast('Colección reseteada');}
function filterCollection(f,btn){document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('collectionGrid').innerHTML=collectionHtml(f)}

function renderSquad(){const f=state.squad.formation;const slots=FORMATIONS[f].slots;return `<section class="hero"><div><div class="eyebrow">Mi plantilla</div><h2>Once ideal</h2><p>Elige una formación y coloca una carta de tu colección en cada posición. Un mismo jugador no puede ocupar dos puestos.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap">${Object.keys(FORMATIONS).map(x=>`<button class="filter ${x===f?'active':''}" onclick="setSquadFormation('${x}')">${x}</button>`).join('')}</div></section><div class="draft-layout"><div class="pitch-wrap card-panel"><div class="pitch">${slots.map((s,i)=>squadSlotHtml(s,i,state.squad.slots[i])).join('')}</div></div><aside class="side card-panel"><h3>Mi XI</h3><div class="stat"><span>Cartas colocadas</span><b>${state.squad.slots.filter(Boolean).length}/11</b></div><div class="stat"><span>Media</span><b>${squadRating()}</b></div><div class="side-actions"><button class="btn" onclick="clearSquad()">Vaciar plantilla</button><button class="btn secondary" onclick="go('collection')">Ver colección</button></div></aside></div>`}
function setSquadFormation(f){state.squad.formation=f;state.squad.slots=Array(11).fill(null);save();render()}
function squadRating(){const cards=state.squad.slots.filter(Boolean).map(id=>cardById(id));return cards.length?Math.round(cards.reduce((a,c)=>a+c.rating,0)/cards.length):'—'}
function squadSlotHtml(s,i,id){return `<div class="slot" style="left:${s[2]}%;top:${s[3]}%" onclick="openSquadModal(${i})">${id?`${assetImg(cardById(id).path,'player-card','')}`:`${assetImg('imagenes mejor calidad/assets/huecojugador.png','placeholder','')}`}</div>`}
function openSquadModal(i){const slot=FORMATIONS[state.squad.formation].slots[i];const used=new Set(state.squad.slots.filter((id,j)=>id&&j!==i).map(id=>cardById(id).baseId));let cards=state.collection.map(id=>cardById(id)).filter(c=>c.position===slot[1]&&!used.has(c.baseId));const seen=new Set();cards=cards.filter(c=>{if(seen.has(c.baseId))return false;seen.add(c.baseId);return true}).sort((a,b)=>b.rating-a.rating);const root=document.getElementById('modalRoot');root.innerHTML=`<div class="pick-modal open"><div class="modal"><div class="modal-head"><div><div class="eyebrow">Mi plantilla · ${POS_NAMES[slot[1]]}</div><h3>Elige a tu jugador</h3></div><button class="btn secondary" onclick="closeModal()">Cerrar</button></div>${cards.length?`<div class="choices">${cards.map(c=>`<button class="choice" onclick="setSquadCard(${i},'${c.id}')">${assetImg(c.path,'','')}</button>`).join('')}</div>`:`<div class="empty">No tienes cartas elegibles para esta posición.</div>`}</div></div>`}
function setSquadCard(i,id){state.squad.slots[i]=id;save();closeModal();render()}
function clearSquad(){state.squad.slots=Array(11).fill(null);save();render()}
render();
window.go=go;window.startDraft=startDraft;window.resumeDraft=resumeDraft;window.chooseCaptain=chooseCaptain;window.handleSlotClick=handleSlotClick;window.closeModal=closeModal;window.pickCard=pickCard;window.resetDraft=resetDraft;window.beginTournament=beginTournament;window.simulateMatch=simulateMatch;window.continueTournament=continueTournament;window.saveProfile=saveProfile;window.selectShield=selectShield;window.confirmPack=confirmPack;window.cancelPackConfirm=cancelPackConfirm;window.acceptPackConfirm=acceptPackConfirm;window.closePackOpening=closePackOpening;

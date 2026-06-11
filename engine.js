/* FlicKey UNIFIED engine v2 (prototype): ONE macOS screen.
   - The dock has real app icons. Selecting an app (click or auto-cycle) shows
     that app's window and arms its input language (the menu-bar pill wiggles).
   - Terminal / Telegram / WhatsApp / Chrome / Safari are display skins.
   - The FlicKey app opens the interactive Fix converter - the hands-on demo.
   - Real, live menu-bar clock.
   Generic site bits (hero, reveal, accordions, version, keycaps) are unchanged. */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // glyph into brand squircles
  var glyphTpl = document.getElementById('glyph');
  if(glyphTpl){
    var glyph = glyphTpl.content;
    ['navico','footico','heroico'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.appendChild(glyph.cloneNode(true));
    });
  }
  var nav=document.getElementById('nav');
  if(nav){ var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>10); }; onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); }

  /* ---------- hero self-fixing line ---------- */
  var flText=document.getElementById('flText'), flA=document.getElementById('flA'), flB=document.getElementById('flB');
  var hk1=document.getElementById('hk1'), hk2=document.getElementById('hk2');
  var PHRASES=[
    {g:'akuo',f:'שלום',a:'EN',b:'HE',rtl:true},{g:'ghbdtn',f:'привет',a:'EN',b:'RU',rtl:false},
    {g:'sghl',f:'سلام',a:'EN',b:'AR',rtl:true},{g:'geia',f:'γεια',a:'EN',b:'GR',rtl:false},
    {g:'ghbdsn',f:'привіт',a:'EN',b:'UA',rtl:false}
  ];
  if(reduce || !flText){ if(flText){ flText.textContent='akuo → שלום'; } }
  else { var pi=0; (function showPhrase(){
      var p=PHRASES[pi]; flA.textContent=p.a; flB.textContent=p.b; flText.classList.remove('fixed'); flText.style.direction='ltr';
      var i=0;(function typeChar(){ if(i<=p.g.length){ flText.textContent=p.g.slice(0,i); i++; setTimeout(typeChar,95); return; } setTimeout(pressKeys,620); })();
      function pressKeys(){ if(hk1) hk1.classList.add('press'); setTimeout(function(){ if(hk2) hk2.classList.add('press'); },110); setTimeout(function(){ if(hk1) hk1.classList.remove('press'); if(hk2) hk2.classList.remove('press'); fix(); },360); }
      function fix(){ flText.style.transition='opacity .15s, filter .15s'; flText.style.opacity='0'; flText.style.filter='blur(6px)'; setTimeout(function(){ flText.classList.add('fixed'); flText.style.direction=p.rtl?'rtl':'ltr'; flText.textContent=p.f; flText.style.opacity='1'; flText.style.filter='none'; setTimeout(erase,1700); },170); }
      function erase(){ var s=p.f;(function del(){ if(s.length){ s=s.slice(0,-1); flText.textContent=s; setTimeout(del,42); return; } pi=(pi+1)%PHRASES.length; setTimeout(showPhrase,420); })(); }
    })(); }

  /* ---------- layout maps + converter ---------- */
  var MAPS={
    he:{q:'/',w:"'",e:'ק',r:'ר',t:'א',y:'ט',u:'ו',i:'ן',o:'ם',p:'פ',a:'ש',s:'ד',d:'ג',f:'כ',g:'ע',h:'י',j:'ח',k:'ל',l:'ך',';':'ף',z:'ז',x:'ס',c:'ב',v:'ה',b:'נ',n:'מ',m:'צ',',':'ת','.':'ץ','/':'.'},
    ru:{q:'й',w:'ц',e:'у',r:'к',t:'е',y:'н',u:'г',i:'ш',o:'щ',p:'з','[':'х',']':'ъ',a:'ф',s:'ы',d:'в',f:'а',g:'п',h:'р',j:'о',k:'л',l:'д',';':'ж',"'":'э',z:'я',x:'ч',c:'с',v:'м',b:'и',n:'т',m:'ь',',':'б','.':'ю'},
    ar:{q:'ض',w:'ص',e:'ث',r:'ق',t:'ف',y:'غ',u:'ع',i:'ه',o:'خ',p:'ح',a:'ش',s:'س',d:'ي',f:'ب',g:'ل',h:'ا',j:'ت',k:'ن',l:'م',';':'ك',z:'ئ',x:'ء',c:'ؤ',v:'ر',b:'لا',n:'ى',m:'ة',',':'و','.':'ز'}
  };
  var REV={}; Object.keys(MAPS).forEach(function(id){ REV[id]={}; Object.keys(MAPS[id]).forEach(function(k){ REV[id][MAPS[id][k]]=k; }); });
  var rtlRe=/[֐-׿؀-ۿ]/, nativeRe={he:/[֐-׿]/,ru:/[Ѐ-ӿ]/,ar:/[؀-ۿ]/};
  function convert(text,id){
    if(nativeRe[id].test(text)){ var r=REV[id]; return {out:text.split('').map(function(c){return r[c]!==undefined?r[c]:c;}).join(''),side:'a'}; }
    var m=MAPS[id]; return {out:text.split('').map(function(c){var l=c.toLowerCase();return m[l]!==undefined?m[l]:c;}).join(''),side:'b'};
  }

  /* ---------- brand icons ---------- */
  var ARROWS='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17 4 21 8 17 12"/><path d="M21 8H8a4 4 0 0 0-4 4"/><path d="M7 20 3 16 7 12"/><path d="M3 16h13a4 4 0 0 0 4-4"/></svg>';
  var ICONS={
    terminal:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#26262b"/><path d="M13 17l7 7-7 7" fill="none" stroke="#4ade80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M25 32h11" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/></svg>',
    telegram:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#2aabee"/><path fill="#fff" d="M9.8 22.9 37.3 12c1.3-.5 2.4.3 2 2.3L34.6 35c-.3 1.4-1.1 1.7-2.2 1.1l-6.3-4.7-3 2.9c-.3.3-.6.6-1.3.6l.5-6.7 12.3-11.1c.5-.5-.1-.7-.8-.3L18.6 25.7l-6.5-2c-1.4-.5-1.4-1.4.2-2z"/></svg>',
    whatsapp:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#25d366"/><path fill="#fff" d="M24 12.5c-6.4 0-11.6 5.2-11.6 11.5 0 2 .6 4 1.6 5.7L12.4 35.5l6-1.6c1.6.9 3.5 1.4 5.6 1.4 6.4 0 11.6-5.2 11.6-11.5S30.4 12.5 24 12.5z"/><path fill="#25d366" d="M30.6 27.7c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.4-4.7-5.6-4.9-.2-.2-1.3-1.8-1.3-3.4s.8-2.4 1.1-2.7c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l.9 2.3c.1.2.1.3 0 .5l-.4.6c-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.5 1.4 1.2 2.5 1.5 2.8 1.7.3.1.5.1.7-.1l.9-1.1c.2-.3.5-.2.8-.1l2.2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.3z"/></svg>',
    chrome:'<span class="ic ic-chrome"></span>',
    safari:'<span class="ic ic-safari"><span class="needle"></span></span>',
    teams:'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#4b53bc"/><circle cx="33.5" cy="13" r="4" fill="#eef0ff"/><rect x="12" y="16" width="20" height="18" rx="4.5" fill="#7b83eb"/><path d="M16 21.5h12M22 21.5v8.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
    flickey:'<span class="ic ic-flickey">'+ARROWS+'</span>'
  };

  /* ---------- DOM refs ---------- */
  var dock=document.getElementById('dock'), appWin=document.getElementById('appWin'),
      mbApp=document.getElementById('mbApp'), inputPill=document.getElementById('inputPill'),
      mbClock=document.getElementById('mbClock'), winTitle=document.getElementById('winTitle'), winIcon=document.getElementById('winIcon');
  var skTerm=document.getElementById('skTerm'), skChat=document.getElementById('skChat'),
      skWeb=document.getElementById('skWeb'), skFk=document.getElementById('skFk'), skTeams=document.getElementById('skTeams');
  var tmList=document.getElementById('tmList'), tmHead=document.getElementById('tmHead'),
      tmRecv=document.getElementById('tmRecv'), tmSent=document.getElementById('tmSent'), tmLang=document.getElementById('tmLang');
  var chAv=document.getElementById('chAv'), chName=document.getElementById('chName'), chSub=document.getElementById('chSub'),
      chRecv=document.getElementById('chRecv'), chSent=document.getElementById('chSent'), chPh=document.getElementById('chPh'), chLang=document.getElementById('chLang');
  var bwTabs=document.getElementById('bwTabs'), bwUrl=document.getElementById('bwUrl'), bwWm=document.getElementById('bwWm'),
      bwQ=document.getElementById('bwQ'), bwSearch=document.getElementById('bwSearch');
  // flickey converter refs
  var input=document.getElementById('demoInput'), field=document.getElementById('field'), flash=document.getElementById('flash'),
      flipBtn=document.getElementById('flipBtn'), key1=document.getElementById('key1'), key2=document.getElementById('key2'),
      langpill=document.getElementById('langpill'), cardBadge=document.getElementById('cardBadge');
  var spanA=langpill?langpill.querySelector('.a'):null, spanB=langpill?langpill.querySelector('.b'):null;
  var pairTabs=document.querySelectorAll('.pairtab');

  /* ---------- the menu-bar pill (with wiggle on language change) ---------- */
  var lastPill='';
  function setPill(code){
    if(!inputPill) return;
    if(code!==lastPill){
      inputPill.textContent=code; lastPill=code;
      if(!reduce){ inputPill.classList.remove('wiggle'); void inputPill.offsetWidth; inputPill.classList.add('wiggle'); }
    }
  }

  /* ---------- the FlicKey demo (interactive converter) ---------- */
  var PAIRS={ he:{a:'EN',b:'HE',seed:'akuo'}, ru:{a:'DE',b:'RU',seed:'ghbdtn'}, ar:{a:'FR',b:'AR',seed:'lvpfh'} };
  var curPair='he', busy=false, fkActive=false;
  function applySide(){
    if(!field||!input) return;
    field.classList.toggle('he', rtlRe.test(input.value));
    var side = nativeRe[curPair].test(input.value)?'b':'a';
    if(langpill) langpill.setAttribute('data-side',side);
    if(fkActive) setPill(side==='b'?PAIRS[curPair].b:PAIRS[curPair].a);
  }
  function setPair(id){
    curPair=id; var p=PAIRS[id];
    if(spanA) spanA.textContent=p.a; if(spanB) spanB.textContent=p.b;
    if(input){ input.value=p.seed; input.style.opacity='1'; input.style.filter='none'; }
    applySide();
    pairTabs.forEach(function(t){ t.setAttribute('aria-selected', t.dataset.pair===id?'true':'false'); });
  }
  pairTabs.forEach(function(t){ t.addEventListener('click',function(){ userPick=true; setPair(t.dataset.pair); }); });
  function doFlip(){
    if(busy || !input || !input.value.trim()) return;
    busy=true; userPick=true;
    var res=convert(input.value,curPair);
    if(key1) key1.classList.add('press'); if(key2) key2.classList.add('press');
    if(flipBtn) flipBtn.classList.add('flip-spin');
    if(flash){ flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
    setTimeout(function(){ if(key1) key1.classList.remove('press'); if(key2) key2.classList.remove('press'); },180);
    setTimeout(function(){ if(flipBtn) flipBtn.classList.remove('flip-spin'); },520);
    var commit=function(){
      input.value=res.out;
      if(langpill) langpill.setAttribute('data-side',res.side);
      field.classList.toggle('he', rtlRe.test(res.out));
      setPill(res.side==='b'?PAIRS[curPair].b:PAIRS[curPair].a);
      busy=false;
    };
    if(reduce){ commit(); return; }
    input.style.transition='opacity .16s, filter .16s'; input.style.opacity='0'; input.style.filter='blur(6px)';
    setTimeout(function(){ commit(); input.style.opacity='1'; input.style.filter='none'; },170);
  }
  if(flipBtn) flipBtn.addEventListener('click',doFlip);
  if(langpill) langpill.addEventListener('click',doFlip);
  if(input){
    input.addEventListener('input',applySide);
    input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); doFlip(); } });
    input.addEventListener('focus',function(){ userPick=true; });
  }
  window.addEventListener('keydown',function(e){ if(e.altKey && e.key==='2' && fkActive){ e.preventDefault(); doFlip(); } });

  // features menu-bar badge cycles
  if(!reduce && cardBadge){ var codes=['HE','RU','AR','EN'], ci=0; setInterval(function(){ ci=(ci+1)%codes.length; cardBadge.textContent=codes[ci]; },2400); }

  /* ---------- live menu-bar clock ---------- */
  (function(){
    if(!mbClock) return;
    var DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function tick(){ var d=new Date(), h=d.getHours(), m=d.getMinutes(); mbClock.textContent = DAY[d.getDay()]+' '+d.getDate()+' '+MON[d.getMonth()]+'  '+(h<10?'0'+h:h)+':'+(m<10?'0'+m:m); }
    tick(); setInterval(tick, 15000);
  })();

  /* ---------- apps ---------- */
  var APPS=[
    {kind:'terminal', name:'Terminal', icon:'terminal', color:'#2b2b30', code:'EN', lang:'English'},
    {kind:'chat', name:'Telegram', icon:'telegram', color:'#2aabee', code:'RU', lang:'Russian', who:'Dmitri', av:'#2aabee', recv:'Ты где?', sent:'Привет! Уже еду', rtl:false},
    {kind:'chat', name:'WhatsApp', icon:'whatsapp', color:'#25d366', code:'AR', lang:'Arabic', who:'Yasmin', av:'#25d366', recv:'أين أنت؟', sent:'مرحبا، أنا في الطريق', rtl:true, wa:true},
    {kind:'teams', name:'Teams', icon:'teams', color:'#4b53bc', chats:[
      {who:'Design Sync', code:'EN', lang:'English', av:'#5b62d6', recv:'Standup at 10?',  sent:'Yes - joining now', rtl:false},
      {who:'דנה לוי',     code:'HE', lang:'Hebrew',  av:'#d6442f', recv:'שלחת את הדוח?',    sent:'כן, בדרך אליך',     rtl:true},
      {who:'Дмитрий',     code:'RU', lang:'Russian', av:'#2aabee', recv:'Готов к встрече?', sent:'Да, почти',         rtl:false}
    ]},
    {kind:'browser', name:'Chrome', icon:'chrome', color:'#4a90e2', brand:'chrome', tabs:[
      {site:'google.com', code:'EN', lang:'English', fav:'#4285F4', wm:'Google', wmColor:'#e9e8f0', q:'flights to tel aviv', rtl:false},
      {site:'vk.com',     code:'RU', lang:'Russian', fav:'#4a76a8', wm:'VK',     wmColor:'#6f9bd8', q:'Привет, как дела?',  rtl:false},
      {site:'youm7.com',  code:'AR', lang:'Arabic',  fav:'#c0392b', wm:'youm7',  wmColor:'#e0604c', q:'أخبار اليوم',        rtl:true}
    ]},
    {kind:'browser', name:'Safari', icon:'safari', color:'#1f8cf0', brand:'safari', tabs:[
      {site:'apple.com',   code:'EN', lang:'English', fav:'#bbb',     wm:'Apple',   wmColor:'#e9e8f0', q:'macbook air m4',    rtl:false},
      {site:'ynet.co.il',  code:'HE', lang:'Hebrew',  fav:'#d6442f',  wm:'ynet',    wmColor:'#e23b2e', q:'מזג האוויר מחר',    rtl:true},
      {site:'lemonde.fr',  code:'FR', lang:'French',  fav:'#111',     wm:'Le Monde',wmColor:'#dcdce4', q:'actualités du jour',rtl:false}
    ]},
    {kind:'flickey', name:'FlicKey', icon:'flickey', color:'#6A47F2', code:'EN', lang:'English'}
  ];

  function setIcon(html,bg){ winIcon.innerHTML=html; winIcon.style.background = bg||'transparent'; }
  function hideAllSkins(){ [skTerm,skChat,skWeb,skFk,skTeams].forEach(function(s){ if(s) s.classList.remove('on'); }); }
  function applyPop(){ if(reduce||!appWin) return; appWin.classList.remove('pop'); void appWin.offsetWidth; appWin.classList.add('pop'); }

  var curApp=-1, userPick=false;

  function showBrowser(app){
    if(!skWeb) return;
    skWeb.classList.toggle('safari', app.brand==='safari');
    bwTabs.innerHTML='';
    app.tabs.forEach(function(tab,ti){
      var t=document.createElement('button'); t.className='bw-tab';
      t.innerHTML='<span class="bw-fav" style="background:'+tab.fav+'"></span><span class="bw-tlabel">'+tab.site+'</span><span class="bw-x">×</span>';
      t.addEventListener('click',function(){ userPick=true; setTab(app,ti,t); });
      bwTabs.appendChild(t);
    });
    setTab(app,0,bwTabs.children[0]);
  }
  function setTab(app,ti,el){
    var tab=app.tabs[ti];
    Array.prototype.forEach.call(bwTabs.children,function(c,j){ c.setAttribute('aria-current', j===ti?'true':'false'); });
    bwUrl.textContent=tab.site;
    bwWm.textContent=tab.wm; bwWm.style.color=tab.wmColor;
    bwQ.textContent=tab.q; bwSearch.classList.toggle('rtl',tab.rtl);
    skWeb.style.setProperty('--bsite', tab.fav);
    if(!reduce){ skWeb.classList.remove('flashing'); void skWeb.offsetWidth; skWeb.classList.add('flashing'); }
    setPill(tab.code);
  }

  /* Teams: per-chat input language. A vertical list of conversations; picking one
     shows its thread and arms THAT chat's language (the menu-bar pill follows). */
  function showTeams(app){
    if(!skTeams||!tmList) return;
    tmList.innerHTML='';
    app.chats.forEach(function(c,ci){
      var b=document.createElement('button'); b.className='tm-row';
      b.innerHTML='<span class="tm-av" style="background:'+c.av+'">'+c.who.charAt(0)+'</span>'+
        '<span class="tm-rmeta"><span class="tm-rname">'+c.who+'</span><span class="tm-rprev" dir="'+(c.rtl?'rtl':'ltr')+'">'+c.recv+'</span></span>'+
        '<span class="tm-rlang">'+c.code+'</span>';
      b.addEventListener('click',function(){ userPick=true; setChat(app,ci,b); });
      tmList.appendChild(b);
    });
    setChat(app,0,tmList.children[0]);
  }
  function setChat(app,ci,el){
    var c=app.chats[ci];
    Array.prototype.forEach.call(tmList.children,function(x,j){ x.setAttribute('aria-current', j===ci?'true':'false'); });
    if(tmHead) tmHead.innerHTML='<span class="tm-av" style="background:'+c.av+'">'+c.who.charAt(0)+'</span>'+c.who;
    if(tmRecv){ tmRecv.textContent=c.recv; tmRecv.dir=c.rtl?'rtl':'ltr'; }
    if(tmSent){ tmSent.textContent=c.sent; tmSent.dir=c.rtl?'rtl':'ltr'; }
    if(tmLang) tmLang.textContent=c.code;
    if(!reduce){ skTeams.classList.remove('flashing'); void skTeams.offsetWidth; skTeams.classList.add('flashing'); }
    setPill(c.code);
  }

  function selectApp(i){
    if(i===curApp && APPS[i].kind!=='browser') return;
    curApp=i; var app=APPS[i];
    dockBtns.forEach(function(b,j){ b.setAttribute('aria-current', j===i?'true':'false'); });
    mbApp.textContent=app.name; winTitle.textContent=app.name;
    setIcon(ICONS[app.icon], app.icon==='terminal'?'#26262b':'transparent');
    fkActive = (app.kind==='flickey');
    hideAllSkins();

    if(app.kind==='terminal'){ skTerm.classList.add('on'); setPill(app.code); }
    else if(app.kind==='chat'){
      skChat.classList.add('on');
      skChat.classList.toggle('wa', !!app.wa);
      chAv.style.background=app.av; chAv.textContent=app.who.charAt(0);
      chName.textContent=app.who; if(chSub) chSub.textContent='online';
      chRecv.textContent=app.recv; chRecv.dir=app.rtl?'rtl':'ltr';
      chSent.textContent=app.sent; chSent.dir=app.rtl?'rtl':'ltr';
      if(chPh){ chPh.textContent='Message'; }
      if(chLang) chLang.textContent=app.code;
      setPill(app.code);
    }
    else if(app.kind==='browser'){ skWeb.classList.add('on'); showBrowser(app); }
    else if(app.kind==='teams'){ skTeams.classList.add('on'); showTeams(app); }
    else if(app.kind==='flickey'){ skFk.classList.add('on'); setPair('he'); }
    applyPop();
  }

  var dockBtns=[];
  if(dock){
    APPS.forEach(function(app,i){
      var b=document.createElement('button'); b.className='dockapp app-icon'; b.setAttribute('aria-label',app.name);
      b.innerHTML=ICONS[app.icon];
      b.addEventListener('click',function(){ userPick=true; selectApp(i); });
      dock.appendChild(b); dockBtns.push(b);
    });
    selectApp(0);
    if(!reduce){
      var ai=0; var timer=setInterval(function(){ if(userPick){ clearInterval(timer); return; } ai=(ai+1)%APPS.length; selectApp(ai); },3000);
    }
  }

  /* ---------- generic site bits ---------- */
  if(reduce){ document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');}); }
  else{ var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }}); },{threshold:.12}); document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);}); }

  document.querySelectorAll('.perm').forEach(function(p){ p.addEventListener('click', function(){ var open=p.classList.toggle('open'); p.setAttribute('aria-expanded', open?'true':'false'); }); });

  (function(){ var el=document.getElementById('appVersion'); if(!el||!window.fetch) return;
    fetch('https://api.github.com/repos/alfital2/flickey-app/releases/latest',{headers:{'Accept':'application/vnd.github+json'}})
      .then(function(r){ return r.ok?r.json():null; }).then(function(d){ if(d&&d.tag_name){ el.textContent=d.tag_name[0]==='v'?d.tag_name:'v'+d.tag_name; } }).catch(function(){});
  })();

  /* Background keycaps show CONSTANT script letters (He / Ru / Ar / En) - no
     swapping; the press animation + soft blur floor live in CSS. They only
     animate when there's room: if the viewport gets narrow enough that a cap
     would overlap the main text column (width-wise), we freeze + fully blur every
     cap (class on <html>) - cheaper, and keeps the text readable. Runs on
     load/resize only, never on scroll. */
  (function(){
    var caps=Array.prototype.slice.call(document.querySelectorAll('.cap'));
    var wrap=document.querySelector('header .wrap')||document.querySelector('.wrap');
    if(!caps.length||!wrap) return;
    var root=document.documentElement, raf=0;
    function measure(){
      raf=0;
      var w=wrap.getBoundingClientRect(), cs=getComputedStyle(wrap);
      var cl=w.left+parseFloat(cs.paddingLeft), cr=w.right-parseFloat(cs.paddingRight);
      var cramped=caps.some(function(c){
        if(c.classList.contains('k4')) return false;   // k4 is a central accent, allowed over text on wide screens
        var r=c.getBoundingClientRect();
        return r.width>0 && r.right>cl && r.left<cr;   // a gutter cap (k1/k2/k3) meets the text column
      });
      root.classList.toggle('caps-cramped', cramped);
    }
    function req(){ if(!raf) raf=requestAnimationFrame(measure); }
    measure();
    window.addEventListener('resize', req);
  })();
})();

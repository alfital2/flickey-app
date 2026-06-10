/* FlicKey shared site engine — identical interactive logic for every skin.
   Each skin provides the DOM hooks (ids/classes) below; this file is verbatim
   the logic shipped on the live site, with two defensive null-guards (glyph, nav)
   so a skin may omit those without crashing. */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // inject glyph into brand squircles (if the skin uses them)
  var glyphTpl = document.getElementById('glyph');
  if(glyphTpl){
    var glyph = glyphTpl.content;
    ['navico','footico','heroico'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.appendChild(glyph.cloneNode(true));
    });
  }

  // nav scrolled state
  var nav=document.getElementById('nav');
  if(nav){
    var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>10); };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }

  /* ---------- hero: the self-fixing line (optional per skin) ---------- */
  var flText=document.getElementById('flText'), flA=document.getElementById('flA'), flB=document.getElementById('flB');
  var hk1=document.getElementById('hk1'), hk2=document.getElementById('hk2');
  var PHRASES=[
    {g:'akuo',    f:'שלום',   a:'EN', b:'HE', rtl:true},
    {g:'ghbdtn',  f:'привет', a:'EN', b:'RU', rtl:false},
    {g:'sghl',    f:'سلام',   a:'EN', b:'AR', rtl:true},
    {g:'geia',    f:'γεια',   a:'EN', b:'GR', rtl:false},
    {g:'ghbdsn',  f:'привіт', a:'EN', b:'UA', rtl:false}
  ];
  if(reduce || !flText){
    if(flText){ flText.textContent='akuo → שלום'; }
  } else {
    var pi=0;
    function showPhrase(){
      var p=PHRASES[pi];
      flA.textContent=p.a; flB.textContent=p.b;
      flText.classList.remove('fixed'); flText.style.direction='ltr';
      var i=0;
      (function typeChar(){
        if(i<=p.g.length){ flText.textContent=p.g.slice(0,i); i++; setTimeout(typeChar,95); return; }
        setTimeout(pressKeys,620);
      })();
      function pressKeys(){
        if(hk1) hk1.classList.add('press');
        setTimeout(function(){ if(hk2) hk2.classList.add('press'); },110);
        setTimeout(function(){ if(hk1) hk1.classList.remove('press'); if(hk2) hk2.classList.remove('press'); fix(); },360);
      }
      function fix(){
        flText.style.transition='opacity .15s, filter .15s';
        flText.style.opacity='0'; flText.style.filter='blur(6px)';
        setTimeout(function(){
          flText.classList.add('fixed');
          flText.style.direction=p.rtl?'rtl':'ltr';
          flText.textContent=p.f;
          flText.style.opacity='1'; flText.style.filter='none';
          setTimeout(erase,1700);
        },170);
      }
      function erase(){
        var s=p.f;
        (function del(){
          if(s.length){ s=s.slice(0,-1); flText.textContent=s; setTimeout(del,42); return; }
          pi=(pi+1)%PHRASES.length;
          setTimeout(showPhrase,420);
        })();
      }
    }
    showPhrase();
  }

  /* ---------- real keyboard-layout maps (US-QWERTY key positions -> native script) ---------- */
  var MAPS={
    he:{q:'/',w:"'",e:'ק',r:'ר',t:'א',y:'ט',u:'ו',i:'ן',o:'ם',p:'פ',
        a:'ש',s:'ד',d:'ג',f:'כ',g:'ע',h:'י',j:'ח',k:'ל',l:'ך',';':'ף',
        z:'ז',x:'ס',c:'ב',v:'ה',b:'נ',n:'מ',m:'צ',',':'ת','.':'ץ','/':'.'},
    ru:{q:'й',w:'ц',e:'у',r:'к',t:'е',y:'н',u:'г',i:'ш',o:'щ',p:'з','[':'х',']':'ъ',
        a:'ф',s:'ы',d:'в',f:'а',g:'п',h:'р',j:'о',k:'л',l:'д',';':'ж',"'":'э',
        z:'я',x:'ч',c:'с',v:'м',b:'и',n:'т',m:'ь',',':'б','.':'ю'},
    ar:{q:'ض',w:'ص',e:'ث',r:'ق',t:'ف',y:'غ',u:'ع',i:'ه',o:'خ',p:'ح',
        a:'ش',s:'س',d:'ي',f:'ب',g:'ل',h:'ا',j:'ت',k:'ن',l:'م',';':'ك',
        z:'ئ',x:'ء',c:'ؤ',v:'ر',b:'لا',n:'ى',m:'ة',',':'و','.':'ز'}
  };
  var REV={};
  Object.keys(MAPS).forEach(function(id){
    REV[id]={}; Object.keys(MAPS[id]).forEach(function(k){ REV[id][MAPS[id][k]]=k; });
  });
  var rtlRe=/[֐-׿؀-ۿ]/;
  var nativeRe={he:/[֐-׿]/,ru:/[Ѐ-ӿ]/,ar:/[؀-ۿ]/};
  var PAIRS={
    he:{a:'EN',b:'HE',title:'Messages · David',seed:'akuo'},
    ru:{a:'DE',b:'RU',title:'Telegram · Dmitri',seed:'ghbdtn'},
    ar:{a:'FR',b:'AR',title:'WhatsApp · Yasmin',seed:'lvpfh'}
  };
  var curPair='he';

  function convert(text,id){
    if(nativeRe[id].test(text)){
      var r=REV[id];
      return {out:text.split('').map(function(c){return r[c]!==undefined?r[c]:c;}).join(''),side:'a'};
    }
    var m=MAPS[id];
    return {out:text.split('').map(function(c){var l=c.toLowerCase();return m[l]!==undefined?m[l]:c;}).join(''),side:'b'};
  }

  var input=document.getElementById('demoInput');
  var field=document.getElementById('field');
  var flash=document.getElementById('flash');
  var flipBtn=document.getElementById('flipBtn');
  var langpill=document.getElementById('langpill');
  var key1=document.getElementById('key1'), key2=document.getElementById('key2');
  var cardBadge=document.getElementById('cardBadge');
  var demoTitle=document.getElementById('demoTitle');
  var pairTabs=document.querySelectorAll('.pairtab');
  var spanA=langpill.querySelector('.a'), spanB=langpill.querySelector('.b');

  function applySide(){
    field.classList.toggle('he', rtlRe.test(input.value));
    langpill.setAttribute('data-side', nativeRe[curPair].test(input.value)?'b':'a');
  }
  function setPair(id){
    curPair=id;
    var p=PAIRS[id];
    spanA.textContent=p.a; spanB.textContent=p.b;
    if(demoTitle) demoTitle.textContent=p.title;
    input.value=p.seed; input.style.opacity='1'; input.style.filter='none';
    applySide();
    pairTabs.forEach(function(t){ t.setAttribute('aria-selected', t.dataset.pair===id?'true':'false'); });
  }
  pairTabs.forEach(function(t){ t.addEventListener('click',function(){ setPair(t.dataset.pair); }); });
  input.addEventListener('input',applySide);

  var busy=false;
  function doFlip(){
    if(busy || !input.value.trim()) return;
    busy=true;
    var res=convert(input.value,curPair);
    if(key1) key1.classList.add('press'); if(key2) key2.classList.add('press');
    flipBtn.classList.add('flip-spin');
    if(flash){ flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
    setTimeout(function(){ if(key1) key1.classList.remove('press'); if(key2) key2.classList.remove('press'); },180);
    setTimeout(function(){ flipBtn.classList.remove('flip-spin'); },520);
    var commit=function(){
      input.value=res.out;
      langpill.setAttribute('data-side',res.side);
      field.classList.toggle('he', rtlRe.test(res.out));
      busy=false;
    };
    if(reduce){ commit(); return; }
    input.style.transition='opacity .16s, filter .16s';
    input.style.opacity='0'; input.style.filter='blur(6px)';
    setTimeout(function(){ commit(); input.style.opacity='1'; input.style.filter='none'; },170);
  }
  flipBtn.addEventListener('click',doFlip);
  langpill.addEventListener('click',doFlip);
  window.addEventListener('keydown',function(e){ if(e.altKey && e.key==='2'){ e.preventDefault(); doFlip(); } });
  input.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); doFlip(); } });

  setPair('he');

  // features: the menu-bar badge cycles through languages
  if(!reduce && cardBadge){
    var codes=['HE','RU','AR','EN'], ci=0;
    setInterval(function(){ ci=(ci+1)%codes.length; cardBadge.textContent=codes[ci]; },2400);
  }

  // ---------- macOS auto-switch scene ----------
  var BROWSER={name:'Safari',browser:true,color:'#1f8cf0',mono:'@',tabs:[
    {site:'google.com',code:'EN',lang:'English',rtl:false,fav:'#4285F4',wm:'Google',wmColor:'#edecf4',q:'flights to tel aviv'},
    {site:'ynet.co.il',code:'HE',lang:'Hebrew',rtl:true,fav:'#d6442f',wm:'ynet',wmColor:'#e23b2e',q:'מזג האוויר מחר'},
    {site:'vk.com',code:'RU',lang:'Russian',rtl:false,fav:'#4a76a8',wm:'VK',wmColor:'#6f9bd8',q:'Привет, как дела?'},
    {site:'youm7.com',code:'AR',lang:'Arabic',rtl:true,fav:'#c0392b',wm:'youm7',wmColor:'#e0604c',q:'أخبار اليوم'}
  ]};
  var APPS=[
    {name:'Terminal',code:'EN',lang:'English',rtl:false,term:true,color:'#3a3a42',mono:'>_',bubble:'',text:'git commit -m "ship it"'},
    {name:'Messages',code:'HE',lang:'Hebrew',rtl:true,color:'#34c759',mono:'M',bubble:'מתי אתה מגיע?',text:'אני בא בעוד עשר דקות'},
    {name:'Telegram',code:'RU',lang:'Russian',rtl:false,color:'#2aabee',mono:'T',bubble:'Ты где?',text:'Привет! Уже еду'},
    {name:'WhatsApp',code:'AR',lang:'Arabic',rtl:true,color:'#25d366',mono:'W',bubble:'أين أنت؟',text:'مرحبا، أنا في الطريق'},
    BROWSER
  ];

  var STOPS=[];
  APPS.forEach(function(app,ai){
    if(app.browser){ app.tabs.forEach(function(tab,ti){ STOPS.push({ai:ai,app:app,tab:tab,ti:ti}); }); }
    else { STOPS.push({ai:ai,app:app}); }
  });

  var dock=document.getElementById('dock');
  var mbApp=document.getElementById('mbApp'), winTitle=document.getElementById('winTitle'),
      winIcon=document.getElementById('winIcon'), winBubble=document.getElementById('winBubble'),
      composer=document.getElementById('composer'), composeText=document.getElementById('composeText'),
      langName=document.getElementById('langName'), inputPill=document.getElementById('inputPill'),
      appWin=document.getElementById('appWin');
  var winBody=winBubble.parentNode, typingNote=document.querySelector('.typing-note');

  function mk(tag,cls){ var e=document.createElement(tag); if(cls) e.className=cls; return e; }
  var bview=mk('div','bview');
  var bstrip=mk('div','btabstrip'); bview.appendChild(bstrip);
  var baddr=mk('div','baddr');
  baddr.innerHTML='<span class="navarr">'
    +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>'
    +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>'
    +'<span class="lock">🔒</span><span class="bfav" id="baddrFav"></span><span class="burl" id="burl"></span>';
  bview.appendChild(baddr);
  var bpage=mk('div','bpage');
  var bwm=mk('div','bwordmark'); bpage.appendChild(bwm);
  var bsearch=mk('div','bsearch');
  bsearch.innerHTML='<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><span class="bquery"></span>';
  bpage.appendChild(bsearch);
  var bflash=mk('div','bflash'); bpage.appendChild(bflash);
  bview.appendChild(bpage);
  winBody.appendChild(bview);
  var bAddrFav=baddr.querySelector('#baddrFav'), bUrl=baddr.querySelector('#burl'), bQuery=bsearch.querySelector('.bquery');

  var btabEls=BROWSER.tabs.map(function(tab,ti){
    var b=mk('button','btab');
    var fav=mk('span','bfav'); fav.style.background=tab.fav;
    var lab=mk('span','blabel'); lab.textContent=tab.site;
    var cl=mk('span','bclose'); cl.textContent='×';
    b.appendChild(fav); b.appendChild(lab); b.appendChild(cl);
    b.addEventListener('click',function(){
      userPick=true;
      for(var s=0;s<STOPS.length;s++){ if(STOPS[s].app===BROWSER && STOPS[s].ti===ti){ selectStop(s); break; } }
    });
    bstrip.appendChild(b); return b;
  });

  var dockBtns=[];
  if(dock){
    APPS.forEach(function(app,i){
      var b=document.createElement('button');
      b.className='dockapp'; b.style.background='linear-gradient(160deg,'+app.color+',rgba(0,0,0,.25))';
      b.style.fontFamily=app.term?"'JetBrains Mono',monospace":"'Inter',sans-serif";
      b.style.fontSize=app.term?'14px':'16px';
      b.textContent=app.mono; b.setAttribute('aria-label',app.name);
      b.addEventListener('click',function(){
        userPick=true;
        for(var s=0;s<STOPS.length;s++){ if(STOPS[s].ai===i){ selectStop(s); break; } }
      });
      dock.appendChild(b); dockBtns.push(b);
    });
  }

  var curStop=-1, userPick=false;
  function applyPulse(){
    if(reduce) return;
    inputPill.classList.remove('pulse'); void inputPill.offsetWidth; inputPill.classList.add('pulse');
    appWin.classList.remove('pop'); void appWin.offsetWidth; appWin.classList.add('pop');
  }
  function selectStop(si){
    if(si===curStop) return;
    curStop=si; var stop=STOPS[si]; var app=stop.app;
    dockBtns.forEach(function(b,j){ b.setAttribute('aria-current', j===stop.ai?'true':'false'); });

    if(app.browser){
      var tab=stop.tab;
      winBubble.style.display='none'; composer.style.display='none';
      if(typingNote) typingNote.style.display='none';
      bview.style.display='block';
      mbApp.textContent=app.name; winTitle.textContent=app.name;
      winIcon.textContent=app.mono;
      winIcon.style.background='linear-gradient(160deg,'+app.color+',rgba(0,0,0,.25))';
      winIcon.style.fontFamily="'Inter',sans-serif";
      btabEls.forEach(function(b,ti){ b.setAttribute('aria-current', ti===stop.ti?'true':'false'); });
      bAddrFav.style.background=tab.fav; bUrl.textContent=tab.site;
      bwm.textContent=tab.wm; bwm.style.color=tab.wmColor;
      bQuery.textContent=tab.q; bsearch.classList.toggle('rtl',tab.rtl);
      if(!reduce){ bflash.classList.remove('go'); void bflash.offsetWidth; bflash.classList.add('go'); }
      langName.textContent=tab.lang; inputPill.textContent=tab.code;
    } else {
      bview.style.display='none';
      composer.style.display=''; if(typingNote) typingNote.style.display='';
      mbApp.textContent=app.name; winTitle.textContent=app.name;
      winIcon.textContent=app.mono;
      winIcon.style.background='linear-gradient(160deg,'+app.color+',rgba(0,0,0,.25))';
      winIcon.style.fontFamily=app.term?"'JetBrains Mono',monospace":"'Inter',sans-serif";
      if(app.bubble){ winBubble.textContent=app.bubble; winBubble.style.display='inline-block'; winBubble.dir=app.rtl?'rtl':'ltr'; }
      else { winBubble.style.display='none'; }
      composeText.textContent=app.text;
      composer.classList.toggle('rtl',app.rtl);
      composer.classList.toggle('term',!!app.term);
      langName.textContent=app.lang; inputPill.textContent=app.code;
    }
    applyPulse();
  }
  if(dock){
    selectStop(0);
    if(!reduce){
      var si=0;
      var macTimer=setInterval(function(){
        if(userPick){ clearInterval(macTimer); return; }
        si=(si+1)%STOPS.length; selectStop(si);
      },2400);
    }
  }

  // scroll reveal
  if(reduce){
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }});
    },{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }

  // Permission accordions
  document.querySelectorAll('.perm').forEach(function(p){
    p.addEventListener('click', function(){
      var open = p.classList.toggle('open');
      p.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Footer version label from latest GitHub release (fallback kept on error)
  (function(){
    var el = document.getElementById('appVersion');
    if (!el || !window.fetch) return;
    fetch('https://api.github.com/repos/alfital2/flickey-app/releases/latest',
          { headers: { 'Accept': 'application/vnd.github+json' } })
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){ if (d && d.tag_name) { el.textContent = d.tag_name[0]==='v'?d.tag_name:'v'+d.tag_name; } })
      .catch(function(){});
  })();
})();

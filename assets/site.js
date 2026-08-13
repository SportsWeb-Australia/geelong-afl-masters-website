(function(){
 var vids=document.querySelectorAll('.vid[data-vid]');
 function mount(v){if(v.dataset.on)return;v.dataset.on='1';var id=v.dataset.vid;var f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&mute=1&loop=1&playlist='+id+'&controls=1&modestbranding=1&rel=0&playsinline=1';
  f.allow='autoplay; encrypted-media; picture-in-picture';f.setAttribute('frameborder','0');f.allowFullscreen=true;
  f.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:0';v.appendChild(f);}
 function unmount(v){if(!v.dataset.on)return;var f=v.querySelector('iframe');if(f)f.remove();v.dataset.on='';}
 if(vids.length){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>=.45)mount(e.target);else unmount(e.target);});},{threshold:[0,.45,1]});
  vids.forEach(function(v){io.observe(v);var p=v.querySelector('.poster');if(p)p.addEventListener('click',function(){mount(v);});});}
 var rev=document.querySelectorAll('.reveal');
 if(rev.length){var r=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');r.unobserve(e.target);}});},{threshold:.12});rev.forEach(function(e){r.observe(e);});}
 var b=document.getElementById('burger'),m=document.getElementById('mnav');if(b&&m)b.addEventListener('click',function(){m.classList.toggle('open');});
 var t=document.querySelectorAll('.mc-tab');t.forEach(function(x){x.addEventListener('click',function(){t.forEach(function(y){y.classList.remove('on')});x.classList.add('on');var id=x.dataset.t;document.querySelectorAll('.mc-pane').forEach(function(p){p.style.display=p.id===id?'block':'none';});});});
})();/* site search — client-side, no backend */
(function(){
 var btn=document.getElementById('searchBtn'); if(!btn) return;
 var SI=[
  {t:'Home',u:'index.html',d:'Get back in the game — Geelong AFL Masters Football Club.',k:'home get back in the game president welcome swampy'},
  {t:'Play Masters',u:'play-masters.html',d:'New player enquiry, fees and how AFL Masters works.',k:'play masters join new player enquiry fees 350 300 faq what is afl masters age requirements'},
  {t:'Teams',u:'teams.html',d:'Over 35s, 45s and 55s — coaches, trophy cabinet and awards.',k:'teams over 35 45 55 seniors reserves coaches trophy cabinet best and fairest'},
  {t:'Summer 9\'s',u:'summer-9s.html',d:'No-tackling 9-a-side social competition, Tuesdays over summer.',k:'summer 9s nine a side no tackling eastern gardens social'},
  {t:'Merchandise',u:'merchandise.html',d:'Official club merchandise via S-Trend.',k:'merchandise merch shop buy jumper gear s-trend store'},
  {t:'Match Centre',u:'match-centre.html',d:'Fixtures, team line-ups, live scores, results, ladders and stats.',k:'match centre fixtures team line ups live scores results ladders player statistics'},
  {t:'News',u:'news.html',d:'Club news, socials and match-day updates.',k:'news past players day trivia night mental health'},
  {t:'Photo Gallery',u:'gallery.html',d:'Match day and social photos.',k:'photo gallery photos pictures summer training grand final'},
  {t:'Events',u:'events.html',d:'Summer 9\'s, Past Players Day, trivia nights and Day on the Green.',k:'events calendar day on the green mount duneed roundhouse entertainment'},
  {t:'National Carnival',u:'national-carnival.html',d:'Represent your state at the AFL Masters National Carnival.',k:'national carnival aflmasters aflvm represent state'},
  {t:'Sponsors',u:'sponsors.html',d:'Elephant & Castle Hotel and our team sponsors & partners.',k:'sponsors elephant castle hotel kieser workplace alliance visy jimmyz sponsor us'},
  {t:'Contact',u:'contact.html',d:'Get in touch — email, home ground, and social media.',k:'contact email president grinter reserve newcomb map'}
 ];
 var ov=document.createElement('div'); ov.className='search-ov';
 ov.innerHTML='<div class="search-box" role="search"><input id="searchInput" type="search" placeholder="Search — fees, juniors, teams, history…" autocomplete="off" aria-label="Search the site"><div class="search-res" id="searchRes"></div><div class="search-hint">Press Esc to close</div></div>';
 document.body.appendChild(ov);
 var input=ov.querySelector('#searchInput'), res=ov.querySelector('#searchRes');
 function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function render(q){
  q=(q||'').trim().toLowerCase();
  var list;
  if(!q){list=SI;}
  else{var terms=q.split(/\s+/);
   list=SI.filter(function(p){var hay=(p.t+' '+p.d+' '+p.k).toLowerCase();return terms.every(function(t){return hay.indexOf(t)>-1;});})
   .sort(function(a,b){return (b.t.toLowerCase().indexOf(q)>-1?1:0)-(a.t.toLowerCase().indexOf(q)>-1?1:0);});}
  if(!list.length){res.innerHTML='<div class="none">No results for “'+esc(q)+'”. Try “fees”, “juniors” or “teams”.</div>';return;}
  res.innerHTML=list.map(function(p,i){return '<a href="'+p.u+'"'+(i===0?' class="sel"':'')+'><div class="st">'+esc(p.t)+'</div><div class="sd">'+esc(p.d)+'</div></a>';}).join('');
 }
 function open(){ov.classList.add('open');input.value='';render('');setTimeout(function(){input.focus();},40);}
 function close(){ov.classList.remove('open');}
 btn.addEventListener('click',open);
 ov.addEventListener('click',function(e){if(e.target===ov)close();});
 input.addEventListener('input',function(){render(input.value);});
 document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){close();return;}
  var open_=ov.classList.contains('open');
  if(!open_ && (e.key==='/' || ((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)))){var tag=(document.activeElement||{}).tagName;if(tag!=='INPUT'&&tag!=='TEXTAREA'){e.preventDefault();open();}}
  if(open_ && e.key==='Enter'){var f=res.querySelector('a');if(f)window.location.href=f.getAttribute('href');}
 });
})();
/* mobile drawer close (X), close-on-tap, and back-to-top */
(function(){
 var nav=document.getElementById('mnav');
 if(nav){
   var x=document.createElement('button');
   x.type='button'; x.className='nav-close'; x.setAttribute('aria-label','Close menu');
   x.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
   nav.insertBefore(x, nav.firstChild);
   x.addEventListener('click',function(){nav.classList.remove('open');});
   nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');});});
 }
 var b=document.createElement('button');
 b.id='b2t'; b.type='button'; b.setAttribute('aria-label','Back to top'); b.title='Back to top';
 b.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
 document.body.appendChild(b);
 function t(){b.classList.toggle('on',(window.pageYOffset||document.documentElement.scrollTop)>420);}
 window.addEventListener('scroll',t,{passive:true}); t();
 b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
})();

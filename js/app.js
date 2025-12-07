(function(){
  const player=document.getElementById('player');
  const status=document.getElementById('status');
  const list=document.getElementById('tracklist');
  const canvas=document.getElementById('canvas');
  const stage=document.getElementById('stage');
  const closeZ=document.getElementById('closeZoom');
  let muted=false;
  function play(src,label){player.src=src;player.muted=muted;player.play().then(()=>{status.textContent='Lecture : '+(label||src);}).catch(e=>{console.error(e);status.textContent='Impossible de lire (autorisation du navigateur ?)';});}
  function zoomToHotspot(h){const left=parseFloat(h.style.left)||50;const top=parseFloat(h.style.top)||50;const z=parseFloat(h.dataset.zoom)||parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zoom'))||1.8;canvas.style.setProperty('--origin-x',left+'%');canvas.style.setProperty('--origin-y',top+'%');canvas.style.setProperty('--zoom',z);canvas.classList.add('zoomed');stage.classList.add('zoomActive');closeZ.focus({preventScroll:true});}
  function unzoom(){canvas.classList.remove('zoomed');stage.classList.remove('zoomActive');}
  document.querySelectorAll('.hotspot').forEach(h=>{h.addEventListener('click',()=>{const src=h.dataset.audio;const label=h.getAttribute('aria-label')||src;zoomToHotspot(h);play(src,label);});});
  document.getElementById('pauseAll').addEventListener('click',()=>{player.pause();status.textContent='Lecture en pause';});
  document.getElementById('muteToggle').addEventListener('click',e=>{muted=!muted;player.muted=muted;e.target.textContent=muted?'🔇 Muet (activé)':'🔈 Muet';});
  closeZ.addEventListener('click',unzoom);
  window.addEventListener('keydown',e=>{if(e.key==='Escape')unzoom();});
  const spots=Array.from(document.querySelectorAll('.hotspot'));if(list){spots.forEach((h,i)=>{const li=document.createElement('li');li.textContent=h.getAttribute('aria-label')||('Piste '+(i+1));li.className='btn';li.style.listStyle='none';li.style.display='inline-block';li.style.marginRight='6px';li.addEventListener('click',()=>h.click());list.appendChild(li);});}
  stage.addEventListener('click',e=>{const isHotspot=e.target.classList.contains('hotspot')||e.target.closest('.hotspot');const isClose=e.target.id==='closeZoom';if(!isHotspot&&!isClose&&stage.classList.contains('zoomActive'))unzoom();});
})();

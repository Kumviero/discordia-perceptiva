'use strict';
const $ = (id) => document.getElementById(id);
let obras = [], currentIndex = 0, previousFocus = null;
const overlay = $('work-overlay'), panel = document.querySelector('.work-panel'), lightbox = $('lightbox');
function make(tag, cls, text) { const el = document.createElement(tag); if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el; }
function renderGallery(){
 const grid=$('gallery-grid');grid.replaceChildren();
 obras.forEach((obra,i)=>{
  const card=make('button','work-card');card.type='button';card.setAttribute('aria-label',`Explorar ${obra.titulo}`);
  const figure=make('figure');const img=make('img');img.src=obra.imagen;img.alt=`Ilustración original de ${obra.titulo}`;img.loading='lazy';figure.append(img);
  const info=make('div','card-info');info.append(make('h3','',obra.titulo),make('span','',String(i+1).padStart(2,'0')+' / '+String(obras.length).padStart(2,'0')));
  card.append(figure,info,make('p','',obra.tema));card.addEventListener('click',()=>openWork(i));grid.append(card);
 });
}
function openWork(i){
 if(!obras.length)return;currentIndex=(i+obras.length)%obras.length;const o=obras[currentIndex];
 if(overlay.hidden)previousFocus=document.activeElement;
 $('work-counter').textContent=`OBRA ${String(currentIndex+1).padStart(2,'0')} / ${String(obras.length).padStart(2,'0')}`;
 $('work-theme').textContent=o.tema;$('work-title').textContent=o.titulo;$('work-poem').textContent='«'+o.poema+'»';$('work-intro').textContent='«'+o.introduccion+'»';
 $('work-image').src=o.imagen;$('work-image').alt=`Ilustración original de ${o.titulo}`;
 $('work-meta').textContent=[o.autor,o.dimensiones,o.materiales].filter(Boolean).join(' · ');
 $('work-story').textContent=o.relato;
 overlay.hidden=false;document.body.classList.add('no-scroll');panel.scrollTop=0;panel.focus();
 if(location.hash!==`#obra/${o.id}`)history.replaceState(null,'',`#obra/${o.id}`);
}
function closeWork(){overlay.hidden=true;lightbox.hidden=true;document.body.classList.remove('no-scroll');history.replaceState(null,'','#galeria');previousFocus?.focus();}
$('close-work').addEventListener('click',closeWork);document.querySelector('[data-close]').addEventListener('click',closeWork);
$('prev-work').addEventListener('click',()=>openWork(currentIndex-1));$('next-work').addEventListener('click',()=>openWork(currentIndex+1));
$('zoom-art').addEventListener('click',()=>{const o=obras[currentIndex];$('lightbox-image').src=o.imagen;$('lightbox-image').alt=`Ilustración ampliada de ${o.titulo}`;lightbox.hidden=false;$('close-lightbox').focus();});
function closeZoom(){lightbox.hidden=true;$('zoom-art').focus();}
$('close-lightbox').addEventListener('click',closeZoom);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeZoom();});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){if(!lightbox.hidden)closeZoom();else if(!overlay.hidden)closeWork();}
 if(!overlay.hidden&&lightbox.hidden&&e.key==='ArrowRight')openWork(currentIndex+1);
 if(!overlay.hidden&&lightbox.hidden&&e.key==='ArrowLeft')openWork(currentIndex-1);
 if(!overlay.hidden&&e.key==='Tab'){
  const scope=lightbox.hidden?panel:lightbox;const nodes=[...scope.querySelectorAll('button:not([disabled]),a[href]')];if(!nodes.length)return;
  const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
window.addEventListener('hashchange',()=>{const slug=decodeURIComponent(location.hash.slice(6));if(location.hash.startsWith('#obra/')){const i=obras.findIndex(o=>o.id===slug);if(i>=0)openWork(i);}else if(!overlay.hidden){overlay.hidden=true;lightbox.hidden=true;document.body.classList.remove('no-scroll');}});
async function init(){try{const response=await fetch('data/obras.json');if(!response.ok)throw new Error(`HTTP ${response.status}`);obras=await response.json();renderGallery();if(location.hash.startsWith('#obra/')){const i=obras.findIndex(o=>o.id===decodeURIComponent(location.hash.slice(6)));if(i>=0)openWork(i);}}catch(err){$('gallery-grid').append(make('p','error','No fue posible cargar las obras. Publica el proyecto en GitHub Pages o ejecútalo desde un servidor local (por ejemplo, python -m http.server 8000).'));console.error(err);}}
init();

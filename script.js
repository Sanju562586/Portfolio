const progress=document.querySelector('.progress');
const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%'};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -24px'});
document.querySelectorAll('.reveal').forEach((el,index)=>{el.style.transitionDelay=(Math.min(index%4,3)*75)+'ms';observer.observe(el)});
document.querySelectorAll('.hero-new .reveal,.page-hero .reveal,.contact-new>.reveal').forEach(el=>el.classList.add('show'));
const menu=document.querySelector('.menu'),header=document.querySelector('header');
menu?.addEventListener('click',()=>{const open=header.classList.toggle('open');menu.textContent=open?'CLOSE -':'MENU +';menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>header.classList.remove('open')));
if(matchMedia('(hover:hover) and (pointer:fine)').matches){const glow=document.querySelector('.cursor-glow');if(glow)addEventListener('pointermove',event=>{glow.style.transform='translate3d('+(event.clientX-160)+'px,'+(event.clientY-160)+'px,0)'},{passive:true});document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',event=>{const r=el.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;el.style.transform='translate('+(x*5)+'px,'+(y*5)+'px)'});el.addEventListener('pointerleave',()=>el.style.transform='')})}
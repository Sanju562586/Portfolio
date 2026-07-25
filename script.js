const progress=document.querySelector('.progress');
const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -24px'});
document.querySelectorAll('.reveal').forEach((el,index)=>{el.style.transitionDelay=`${Math.min(index%4,3)*75}ms`;observer.observe(el)});
const menu=document.querySelector('.menu'),header=document.querySelector('header');
menu?.addEventListener('click',()=>{header.classList.toggle('open');menu.textContent=header.classList.contains('open')?'CLOSE −':'MENU +'});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>header.classList.remove('open')));
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.tilt,.project').forEach(card=>{card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) translateY(-10px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
const orb=document.querySelector('.orb');if(orb)addEventListener('scroll',()=>orb.style.transform=`translate3d(0,${scrollY*.11}px,0) rotate(${scrollY*.025}deg)`,{passive:true});

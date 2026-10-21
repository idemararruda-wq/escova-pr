const galleryImages=window.pageData.gallery;
const mainImage=document.getElementById('main-image');
document.querySelectorAll('.thumb').forEach((button,index)=>button.addEventListener('click',()=>{mainImage.src=galleryImages[index].file;mainImage.width=galleryImages[index].width;mainImage.height=galleryImages[index].height;mainImage.alt='Escova Alisadora 5 em 1 — imagem '+(index+1);document.querySelectorAll('.thumb').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('.gallery-main').classList.toggle('is-cover',index===0);}));
const reviews=window.pageData.reviews;
const reviewsSection=document.getElementById('reviews');
if(reviews&&reviews.length){reviewsSection.hidden=false;
const grid=document.getElementById('review-grid');
const status=document.getElementById('review-status');
let reviewIndex=0;
const mobile=window.matchMedia('(max-width:540px)');
function renderReviews(){const count=mobile.matches?1:2;grid.replaceChildren();for(let n=0;n<count;n++){const review=reviews[(reviewIndex+n)%reviews.length];const card=document.createElement('article');card.className='review';const stars=document.createElement('div');stars.className='stars';const rt=review.rating||5;stars.setAttribute('aria-label',rt+' de 5 estrelas');stars.textContent='★'.repeat(rt)+'☆'.repeat(5-rt);const quote=document.createElement('blockquote');quote.textContent='“'+review.text+'”';const person=document.createElement('div');person.className='review-person';const avatar=document.createElement('span');avatar.className='avatar';avatar.setAttribute('aria-hidden','true');avatar.textContent=review.name[0];const details=document.createElement('div');const name=document.createElement('strong');name.textContent=review.name;const city=document.createElement('small');city.textContent='Avaliação: '+(review.rating||5)+'/5 · Cliente da loja';details.append(name,city);person.append(avatar,details);card.append(stars,quote,person);grid.append(card)}status.textContent=(reviewIndex+1)+' / '+reviews.length;}
function moveReviews(direction){reviewIndex=(reviewIndex+direction*(mobile.matches?1:2)+reviews.length)%reviews.length;renderReviews()}
document.getElementById('previous-review').addEventListener('click',()=>moveReviews(-1));document.getElementById('next-review').addEventListener('click',()=>moveReviews(1));grid.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();moveReviews(-1)}if(event.key==='ArrowRight'){event.preventDefault();moveReviews(1)}});let touchStart=null;grid.addEventListener('touchstart',event=>{touchStart={x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY}},{passive:true});grid.addEventListener('touchend',event=>{if(!touchStart)return;const x=event.changedTouches[0].clientX-touchStart.x,y=event.changedTouches[0].clientY-touchStart.y;if(Math.abs(x)>45&&Math.abs(x)>Math.abs(y))moveReviews(x<0?1:-1);touchStart=null},{passive:true});if(mobile.addEventListener)mobile.addEventListener('change',renderReviews);else mobile.addListener(renderReviews);renderReviews();}

/* Entrada suave dos banners ao rolar a página */
(function(){try{
if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
const items=document.querySelectorAll('.story figure,.mid-cta');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.04,rootMargin:'0px 0px -6% 0px'});
document.documentElement.classList.add('reveal-on');
items.forEach(el=>{el.classList.add('reveal');io.observe(el)});
setTimeout(()=>items.forEach(el=>el.classList.add('in')),6000);
}catch(e){}})();

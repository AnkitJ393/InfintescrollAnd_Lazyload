const imgElement=document.querySelectorAll("img[data-src]");


const callback=(entries,observer)=>{
   
    entries.forEach((entry)=>{
       if(!entry.isIntersecting)return;
        entry.target.src=entry.target.dataset.src
        entry.target.addEventListener('load',()=>{
            entry.target.classList.remove('lazy-img');
            observer.unobserve(entry.target);
        });
        console.log('called')
    })
}


let Intersection=new IntersectionObserver(callback,{
    threshold:1.0
})

imgElement.forEach((el)=>{
    Intersection.observe(el)
})


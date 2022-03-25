'use strict'

const container=document.querySelector('.container');
const loader=document.querySelector('.loading');

document.addEventListener('DOMContentLoaded',()=>{
    const getImage=async()=>{
        const response=await fetch('http://localhost:3002/image');
        let data=await response.json();
        data.map((value)=>{
            const htmldata=
            `<img src=${value.url} class='image' alt='image'>`
    
            container.insertAdjacentHTML('beforeend',htmldata);
        })
    }

    let options={
        root:null,
        rootMargins:"0px",
        threshold:0
    }

    let observer=new IntersectionObserver(handleIntersect,options);
    observer.observe(loader);
    getImage();

    
    function handleIntersect(entries,observer){
        entries.forEach((element)=>{
            if(element.isIntersecting ){
                console.log('')
                setTimeout(()=>{

                    getImage();
                },0)
            }
        });
    }
});




// window.addEventListener('scroll',()=>{
//     if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
//         getImage()
//     }
// })





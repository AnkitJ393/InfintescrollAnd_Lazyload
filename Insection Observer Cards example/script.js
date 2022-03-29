const container=document.querySelector('.container');
const cards=document.querySelectorAll('.card');
const getLastcard=()=>
{   console.log(typeof(getLastcard));
    return document.querySelector('.card:last-child');
}
let options={
    root:null,
    rootMargin:'200px',  // to lazy laod the cards before we reach at last , so before 200px new cards will be loaded in DOM
    threshold:1
}

let callback=(entries,observer)=>{
    entries.forEach(element => {
        element.target.classList.toggle('show-card',element.isIntersecting)
        if(element.isIntersecting){   // to unobserve or not applying animation once the element is intersected in the viewport
            observer.unobserve(element.target);
        }
    });
}

const intersection=new IntersectionObserver(callback,options)

cards.forEach((card)=>{
    intersection.observe(card);
})


function loadcards(){
    for(let i=0;i<5;i++){
    const newcard=document.createElement('div');
    newcard.classList.add('card');
    newcard.textContent="Newly added card";
    intersection.observe(newcard); // to observe by earlier observer to 
    container.insertAdjacentElement('beforeend',newcard)
}

}
// For Infinite Scrolling
const intersection_2= new IntersectionObserver((enteries,observe)=>{
    if(!enteries[0].isIntersecting)return
    loadcards();
    observe.unobserve(enteries[0].target);
    intersection_2.observe(getLastcard()); //  to again identify the last card after 6 new cards from for loop are being added 
},{});

intersection_2.observe(getLastcard());
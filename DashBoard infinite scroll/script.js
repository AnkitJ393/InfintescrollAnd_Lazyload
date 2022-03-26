'use strict'
const getLastUser=()=>document.querySelector(".users__container > .user:last-child");
const loader=document.querySelector(".loader")
let  pageNumber=1;
let  pageSize=10;

const toggleLoading=(isLoading)=>{
    console.log('run')
    loader.classList.toggle("show",isLoading)
    
}


function renderUser(user) {
    let {
        name:{first,last},
        location:{country},
        email,
        picture:{medium:userImage}
    }=user
    

    const htmldata=`
                <div class="user">
                    <div class="user-logo item"><img src="${userImage}" alt=""></div>
                    <div class="user-name item">${first} ${last}</div>
                    <div class="user-country item">${country}</div>
                    <div class="user-email item">${email}</div>
                </div>`

      document.querySelector('.users__container').insertAdjacentHTML('beforeend',htmldata);          
}

function Observed(){
    console.log(getLastUser())
    observer.observe(getLastUser());
}



 
async function getuser(pageNumber,pageSize){
    const URL=await fetch( `https://randomuser.me/api/?page=${pageNumber}&results=${pageSize}&seed=abc`);
    const data=await URL.json();
    
    data && data.results && data.results.map((user)=>{
        renderUser(user)
        
    })
    Observed();
    
}

let loadUsers=(pageNumber,pageSize,isLastuser=true)=>{
    
    if(isLastuser){
        toggleLoading(true)
        setTimeout(()=>{
            getuser(pageNumber,pageSize);
            isLastuser=false;

        },2000)
        toggleLoading(false)
    }

}

const callback=(entries,arg)=>{
    if(!entries[0].isIntersecting)return
    // toggleLoading(true)
    pageNumber++;
     loadUsers(pageNumber,pageSize)
    
    toggleLoading(false)
    arg.unobserve(entries[0].target)
}

const observer=new IntersectionObserver(callback,{});





loadUsers(pageNumber,pageSize);


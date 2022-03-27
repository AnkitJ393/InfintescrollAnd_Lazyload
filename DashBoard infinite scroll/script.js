'use strict'
const getLastUser=()=>document.querySelector(".users__container > .user:last-child");
const loader=document.querySelector(".loader")
let  pageNumber=1;
let  pageSize=10;



// Function To render User
function renderUser(user) {
    let {
        name:{first,last},
        location:{country},
        email,
        picture:{medium:userImage}
    }=user   // Desturcting a multi nested object 
    

    const htmldata=`
                <div class="user">
                    <div class="user-logo item"><img src="${userImage}" alt=""></div>
                    <div class="user-name item">${first} ${last}</div>
                    <div class="user-country item">${country}</div>
                    <div class="user-email item">${email}</div>
                </div>`

      document.querySelector('.users__container').insertAdjacentHTML("beforeend",htmldata);          
}
 // Function to observe last user and fetchign more records from the api by incrementing the pagenumber
function Observed(){
    console.log(getLastUser())
    observer.observe(getLastUser());
}



 
async function getuser(pageNumber,pageSize){
    const URL=await fetch( `https://randomuser.me/api/?page=${pageNumber}&results=${pageSize}&seed=abc`);
    const data=await URL.json();
    
    data && data.results && data.results.map((user)=>{ //fecthint all the users from teh api and calling here the renderUser fucntion 
        renderUser(user)
        
    })
    Observed(); //  calling thhe last user fucntion to know the last User Element 
    loader.style.display="none";
    
}

let loadUsers=(pageNumber,pageSize)=>{
   loader.style.display="block";
    setTimeout(()=>{

        getuser(pageNumber,pageSize);
    },10)

    

}

// interSection Observer callback to know if the viewpot is intersecting the last user 
const callback=(entries,arg)=>{
    if(!entries[0].isIntersecting)return
    pageNumber++;
     loadUsers(pageNumber,pageSize)
    arg.unobserve(entries[0].target)
}

// Instersection Observer contructor ( first parameter is callback to check the Intersection observer different entries
// I am using isIntersecting but there are many useful  ,  second parameter I have left empty but it is a options parameter can be defined as
// {
  //  root:null  =>  /this element that is used as the viewport for  checking the visisbility of the target.Must be the ancestor of the target Null means : Default to browser view port
  //  rootMargin:'0px' <- // Margin aroud the root element
  //threshold:1.0  <- // 1.0 means set the isIntersecting to true when element comes in 100% view.if it is 0.5 it means element comes 50% in the view then setintersecting will be set as true in callback.}
//})
const observer=new IntersectionObserver(callback,{});





loadUsers(pageNumber,pageSize);


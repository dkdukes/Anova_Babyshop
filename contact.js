const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");
const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const email=document.getElementById("email");
const message=document.getElementById("message");
const phone=document.getElementById("phone");
const btnSubmit=document.getElementById("btnSubmit");
const response=document.getElementById("response");

btnSubmit.addEventListener("click",function(){
    saveMessage();
    response.textContent="Thanks for your information! Our sales agent will get back to you in a few!"
})


//save the user request
async function saveMessage(){
    const data={
        firstName:fname.value,
        secondName:lname.value,
        phone:phone.value,
        email:email.value,
        message:message.value
    }
    try{
        const res=await fetch("http://localhost:3000/contact",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        });
        const dataRes=await res.json();
    }catch(error){
        console.log("Fetch data",error);
    }
}
 let localItems=Number(localStorage.length);
 counter.textContent=localItems;
 
const items=Number(counter.innerText);
 if(items>0){
    btnItems.addEventListener("click",function(){
        window.location.href="product.html";
    })
 }
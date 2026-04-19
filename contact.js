const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");

 let localItems=Number(localStorage.length);
 counter.textContent=localItems;
 
const items=Number(counter.innerText);
 if(items>0){
    btnItems.addEventListener("click",function(){
        window.location.href="product.html";
    })
 }
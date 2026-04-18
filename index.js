const category=document.querySelectorAll(".category");
const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");
category.forEach(x=>{
    let selectedId=x.id;
    x.addEventListener("click",function(){
        if(this.id === selectedId){
            window.location.href=`shop.html?id=${selectedId}`;
        }
    })
})

 let localItems=Number(localStorage.length);
 counter.textContent=localItems;

 const items=Number(counter.innerText);
 if(items>0){
    btnItems.addEventListener("click",function(){
        window.location.href="product.html";
    })
 }


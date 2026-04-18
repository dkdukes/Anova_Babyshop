const category=document.querySelectorAll(".category");
const feeding=document.querySelectorAll(".feeding");
const nursery=document.querySelectorAll(".nursery");
const gear=document.querySelectorAll(".gear");
const transport=document.querySelectorAll(".transport");
const toys=document.querySelectorAll(".toys");
const apparel=document.querySelectorAll(".Apparels");
const items = document.querySelectorAll(".item");
const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");


const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("id");
// console.log(selectedCategory);

if(!selectedCategory || selectedCategory === "null"){
    if(!window.location.href.includes("shop.html")){
        window.location.href="shop.html";
    }
}
else{
    items.forEach(item => {
    if (item.dataset.category !== selectedCategory) {
        item.style.display="none";
    }
    // console.log(item.class);
});
}
// console.log(items);


items.forEach(item=>{
    const itemId=item.id;
    item.addEventListener("click",function(){
        window.location.href=`cloth.html?id=${itemId}`;
    })
})

 let localItems=Number(localStorage.length);
 counter.textContent=localItems;
 const itemsCart=Number(counter.innerText);
 if(itemsCart>0){
    btnItems.addEventListener("click",function(){
        window.location.href="product.html";
    })
 }
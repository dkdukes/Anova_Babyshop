const category=document.querySelectorAll(".category");
const feeding=document.querySelectorAll(".feeding");
const nursery=document.querySelectorAll(".nursery");
const gear=document.querySelectorAll(".gear");
const transport=document.querySelectorAll(".transport");
const toys=document.querySelectorAll(".toys");
const apparel=document.querySelectorAll(".Apparels");
const items = document.querySelectorAll(".item");


category.forEach(x=>{
    const id=x.id;
    x.addEventListener("click",function(){
        if(this.id==="apparel"){
            window.location.href="shop.html?category=apparel";
        }
    })
})

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
// console.log(selectedCategory);

// console.log(items);
items.forEach(item => {
    if (item.dataset.category !== selectedCategory) {
        item.style.display="none";
    }
    // console.log(item.class);
});

items.forEach(item=>{
    const itemId=item.id;
    item.addEventListener("click",function(){
        window.location.href=`cloth.html?id=${itemId}`;
    })
})

// const param=new URLSearchParams(window.location.search);
// const selectedItem=param.get("id");
// const images=document.querySelector(".image");
// const details=document.querySelector(".details");
// items.forEach(item=>{
//     // console.log(item.id);
//     if(item.id === selectedItem){
//         // get data from HTML
//         const imgSrc = item.dataset.image;
//         const name = item.dataset.name;

//         // image
//         const span = document.createElement("span");
//         span.innerHTML = `<img src="${imgSrc}" alt="${name}">`;
//         images.appendChild(span);

//         // details (optional)
//         const title = document.createElement("h2");
//         title.textContent = name;
//         details.appendChild(title);
//     }
// })
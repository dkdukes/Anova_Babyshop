const images = document.querySelector(".image");
const details = document.querySelector(".details");
const minus = document.getElementById("btnMinus");
const plus = document.getElementById("btnPlus");
const valueText = document.getElementById("btnValue");
const cartItems = document.getElementById("btnCart");
const counter = document.getElementById("counter");
const btnItems=document.getElementById("btnItems");

const param = new URLSearchParams(window.location.search);
const selectedItem = param.get("id");
//fetch data from db
async function getData() {
  try {
    const res = await fetch("http://localhost:3000/posts");
    if (!res.ok) {
      throw new Error("The network response was not ok!");
    }
    const data = await res.json();

    data.forEach((post) => {
      const id = post.id;
      if (id === selectedItem) {
        const image = post.image;
        const title = post.title;
        const description = post.description;
        const price = post.price;

        const spanImage = document.createElement("span");
        const spanDetails = document.createElement("span");
        spanImage.innerHTML = `<img src=${image} alt="Baby Image" class="w-600 h-120 py-2">`;
        spanDetails.innerHTML = `<div class="py-2 px-4"><div class="mb-4 text-bold text-2xl text-serif">KEY FEATURES</div> <div class="mb-4 text-xl ">${title}</div> <div class="mb-4 text-serif">${description}</div> <div class="mb-4 text-2xl ">Kshs. ${price}</div></div>`;
        spanImage.className = "mt-30";
        images.appendChild(spanImage);
        details.appendChild(spanDetails);
      }
    });
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

getData();

let num = Number(valueText.innerText);

minus.addEventListener("click", function (e) {
  e.preventDefault();
  let count = 1;
  if (num > 1) {
    num -= count;
  }
  valueText.textContent = num;
});

plus.addEventListener("click", function (e) {
  e.preventDefault();
  let count = 1;
  num += count;
  valueText.textContent = num;
});

let itemsArray = [];
cartItems.addEventListener("click", function (e) {
  e.preventDefault();

  let quantity = Number(valueText.innerText);

  let existingItem = localStorage.getItem(selectedItem);

  if (existingItem) {
    // update quantity
    let parsed = JSON.parse(existingItem);
    parsed.quantity += quantity;
    localStorage.setItem(selectedItem, JSON.stringify(parsed));
  } else {
    // add new item
    const dataItems = {
      id: selectedItem,
      quantity: quantity
    };
    localStorage.setItem(selectedItem, JSON.stringify(dataItems));
  }

  // update counter
  let num = Number(localStorage.length);
  counter.textContent = num;
});
 let localItems=Number(localStorage.length);
 counter.textContent=localItems;

btnItems.addEventListener("click", function () {
  const items = Number(counter.innerText);

  if (items > 0) {
    window.location.href = "product.html";
  }
});
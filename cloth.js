const images = document.querySelector(".image");
const details = document.querySelector(".details");
const minus = document.getElementById("btnMinus");
const plus = document.getElementById("btnPlus");
const valueText = document.getElementById("btnValue");
const cartItems = document.getElementById("btnCart");
const counter = document.getElementById("counter");

const param = new URLSearchParams(window.location.search);
const selectedItem = param.get("id");
//fetcg data from db
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

minus.addEventListener("click", function () {
  let count = 1;
  if (num >= 1) {
    num -= count;
  }
  valueText.textContent = num;
});

plus.addEventListener("click", function () {
  let count = 1;
  num += count;
  valueText.textContent = num;
});

let itemsArray = [];
cartItems.addEventListener("click", function (e) {
  e.preventDefault();
  if (!itemsArray.includes(selectedItem)) {
    itemsArray.push(selectedItem);
    let num = Number(counter.innerText);
    num += 1;
    counter.textContent = num;
    let quantity=Number(valueText.innerText);
    const dataItems={"id":selectedItem,"quantity":quantity};
    localStorage.setItem(selectedItem,JSON.stringify(dataItems));
  }
});
console.log(itemsArray);

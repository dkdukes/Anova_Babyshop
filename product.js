const product = document.querySelector(".products");
const checkout = document.querySelector(".checkout");

//get items from localstorage
let cartItems = [];

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const items = localStorage.getItem(key);
  if (!items) continue;

  const item = JSON.parse(items);
  cartItems.push(item); // store all items
}
let total = 0;
async function getData() {
  try {
    const res = await fetch("http://localhost:3000/posts");
    if (!res.ok) {
      throw new Error("The network response was not ok!");
    }

    const data = await res.json();

    cartItems.forEach((cartItem) => {
      const match = data.find((post) => post.id === cartItem.id);
      const key = cartItem.key;
      if (match) {
        const title = match.title;
        const price = match.price;
        const quantity = cartItem.quantity;
        const subTotal = Number(price * quantity);
        const span = document.createElement("span");

        span.innerHTML = `
          <div class="flex gap-2 mb-4 itemss"> 
            <div class="basis-2/6">${title}</div>
            <div class="basis-1/6">${price}</div>
            <div class="flex gap-1 basis-1/6">
              <div class="bg-cyan-200 rounded-full px-3 py-2 cursor-pointer btnMinus">-</div>
              <div class="text-center px-3 py-2 btnValue">${quantity}</div>
              <div class="bg-cyan-200 rounded-full px-3 py-2 mr-10 cursor-pointer btnPlus">+</div>
            </div>
            <div class="basis-1/6 subTotal">${subTotal}</div>
            <div class="basis-1/6 delete" data-id="${cartItem.id}">DELETE</div>
          </div>
        `;
        product.appendChild(span);

        const totalSub = span.querySelector(".subTotal");
        const plus = span.querySelector(".btnPlus");
        const minus = span.querySelector(".btnMinus");
        const valueText = span.querySelector(".btnValue");
        const deleteItem = span.querySelector(".delete");
        const itemss = span.querySelector(".itemss");

        deleteItem.addEventListener("click", function () {
          const id = span.querySelector(".itemss").dataset.id;

          localStorage.removeItem(id);

          span.remove(); // remove from UI

          updateGrandTotal();
          updateCheckout();
        });
        let num = quantity;

        minus.addEventListener("click", (e) => {
          e.preventDefault();

          if (num > 1) {
            num--;
            valueText.textContent = num;

            totalSub.textContent = num * price;

            updateGrandTotal();
            updateCheckout();
          }
        });

        plus.addEventListener("click", (e) => {
          e.preventDefault();

          num++;
          valueText.textContent = num;

          totalSub.textContent = num * price;

          updateGrandTotal();
          updateCheckout();
        });
      }
    });
    const totalOrder = document.createElement("span");
    const shipping = 200;
    const totalPay = total + shipping;
    totalOrder.innerHTML = `<div class="flex flex-col">
    <div class="mb-5 text-center text-2xl font-serif">Anova Baby Shop</div>
    <div class="mb-2 text-right font-semi-bold">P.O Box 68-00100 Nairobi.</div>
    <div class="mb-4 text-right">Contact: 0726 128 360</div>
    <div class="text-center text-xl">Order Summary</div>
    <hr>
    <div class="mt-2 mb-2">Pay: <span class="px-5 checkout-total">0</span></div>
    <div class="mb-2">Shipping Fee:<span class="px-5"> ${shipping}</span></div>
    <div class="">Total Pay: <span class="px-5 total-pay">0</span></div>
    <hr>
    <div><button class="mt-4 w-full px-4 py-2 rounded-lg bg-orange-300 hover:bg-orange-400" id="itemsCheck">CheckOut</button></div>
    </div>`;
    checkout.appendChild(totalOrder);

    updateGrandTotal();
    updateCheckout();

    const itemCheck = document.getElementById("itemsCheck");
    itemCheck.addEventListener("click", function () {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

function updateGrandTotal() {
  total = 0;

  document.querySelectorAll(".subTotal").forEach((el) => {
    total += Number(el.textContent);
  });
}

function updateCheckout() {
  const shipping = 200;

  document.querySelector(".checkout-total").textContent = total;
  document.querySelector(".total-pay").textContent = total + shipping;
}
getData();

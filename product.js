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
  <div class="grid grid-cols-5 items-center gap-2 mb-4 itemss">

    <div>${title}</div>

    <div>${price}</div>

    <div class="flex items-center gap-2">
      <button class="bg-gray-200 hover:bg-gray-300 rounded px-2 btnMinus">−</button>
      <span class="btnValue">${quantity}</span>
      <button class="bg-gray-200 hover:bg-gray-300 rounded px-2 btnPlus">+</button>
    </div>

    <div class="subTotal">${subTotal}</div>

    <button 
      class="delete text-red-500 hover:text-red-700 hover:scale-110 transition"
      data-id="${cartItem.id}"
    >
      🗑️
    </button>

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
    totalOrder.innerHTML = `
  <div class="flex flex-col">

    <div class="mb-4 text-center text-2xl font-semibold">Anova Baby Shop</div>

    <div class="text-sm text-right text-gray-600">P.O Box 68-00100 Nairobi</div>
    <div class="mb-4 text-sm text-right text-gray-600">Contact: 0726 128 360</div>

    <div class="text-center text-lg font-semibold mb-2">Order Summary</div>
    <hr class="mb-3">

    <div class="flex justify-between mb-2">
      <span>Subtotal</span>
      <span class="checkout-total">KSh 0</span>
    </div>

    <div class="flex justify-between mb-2">
      <span>Shipping Fee</span>
      <span>KSh ${shipping}</span>
    </div>

    <div class="flex justify-between font-semibold text-lg mt-2">
      <span>Total Pay</span>
      <span class="total-pay">KSh 0</span>
    </div>

    <hr class="my-4">

    <button 
      id="itemsCheck"
      class="w-full py-2 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
    >
      Proceed to Checkout
    </button>

  </div>
`;
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

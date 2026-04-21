const userPass = document.getElementById("pass");
const userEmail = document.getElementById("email");
const userMessage = document.querySelector(".message");
const login = document.getElementById("login");
const btnItems = document.getElementById("btnItems");
const counter = document.getElementById("counter");

// Show message
function showMessage(text, type = "error") {
  userMessage.textContent = text;
  userMessage.className =
    type === "success" ? "text-green-500" : "text-red-500";
}

//Login user
login.addEventListener("click", function (e) {
  e.preventDefault();
  let emailUser = userEmail.value;
  let passUser = userPass.value;
  const user = validateUser(emailUser, passUser);
  if (user) {
    loginUser(emailUser, passUser);
  }
});

//validate credentials
function validateUser(email, pass) {
  if (!email || !pass) {
    showMessage("Please enter an email and password!");
    return false;
  }
  if (pass.length < 8) {
    showMessage("Password length should be 8 characters or more!");
    return false;
  }
  if (!email.includes("@")) {
    showMessage("Please enter a valid email address!");
    return false;
  }
  return true;
}

// //login
async function loginUser(emailUser, passUser) {
  const res = await fetch("http://localhost:3000/users");
  if (!res.ok) {
    throw new Error("The network response was not ok!");
  }
  const data = await res.json();
  const userExist = data.find(
    (user) => user.email === emailUser && user.password === passUser,
  );
  if (userExist) {
    setTimeout(() => {
      showMessage("Login successful!", "success");
      window.location.href = "shop.html";
    }, 1000);
    
  } else {
    showMessage("User does not exist!");
  }
}

let localItems = Number(localStorage.length);
counter.textContent = localItems;

const items = Number(counter.innerText);
if (items > 0) {
  btnItems.addEventListener("click", function () {
    window.location.href = "product.html";
  });
}

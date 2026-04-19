const userPass = document.getElementById("pass");
const userEmail = document.getElementById("email");
const userMessage = document.querySelector(".message");
const register = document.getElementById("register");
const login = document.getElementById("login");
const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");
// // Show message
// function showMessage(text, type = "error") {
//   userMessage.textContent = text;
//   userMessage.className =
//     type === "success" ? "text-green-500" : "text-red-500";
// }

// //Register user
// register.addEventListener("click", function (e) {
//   e.preventDefault();
//   let emailUser = userEmail.value;
//   let passUser = userPass.value;
//   const user = validateUser(emailUser, passUser);
//   if (user) {
//     createUser(emailUser, passUser);
//     showMessage("User created successfully!");
//   }
// });



// //validate credentials
// function validateUser(email, pass) {
//   if (!email || !pass) {
//     showMessage("Please enter an email and password!");
//     return false;
//   }
//   if (pass.length < 8) {
//     showMessage("Password length should be 8 characters or more!");
//     return false;
//   }
//   if (!email.includes("@")) {
//     showMessage("Please enter a valid email address!");
//     return false;
//   }
//   return true;
// }

// //save the logins to local storage

// function createUser(emailAddress, password) {
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const users = localStorage.getItem(key);
//     if (!users) continue;
//     if (users === emailAddress) {
//       throw new Error("User already exists!");
//     }
//   }
//   let email = emailAddress;
//   let pass = password;
//   localStorage.setItem(pass, email);
// }


//  let localItems=Number(localStorage.length);
//  counter.textContent=localItems;
 let localItems=Number(localStorage.length);
 counter.textContent=localItems;

 const items=Number(counter.innerText);
 if(items>0){
    btnItems.addEventListener("click",function(){
        window.location.href="product.html";
    })
 }


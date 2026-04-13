const userPass = document.getElementById("pass");
const userEmail = document.getElementById("email");
const userMessage = document.querySelector(".message");
const register = document.getElementById("register");
const login = document.getElementById("login");

// Show message
function showMessage(text, type = "error") {
  userMessage.textContent = text;
  userMessage.className =
    type === "success" ? "text-green-500" : "text-red-500";
}

//Register user
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

//Login user
login.addEventListener("click", function (e) {
  e.preventDefault();
  let emailUser = userEmail.value;
  let passUser = userPass.value;
  const user = validateUser(emailUser, passUser);
  if (user) {
    loginUser(emailUser);
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

//save the logins to local storage

function createUser(emailAddress, password) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const users = localStorage.getItem(key);
    if (!users) continue;
    if (users === emailAddress) {
      throw new Error("User already exists!");
    }
  }
  let email = emailAddress;
  let pass = password;
  localStorage.setItem(pass, email);
}

//login
function loginUser(email) {
  let found = false;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const users = localStorage.getItem(key);
    if (users === email) {
      found = true;
      break;
    }
  }
  if (found) {
    showMessage("Login successful!");
    setTimeout(()=>{
        window.location.href="shop.html";
    },2000);
  } else {
    showMessage("User does not exist!");
  }
}

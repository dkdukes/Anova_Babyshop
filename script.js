const userPass = document.getElementById("pass");
const userEmail = document.getElementById("email");
const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const userMessage = document.querySelector(".message");
const register = document.getElementById("register");
const btnItems=document.getElementById("btnItems");
const counter=document.getElementById("counter");

// Show message
function showMessage(text, type = "error") {
  userMessage.textContent = text;
  userMessage.className =
    type === "success" ? "text-green-500" : "text-red-500";
}



//Register user
register.addEventListener("click", function (e) {
  e.preventDefault();
  let emailUser = userEmail.value;
  let passUser = userPass.value;
  const user = validateUser(emailUser, passUser);
  if (user) {
    createUser(emailUser, passUser);
     setTimeout(() => {
        showMessage("Account created successfully!","success");
      }, 1000);
  }
});



//validate credentials
function validateUser(emailUser, passUser) {
  if (!emailUser || !passUser) {
    showMessage("Please enter an email and password!");
    return false;
  }
  if (passUser.length < 8) {
    showMessage("Password length should be 8 characters or more!");
    return false;
  }
  if (!emailUser.includes("@")) {
    showMessage("Please enter a valid email address!");
    return false;
  }
  return true;
}

//save the logins to db.json

async function createUser(emailUser, passUser) {
  const data = {
    firstName: fname.value,
    secondName: lname.value,
    email: userEmail.value,
    password: userPass.value
  };

  try {
    const res = await fetch("http://localhost:3000/users");

    if (!res.ok) {
      throw new Error("The network response was not ok!");
    }

    const resData = await res.json(); 

    // check if user exists
    const userExists = resData.some(user =>
      user.email === emailUser && user.password === passUser
    );

    if (userExists) {
      showMessage("The user exists! Please login below");
    } else {
      // create new user
      const postRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataRes = await postRes.json();

     
    }

  } catch (error) {
    console.log("Error", error);
  }
}

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


import {Layout}  from "./Components/layout.js";
// import { Home } from "./Pages/Home/src/main.js";
// import { HomeDom } from "./Pages/Home/src/main.js";
// import { Signin }  from "./Pages/Signin/src/main.js";
// import { Signup } from "./Pages/Signup/src/main.js";
// import {signInFetchUser } from "./Pages/Signin/src/main.js";
// import { Signup_Event } from "./Pages/Signup/src/main.js";
// import { Logout } from "./Components/header.js";
// import {AdminPanel, PaginationStarter} from "./Pages/Admin/src/main.js";

// function render(pageContent) {
//   const layout = Layout(pageContent);
//   const app = document.getElementById("app");
//   app.innerHTML = layout.page;
//   const content = document.getElementById("container");
//   const navbar_height = document.getElementsByClassName("navbar")[0].scrollHeight+50;
//   const footer_height = document.getElementsByClassName("footer")[0].scrollHeight+50;
//   content.style.marginTop = `${navbar_height}px`;
//   content.style.marginBottom = `${footer_height}px`;
  
//   if(layout.check.check){
//     document.getElementById("userName").innerText = `${layout.check.user.firstName} ${layout.check.user.lastName}`;
//   }
//   Logout();
// }

// const router = async () => {
//   const route = window.location.hash;
//   if (window.location.href === "http://127.0.0.1:5500/Store.UI/index.html" 
//     || window.location.href === "http://127.0.0.1:5500/Store.UI/") {
//     render(Home());
//     await Seed();
//     // HomeDom();
//   }
//   else if(route == "#admin"){
//     render(AdminPanel())
//     PaginationStarter();
//   }
//   else if(route === "#signin") {
//     render(Signin());
//     signInFetchUser();
//   }
//   else if(route === "#signup"){
//     render(Signup())
//     Signup_Event();
//   }
//   else {
//     render("<h1>404 - Sayfa Yok</h1>");
//   }
// }

// window.addEventListener("hashchange", router);
// window.addEventListener("load", router);

import {GetUserById} from "./Apis/src/usergetbyid.js";
import {Signin} from "./Apis/src/signin.js";
const Seed = async () => {
    const loginResult = await Signin({
        userName: "Beratkut",
        password: "Ber@t718"
    });

    if (!loginResult.isOk) {
        console.error("Login failed");
        return;
    }

    const response = await GetUserById(5);
    console.log("GetUserById response:", response);
};
for(let index = 0; index <= 1; index++){
    Seed();
}
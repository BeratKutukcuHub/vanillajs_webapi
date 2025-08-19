import { Layout } from "./Components/layout.js";
import { Home } from "./Pages/Home/src/main.js";
import { HomeDom } from "./Pages/Home/src/main.js";
import { SigninController, SigninPage }  from "./Pages/Signin/src/main.js";
import { SignupController, SignupPage } from "./Pages/Signup/src/main.js";
import { Logout } from "./Components/header.js";
import { AdminController, AdminPage , UserDetailPage, UserDetailInformations } from "./Pages/Admin/src/admin.js"
import { GetUserById } from "./Apis/src/usergetbyid.js";
import {ProductController, ProductPage} from "./Pages/Product/src/product.js";
function render(pageContent) {
  const layout = Layout(pageContent);
  const app = document.getElementById("app");
  app.innerHTML = layout.page;
  const content = document.getElementById("container");
  const navbar_height = document.getElementsByClassName("navbar")[0].scrollHeight+50;
  const footer_height = document.getElementsByClassName("footer")[0].scrollHeight+50;
  content.style.marginTop = `${navbar_height}px`;
  content.style.marginBottom = `${footer_height}px`;

  if(layout.check.check){
    document.getElementById("userName").innerText = `${layout.check.user.firstName} ${layout.check.user.lastName}`;
  }
  Logout();
}
const router = async () => {
  const route = window.location.hash;
  if (window.location.href === "http://127.0.0.1:5500/Store.UI/index.html" 
    || window.location.href === "http:127.0.0.1:5500/Store.UI/") {
    render(Home());
    HomeDom();
  }
  else if(route === "#admin"){
    render(AdminPage())
    await AdminController();
  }
  else if(route === "#signin") {
    render(SigninPage());
    await SigninController();
  }
  else if(route === "#signup"){
    render(SignupPage())
    await SignupController();
  }
  else if(route === "#product"){
    render(ProductPage());
    await ProductController();
  }
  else if(route.includes("#User/")){
    const id = route.split("/")[1];
    render(UserDetailPage());
    const response = await GetUserById(parseInt(id));
    if (response) {
      UserDetailInformations(response); 
    }
  }
  else {
    render("<h1>404 - Sayfa Yok</h1>");
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);


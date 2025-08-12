import {Layout}  from "./Components/layout.js";
import {Signin}  from "./Pages/Signin/src/main.js";
import {signInFetchUser} from "./Pages/Signin/src/main.js";
function render(pageContent) {
  document.getElementById("app").innerHTML = Layout(pageContent);
}

function router() {
  const route = window.location.hash; 
  console.log(route);
  if (route === "#signin") {
    render(Signin());
 
  } else if (route === "#home") {
    render(Home());
  } else {
    render("<h1>404 - Sayfa Yok</h1>");
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

render(Signin());
signInFetchUser();

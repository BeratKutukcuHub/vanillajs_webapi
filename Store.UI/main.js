import {Layout}  from "./Components/layout.js";
import {Signin}  from "./Pages/Signin/src/main.js";

function render(pageContent) {
  document.getElementById("app").innerHTML = Layout(pageContent);
}

render(Signin());
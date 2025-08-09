"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var button = document.querySelector("#user_button");
var userForm = document.querySelector(".user_form");
button === null || button === void 0 ? void 0 : button.addEventListener("mouseenter", () => userForm === null || userForm === void 0 ? void 0 : userForm.classList.add("button_effect"));
button === null || button === void 0 ? void 0 : button.addEventListener("mouseleave", () => userForm === null || userForm === void 0 ? void 0 : userForm.classList.remove("button_effect"));
var userInputs = document.querySelectorAll(".user_input");
button === null || button === void 0 ? void 0 : button.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    let userProperties = {
        firstName: "",
        lastName: "",
        age: 18,
        userName: ""
    };
    userInputs.forEach(user => {
        const { value, name } = user;
        userProperties = Object.assign(Object.assign({}, userProperties), { [name]: value });
    });
    yield fetch("https://localhost:7230/User", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userProperties)
    });
    console.log(userProperties);
}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Signin } from "../../../Apis/src/signin.js";
export const SigninPage = () => {
    return `
    <main class="section_base">
    <section class="section">
        <form class="user_form">
            <div class="user_controller" id="user_controller">
                <div class="user_div">
                <label>Kullanıcı Adınız : </label>
                <input autocomplete="off" name="userName" class="user_input" type="text" maxlength="10" minlength="3">
            </div>
            <div class="user_div">
                <label>Şifreniz : </label>
                <input autocomplete="off" name="password" class="user_input" type="password" minlength="8">
            </div>
            
            <div class="user_apply">
                <button id="user_button">ONAYLA</button>
            </div>
            </div>
        </form>
    </section>
    </main>`;
};
const errorMessage = document.createElement("h4");
const SigninErrorMessage = () => {
    let user_controller = document.getElementById("user_controller");
    const check = user_controller === null || user_controller === void 0 ? void 0 : user_controller.getElementsByTagName("h4");
    if ((check === null || check === void 0 ? void 0 : check.length) == 0) {
        user_controller === null || user_controller === void 0 ? void 0 : user_controller.appendChild(errorMessage);
    }
    errorMessage.classList.add("isNonError");
    errorMessage.classList.add("errorInteraction");
    errorMessage.innerText = "No user was found with the information entered.";
    const errorMessageClassList = errorMessage.classList;
    return {
        user_controller: user_controller,
        errorMessageClassList: errorMessageClassList
    };
};
const SigninDomElement = () => {
    const { user_controller } = SigninErrorMessage();
    const apply = document.getElementById("user_button");
    let userSigninValues = document.getElementsByTagName("input");
    return {
        user_controller: user_controller,
        apply: apply,
        userSigninValues: userSigninValues
    };
};
const userInfosErrorHandler = () => {
    const { errorMessageClassList } = SigninErrorMessage();
    errorMessageClassList.remove("isNonError");
    errorMessageClassList.add("isError");
    setTimeout(() => {
        errorMessageClassList.remove("isError");
        errorMessageClassList.add("isNonError");
    }, 2000);
};
const SigninInputs = () => {
    const { userSigninValues } = SigninDomElement();
    let signUser = { userName: "", password: "" };
    Array.from(userSigninValues).forEach((item, index) => {
        signUser = Object.assign(Object.assign({}, signUser), { [item.name]: item.value });
    });
    return signUser;
};
export const SigninController = () => __awaiter(void 0, void 0, void 0, function* () {
    const apply = document.getElementById("user_button");
    if (!apply)
        return;
    apply.addEventListener("click", (clickEvent) => __awaiter(void 0, void 0, void 0, function* () {
        clickEvent.preventDefault();
        const response = yield Signin(SigninInputs());
        if (!response)
            throw new Error("Sign in responsed the error");
        else {
            window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
            return;
        }
    }));
});
const OldSignInFetchUser = () => {
    const { user_controller } = SigninDomElement();
    const apply = document.getElementById("user_button");
    if (!apply)
        return;
    apply.addEventListener("click", (clickEvent) => __awaiter(void 0, void 0, void 0, function* () {
        clickEvent.preventDefault();
        console.log(SigninInputs());
        let signin = yield fetch("https://localhost:7230/Auth/Signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(SigninInputs())
        });
        const data = yield signin.json();
        if (!signin.ok) {
            console.log(user_controller);
            userInfosErrorHandler();
            console.error(data);
            return;
        }
        localStorage.setItem("Token", data.token);
        const token = `Bearer ${data.token}`;
        const meAndToken = yield fetch("https://localhost:7230/Auth/Me", {
            method: "GET",
            headers: {
                "Authorization": token,
                "Content-type": "application/json"
            }
        });
        if (!meAndToken.ok) {
            userInfosErrorHandler();
            return;
        }
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
    }));
};

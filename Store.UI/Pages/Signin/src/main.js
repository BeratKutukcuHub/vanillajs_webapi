var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const Signin = () => {
    return `<section class="section">
        <form class="user_form">
            <div class="user_controller">
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
    </section>`;
};
const apply = document.getElementById("user_button");
let userSigninValues = document.getElementsByTagName("input");
const signinInput = () => {
    let signUser = { userName: "", password: "" };
    Array.from(userSigninValues).forEach((item, index) => {
        signUser = Object.assign(Object.assign({}, signUser), { [item.name]: item.value });
    });
    return signUser;
};
export const signInFetchUser = () => apply === null || apply === void 0 ? void 0 : apply.addEventListener("click", (clickEvent) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(signinInput());
    clickEvent.preventDefault();
    let signin = yield fetch("https://https://localhost:7230/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signinInput())
    });
    if (!signin.ok) {
        console.log(signin.json());
    }
    console.log(signin.json());
}));

import { ISignin, User } from "../../../Apis/src/api";

export const Signin = () => {
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
const user_ControllerDomElement = () => {
    let user_controller = document.getElementById("user_controller");
    const check = user_controller?.getElementsByTagName("h4");
    if(check?.length == 0)
    {
        user_controller?.appendChild(errorMessage);
    }
    errorMessage.classList.add("isNonError");
    errorMessage.classList.add("errorInteraction");
    errorMessage.innerText = "No user was found with the information entered.";
    const errorMessageClassList = errorMessage.classList;
    return {
        user_controller : user_controller,
        errorMessageClassList : errorMessageClassList
    }
}
const domElement = () => {
    const {user_controller} = user_ControllerDomElement();
    const apply = document.getElementById("user_button");
    let userSigninValues: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
    
    return {
        user_controller : user_controller,
        apply : apply,
        userSigninValues : userSigninValues
    }
}
const userInfosErrorHandler = () => {
    const {errorMessageClassList} = user_ControllerDomElement();
            errorMessageClassList.remove("isNonError");
            errorMessageClassList.add("isError");
        setTimeout(()=>{
            errorMessageClassList.remove("isError");
            errorMessageClassList.add("isNonError");
        }, 2000)
}

const signinInput = () : ISignin => {
    const {userSigninValues} = domElement();
    let signUser : ISignin = { userName: "", password: "" };
    Array.from(userSigninValues).forEach((item : HTMLInputElement , index)=> {
        signUser = {
            ...signUser,
            [item.name] : item.value
        };
    });
    return signUser;
}
export const signInFetchUser = () => {
    const {user_controller} = domElement();
    const apply = document.getElementById("user_button");
    if (!apply) return;
    apply.addEventListener("click", async (clickEvent) => {
        clickEvent.preventDefault();
        console.log(signinInput());

        let signin = await fetch("https://localhost:7230/Auth/Signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signinInput())
        });

        const data = await signin.json();
        if (!signin.ok) {
            console.log(user_controller)
            userInfosErrorHandler();
            console.error(data);
            return;
        }
        localStorage.setItem("Token",data.token)
        const token = `Bearer ${data.token}`;
        const meAndToken  = await fetch("https://localhost:7230/Auth/Me",{
            method : "GET",
            headers : {
                "Authorization" : token,
                "Content-type" : "application/json"
            }
        });
        if(!meAndToken.ok){
            userInfosErrorHandler();
            return;
        }
        const meInfo: User = await meAndToken.json();
        
        localStorage.setItem("User", JSON.stringify(meInfo));
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
    });
};

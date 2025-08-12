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
let userSigninValues: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");

interface ISignin {
    userName: string;
    password: string;
}
const signinInput = () : ISignin=> {
    let signUser : ISignin = { userName: "", password: "" };
    Array.from(userSigninValues).forEach((item : HTMLInputElement , index)=> {
        signUser = {
            ...signUser,
            [item.name] : item.value
        };
    });
    return signUser;
}
export const signInFetchUser = () => apply?.addEventListener("click", async (clickEvent) => {
    console.log(signinInput())
    clickEvent.preventDefault();
    let signin = await fetch("https://https://localhost:7230/auth/signin", {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(signinInput())
    });
    if(!signin.ok){
        console.log(signin.json());
    }
    console.log(signin.json());
})

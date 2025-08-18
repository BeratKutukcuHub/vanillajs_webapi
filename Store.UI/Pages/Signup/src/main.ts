import { SignupModel } from "../../../Apis/src/api";

export const Signup = () => {
    return ` <section class="signup_container">
        <div class="signup_top">
            <h1 style="color: rgb(24, 24, 35); font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 1.3rem;
             letter-spacing: 1.2px;">
                Should sign up with us we are biggest family!</h1>
            <h4 style="color: rgb(60, 60, 73); font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            letter-spacing: -0.5px; font-size: 0.9rem; text-align: center; word-spacing: 2px;">Congratulations on doing yourself a favor by joining us.
                 You will eventually see the rewards of your contributions to our family!</h4>
        </div>
        <form class="signup_bottom">
            <div class="signup_group">
                <div class="signup_item">
                    <label>Kullanıcı Adı : </label>
                    <input type="text" name="userName" class="signup_input">
                </div>
                <div class="signup_item">
                    <label>Adınız : </label>
                    <input type="text" name="firstName" class="signup_input">
                </div>
                <div class="signup_item">
                    <label>Soyadınız : </label>
                    <input type="text" name="lastName" class="signup_input">
                </div>
                <div class="signup_item">
                    <label>Yaşınız : </label>
                    <input type="number" max="99" min="18" name="age" class="signup_input">
                </div>
                <div class="signup_item">
                    <label>Şifreniz : </label>
                    <input type="password" name="password" class="signup_input">
                </div>
                <div class="signup_item">
                    <label>Email : </label>
                    <input type="email" name="email" class="signup_input">
                </div>
                    <div class="signup_apply">
                        <button class="signup_button" id="signup_button">Kayıt Ol!</button>
                    </div>
            </div>
        </form>
    </section>`
}




const signup_input : NodeListOf<HTMLInputElement> = 
document.getElementsByName("signup_input") as NodeListOf<HTMLInputElement>;
const signup_button = document.getElementById("signup_button");


export const Signup_Event = () => {
    if(!signup_button)return;
    signup_button?.addEventListener("click",(event : Event) => {
    event.preventDefault();
    let signup_infos : SignupModel;
    signup_input.forEach((value,key) => {
        signup_infos = {
            ...signup_infos,
            [value.name] : value.value
        }
    })
    const signUser = async () => {
        const user = await fetch("https://localhost:7230/Auth/Signup",
        {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(signup_infos),
        }
        )
        if(user.ok){
            console.log(user.json());
        }
    }
    signUser();
})
}


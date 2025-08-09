
interface User {
age : number,
createdAt : Date,
firstName : string,
id : number,
isActive : boolean,
lastName : string,
userName : string
}

interface CreateUser {
    age : number,
    userName : string,
    firstName : string,
    lastName : string
}

var button = document.querySelector("#user_button");
var userForm = document.querySelector(".user_form");
button?.addEventListener("mouseenter",()=> userForm?.classList.add("button_effect"));
button?.addEventListener("mouseleave",()=> userForm?.classList.remove("button_effect"));

var userInputs = document.querySelectorAll(".user_input");
button?.addEventListener("click",async (event)=> {
    event.preventDefault();
    let userProperties : CreateUser = {
        firstName : "",
        lastName : "",
        age : 18,
        userName : ""
    };
    
    userInputs.forEach(user => {
        const {value , name} = (user as HTMLInputElement);
        userProperties = {
            ...userProperties,
            [name] : value
        }
    });
    await fetch("https://localhost:7230/User",
        {
            method : "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body : JSON.stringify(userProperties)
        }
    );
    console.log(userProperties);
})
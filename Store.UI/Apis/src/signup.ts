import { SignupModel } from "./api.js"

export const Signup = async (Signup : SignupModel) => {
    const signup = await fetch("https://localhost:7230/Auth/Signup",
        {
            method : "POST",
            body: JSON.stringify(Signup),
            headers : {
                "Content-type" : "application/json" 
            }
        }
    );
    if(!signup.ok)
    {
        console.error(await signup.json())
        return;
    }
    return await signup.json();
}
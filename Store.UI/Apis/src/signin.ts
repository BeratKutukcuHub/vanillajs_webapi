import { ISignin, LocalStoreInformations, ResponseSigninTokenDto, User } from "./api.js";



export const Signin = async (Signin: ISignin): Promise<any> => {
    const response = await fetch("https://localhost:7230/Auth/Signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Signin)
    });
    if (!response.ok) throw new Error("Signin failed");
    const result: ResponseSigninTokenDto = await response.json();
    
    if (!result.token) {
    throw new Error("Signin failed: no token received");
    }
    localStorage.setItem("Token", JSON.stringify({
    token: `Bearer ${result.token}`,
    refreshToken: result.refreshToken
}));

const userResponse = await fetch("https://localhost:7230/User/Me", {
    method : "GET",
    headers: { 
        "Authorization": LocalStoreInformations().Token,
         "Content-Type": "application/json" 
    }
});
const user: User = await userResponse.json();
localStorage.setItem("User", JSON.stringify(user));

return {
    User: user,
    Token: result.token,
    isOk: true
};
};
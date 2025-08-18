import { LocalStoreInformations, RefreshTokenAndNewlyToken } from "./api.js";

export const RefreshToken = async () => {
    const localInfos = LocalStoreInformations();
    if(!localInfos.isOk) return null;

    const refresh = await fetch(`https://localhost:7230/Auth/Refresh`, {
        method: "POST",
        body: JSON.stringify({id:localInfos.id,refreshToken:localInfos.refreshToken}),
        headers: {
            "Authorization": LocalStoreInformations().token,
            "Content-type": "application/json"
        }
    });
    if(!refresh.ok) return null;

    const newlyToken : RefreshTokenAndNewlyToken = await refresh.json();
    console.log(newlyToken);
    localStorage.removeItem("Token");
    localStorage.setItem("Token", JSON.stringify({
        id : localInfos.id,
        token: `Bearer ${newlyToken.token}`,
        refreshToken: newlyToken.refreshToken
    }));

    return `${newlyToken.token}`;
}
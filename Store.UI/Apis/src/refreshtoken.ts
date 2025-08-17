import { LocalStoreInformations } from "./api.js";

export const RefreshToken = async () => {
    const localInfos = LocalStoreInformations();
    if(!localInfos.isOk) return null;

    const refresh = await fetch(`https://localhost:7230/Auth/Refresh`, {
        method: "POST",
        body: JSON.stringify(localInfos.User),
        headers: {
            "Authorization": LocalStoreInformations().Token,
            "Content-type": "application/json"
        }
    });

    if(!refresh.ok) return null;

    const newlyToken = await refresh.json();
    localStorage.setItem("Token", JSON.stringify({
        token: newlyToken.token,
        refreshToken: newlyToken.refreshToken ?? localInfos.Token
    }));

    return `Bearer ${newlyToken.token}`;
}
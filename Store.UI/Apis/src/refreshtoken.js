var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LocalStoreInformations } from "./api.js";
export const RefreshToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const localInfos = LocalStoreInformations();
    if (!localInfos.isOk)
        return null;
    const refresh = yield fetch(`https://localhost:7230/Auth/Refresh`, {
        method: "POST",
        body: JSON.stringify({ id: localInfos.id, refreshToken: localInfos.refreshToken }),
        headers: {
            "Authorization": LocalStoreInformations().token,
            "Content-type": "application/json"
        }
    });
    if (!refresh.ok)
        return null;
    const newlyToken = yield refresh.json();
    console.log(newlyToken);
    localStorage.removeItem("Token");
    localStorage.setItem("Token", JSON.stringify({
        id: localInfos.id,
        token: `Bearer ${newlyToken.token}`,
        refreshToken: newlyToken.refreshToken
    }));
    return `${newlyToken.token}`;
});

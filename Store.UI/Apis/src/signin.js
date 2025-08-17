var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const Signin = (Signin) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://localhost:7230/Auth/Signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Signin)
    });
    if (!response.ok)
        throw new Error("Signin failed");
    const result = yield response.json();
    if (!result.token) {
        throw new Error("Signin failed: no token received");
    }
    localStorage.setItem("Token", JSON.stringify({
        token: `Bearer ${result.token}`,
        refreshToken: result.refreshToken
    }));
    const values = localStorage.getItem("Token");
    if (values) {
        const parsed = JSON.parse(values);
        const userResponse = yield fetch("https://localhost:7230/Auth/Me", {
            method: "GET",
            headers: {
                "Authorization": parsed.token,
                "Content-Type": "application/json"
            }
        });
        const user = yield userResponse.json();
        localStorage.setItem("User", JSON.stringify(user));
        return {
            User: user,
            Token: result.token,
            isOk: true
        };
    }
});

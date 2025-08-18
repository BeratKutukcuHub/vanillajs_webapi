var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const Signup = (Signup) => __awaiter(void 0, void 0, void 0, function* () {
    const signup = yield fetch("https://localhost:7230/Auth/Signup", {
        method: "POST",
        body: JSON.stringify(Signup),
        headers: {
            "Content-type": "application/json"
        }
    });
    if (!signup.ok) {
        console.error(yield signup.json());
        return;
    }
    return yield signup.json();
});

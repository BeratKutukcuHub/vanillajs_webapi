var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RefreshToken } from "./refreshtoken.js";
export const StatusErrorHandler = (theMethod_1, args_1, response_1, ...args_2) => __awaiter(void 0, [theMethod_1, args_1, response_1, ...args_2], void 0, function* (theMethod, args, response, _retry = 0) {
    if (response.status === 401 && _retry < 1) {
        const newToken = yield RefreshToken();
        if (!newToken)
            throw new Error("Refresh failed");
        const newResponse = yield theMethod(...args);
        return StatusErrorHandler(theMethod, args, newResponse, _retry + 1);
    }
    else if (response.status === 408) {
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        return;
    }
    else if (!response.ok) {
        try {
            const errorJson = yield response.json();
            console.error(`The request is wrong:`, errorJson);
        }
        catch (_a) {
            console.error("The request is wrong and response is not JSON");
        }
        return;
    }
    const requestofResponse = yield response.json();
    return requestofResponse;
});

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
export const StatusHandler = (status_1, method_1, ...args_1) => __awaiter(void 0, [status_1, method_1, ...args_1], void 0, function* (status, method, _isChecked = false, ...args) {
    if (status.status == 401 && _isChecked == false) {
        _isChecked = true;
        yield RefreshToken();
        method(...args);
    }
    else if (status.status == 408) {
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        return;
    }
    else if (!status.ok) {
        try {
            const response = yield status.json();
            console.error(response);
            return;
        }
        catch (_a) {
            const response = yield status.text();
            console.error(response);
            return;
        }
    }
    const result = yield status.json();
    return result;
});

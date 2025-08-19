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
import { StatusHandler } from "./statushandler.js";
export const UserCreate = (userCreate) => __awaiter(void 0, void 0, void 0, function* () {
    const localValues = LocalStoreInformations();
    userCreate.age = parseInt(userCreate.age.toString());
    const userCreateApi = yield fetch(`https://localhost:7230/User`, {
        method: "POST",
        body: JSON.stringify(userCreate),
        headers: {
            "Authorization": localValues.token,
            "Content-type": "application/json"
        }
    });
    yield StatusHandler(userCreateApi, UserCreate, false, userCreate);
});

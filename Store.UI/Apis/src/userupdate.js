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
export const UserUpdate = (UpdateUser) => __awaiter(void 0, void 0, void 0, function* () {
    const localInformation = LocalStoreInformations();
    if (localInformation.isOk) {
        const updateUser = yield fetch(`https://localhost:7230/User`, {
            method: "PUT",
            headers: {
                "Authorization": LocalStoreInformations().token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(UpdateUser)
        });
        const response = yield StatusHandler(updateUser, UserUpdate, false, updateUser);
        return response ? response : "";
    }
    return "Error Message : The informations is wrong";
});

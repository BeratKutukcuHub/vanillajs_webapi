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
import { StatusErrorHandler } from "./statuserrorhandler.js";
export const UserRemoveById = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const localTokenAndClaims = LocalStoreInformations();
    if (localTokenAndClaims.isOk) {
        const fetchDeleteUser = yield fetch(`https://localhost:7230/User/${Id}`, {
            method: "DELETE",
            headers: {
                "Authorization": LocalStoreInformations().Token,
                "Content-type": "application/json"
            },
        });
        const message = yield StatusErrorHandler(UserRemoveById, [Id], fetchDeleteUser, 0);
        if (message)
            return message;
        throw new Error("Error : this delete request is wrong");
    }
    else
        throw new Error("Error : this delete request is wrong");
    ;
});

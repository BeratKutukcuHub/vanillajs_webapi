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
export const GetUsersByPagination = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageNumber = 0, pageSize = 20) {
    const localStoreInfos = LocalStoreInformations();
    if (!localStoreInfos.isOk) {
        return localStoreInfos;
    }
    const users = yield fetch(`https://localhost:7230/User?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
        method: "GET",
        headers: {
            "Authorization": LocalStoreInformations().token,
            "Content-type": "application/json"
        }
    });
    const response = yield StatusHandler(users, GetUsersByPagination, false, pageNumber, pageSize);
    if (response)
        return response;
});

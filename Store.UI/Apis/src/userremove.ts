import { LocalStoreInformations } from "./api.js";
import { StatusHandler } from "./statushandler.js";

export const UserRemoveById = async (Id : number) : Promise<string> => {
    const localTokenAndClaims = LocalStoreInformations();
    if(localTokenAndClaims.isOk){
        const fetchDeleteUser = await fetch(`https://localhost:7230/User/${Id}`,
        {
            method : "DELETE",
            headers : {
                "Authorization": LocalStoreInformations().token,
                "Content-type" : "application/json"
            },
        }
        );
        const message = await StatusHandler<string>(fetchDeleteUser,UserRemoveById,false,Id);
        if(message) return message;
        throw new Error("Error : this delete request is wrong");
    }
    else throw new Error("Error : this delete request is wrong");;
}
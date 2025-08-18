import { LocalStoreInformations } from "./api.js";
import { StatusHandler } from "./statushandler.js";

export const UserRemoveById = async (Id : number) : Promise<void> => {
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
        await StatusHandler<string>(fetchDeleteUser,UserRemoveById,false,Id);
    }
    else throw new Error("Error : this delete request is wrong");;
}
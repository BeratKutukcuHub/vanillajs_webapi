import { LocalStoreInformations } from "./api.js";
import { StatusErrorHandler } from "./statuserrorhandler.js";

export const UserRemoveById = async (Id : number) : Promise<string> => {
    const localTokenAndClaims = LocalStoreInformations();
    if(localTokenAndClaims.isOk){
        const fetchDeleteUser = await fetch(`https://localhost:7230/User/${Id}`,
        {
            method : "DELETE",
            headers : {
                "Authorization": LocalStoreInformations().Token,
                "Content-type" : "application/json"
            },
        }
        );
        const message = await StatusErrorHandler<string>(UserRemoveById,[Id],fetchDeleteUser,0);
        if(message) return message;
        throw new Error("Error : this delete request is wrong");
    }
    else throw new Error("Error : this delete request is wrong");;
}
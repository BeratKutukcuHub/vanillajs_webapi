import { LocalStoreInformations , UpdateUser} from "./api.js";
import { StatusErrorHandler } from "./statuserrorhandler.js";

export const UserUpdate = async (UpdateUser : UpdateUser) : Promise<string> => {
    const localInformation = LocalStoreInformations();
    if(localInformation.isOk){
        const updateUser = await fetch(`https://localhost:7230/User`,
        {
            method : "PUT",
            headers : {
                "Authorization": LocalStoreInformations().Token,
                "Content-type" : "application/json"
            },
            body : JSON.stringify(UpdateUser)
        }
        );
        const response = await StatusErrorHandler<string>(UserUpdate,[UpdateUser],updateUser,0);
        return response? response : "";
    }
    return "Error Message : The informations is wrong";
}
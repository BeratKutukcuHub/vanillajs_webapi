import { LocalStoreInformations , UpdateUser} from "./api.js";
import { StatusHandler } from "./statushandler.js";

export const UserUpdate = async (UpdateUser : UpdateUser) : Promise<string> => {
    const localInformation = LocalStoreInformations();
    if(localInformation.isOk){
        const updateUser = await fetch(`https://localhost:7230/User`,
        {
            method : "PUT",
            headers : {
                "Authorization": LocalStoreInformations().token,
                "Content-type" : "application/json"
            },
            body : JSON.stringify(UpdateUser)
        }
        );
        const response = await StatusHandler<string>(updateUser,UserUpdate,false,updateUser);
        return response? response : "";
    }
    return "Error Message : The informations is wrong";
}
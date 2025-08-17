import { LocalStoreInformations, User } from "./api.js";
import { StatusHandler } from "./statushandler.js";


export const GetUserById = async (Id : number) : Promise<User> => {
    const localInformations = LocalStoreInformations();
    if(localInformations.isOk){
        const getUserInformation = await fetch(`https://localhost:7230/User/${Id}`,
            {
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    "Authorization": LocalStoreInformations().token,
                }
            }
        );
        const responseUser = await StatusHandler<User>(getUserInformation,GetUserById,false,Id);
        if(responseUser){
            return responseUser;
        }
        else throw new Error("The user is not found");
    }
    else throw new Error("The user is not found");
} 
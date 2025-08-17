import { LocalStoreInformations, User } from "./api.js";
import { StatusErrorHandler } from "./statuserrorhandler.js";


export const GetUserById = async (Id : number) : Promise<User> => {
    const localInformations = LocalStoreInformations();
    if(localInformations.isOk){
        const getUserInformation = await fetch(`https://localhost:7230/User/${Id}`,
            {
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    "Authorization": LocalStoreInformations().Token,
                }
            }
        );
        const responseUser = await StatusErrorHandler<User>(GetUserById,[Id],getUserInformation, 0);
        if(responseUser){
            return responseUser;
        }
        else throw new Error("The user is not found");
    }
    else throw new Error("The user is not found");
} 
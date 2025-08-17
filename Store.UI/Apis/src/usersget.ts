import { LocalStoreInformations, User } from "./api.js";
import { StatusHandler } from "./statushandler.js";

export const GetUsersByPagination = async (pageNumber : number = 0, pageSize : number = 20)  => {
    const localStoreInfos = LocalStoreInformations();
    if(!localStoreInfos.isOk){
        return localStoreInfos;
    }
    const users = await fetch(`https://localhost:7230/User?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        {
            method : "GET",
            headers : {
                "Authorization": LocalStoreInformations().token,
                "Content-type" : "application/json"
            }
        }
    )
    const response = await StatusHandler<User[]>(users,GetUsersByPagination,false,pageNumber,pageSize);   
    if(response)
    return response;
}
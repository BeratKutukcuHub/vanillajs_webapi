import { LocalStoreInformations, User } from "./api.js";
import { StatusErrorHandler } from "./statuserrorhandler.js";

export const GetUsersByPagination = async (pageNumber : number = 0, pageSize : number = 20)  => {
    const localStoreInfos = LocalStoreInformations();
    if(!localStoreInfos.isOk){
        return localStoreInfos;
    }
    const users = await fetch(`https://localhost:7230/User?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        {
            method : "GET",
            headers : {
                "Authorization": LocalStoreInformations().Token,
                "Content-type" : "application/json"
            }
        }
    )
    const response = await StatusErrorHandler<User[]>(GetUsersByPagination,
        [pageNumber,pageSize],users,0);   
    if(response)
    return response;
}
import { LocalStoreInformations, User } from "./api.js";
import { StatusHandler } from "./statushandler.js";

export interface Header {
    TotalPage : number,
    TotalSize : number
}
export interface PaginationResponse {
    Users : User[],
    Header : Header
}
export const GetUsersByPagination = async (pageNumber : number = 0, pageSize : number = 20) : Promise<PaginationResponse>  => {
    const localStoreInfos = LocalStoreInformations();
    if(!localStoreInfos.isOk){
        throw new Error("The request is failed");
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
    const paginationInformation = users.headers.get("x-pagination");
    if(response && paginationInformation){
        const headerInformation : Header = JSON.parse(paginationInformation);

    return {
        Users : response,
        Header : headerInformation
    };
    }
    throw new Error("The response is failed");
}
import { LocalStoreInformations } from "./api.js";
import { StatusHandler } from "./statushandler.js";

export interface UserCreate {
  userName: string,
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  roles: string[],
  age: number
}
export const UserCreate = async (userCreate : UserCreate) => {
    const localValues = LocalStoreInformations();
    userCreate.age = parseInt(userCreate.age.toString());
    const userCreateApi = await fetch(`https://localhost:7230/User`,{
        method : "POST",
        body : JSON.stringify(userCreate),
        headers : {
            "Authorization" : localValues.token,
            "Content-type" : "application/json"
        }
    });
    await StatusHandler(userCreateApi,UserCreate,false,userCreate);
    
} 
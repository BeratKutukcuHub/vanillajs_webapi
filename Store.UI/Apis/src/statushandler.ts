import { RefreshToken } from "./refreshtoken.js";



export const StatusHandler = async <ResponseType> (status : Response, 
    method : (...args: any[])=> Promise<any>, _isChecked : boolean = false, ...args : any[]) : 
    Promise<ResponseType | undefined | string> => {
    if(status.status == 401 && _isChecked == false){
        _isChecked = true;
        await RefreshToken();
        await method(...args);
    }
    else if(status.status == 408){
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        return;
    }
    else if(!status.ok && _isChecked == false){
        _isChecked = true;
        return;
    }
    try{
        const result : ResponseType = await status.json();
        return result;
    }
    catch {
        return;
    }
}



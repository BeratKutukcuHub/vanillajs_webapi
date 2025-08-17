import { RefreshToken } from "./refreshtoken.js";



export const StatusHandler = async <ResponseType> (status : Response, 
    method : (...args: any[])=> Promise<any>, _isChecked : boolean = false, ...args : any[]) : 
    Promise<ResponseType | undefined> => {
    if(status.status == 401 && _isChecked == false){
        _isChecked = true;
        await RefreshToken();
        method(...args);
    }
    else if(status.status == 408){
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        return;
    }
    else if(!status.ok){
        try {
            const response = await status.json();
            console.error(response);
            return;
        }catch {
            const response = await status.text();
            console.error(response);
            return;
        }
    }
    const result : ResponseType = await status.json();
    return result;
}



import { RefreshToken } from "./refreshtoken.js";

export const StatusErrorHandler = async <ResponseType>(
    theMethod : (...args : any[]) => any,
    args: any[],
    response : Response,
    _retry : number = 0,
) : Promise<ResponseType | void> => {

    if(response.status === 401 && _retry < 1){
    const newToken = await RefreshToken();
    if(!newToken) throw new Error("Refresh failed");

    const newResponse = await theMethod(...args);
    return StatusErrorHandler(theMethod, args, newResponse, _retry + 1);
}
    else if(response.status === 408){
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        return;
    }
    else if (!response.ok) {
        try {
            const errorJson = await response.json();
            console.error(`The request is wrong:`, errorJson);
        } catch {
            console.error("The request is wrong and response is not JSON");
        }
        return;
    }
    const requestofResponse : ResponseType = await response.json();
    return requestofResponse;
}


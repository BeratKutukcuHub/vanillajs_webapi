export interface Header {
    TotalSize: number,
    TotalPage : number
};
export interface PaginationResponse {
    User : User[],
    Header : Header,
};
export interface Response {
    User : User,
    isFullFilled : boolean
}
export interface LocalStoreResponse {
    User : User, 
    Token : any,
    isOk : boolean
}
export interface ResponseSigninTokenDto {
    isOk : boolean,
    token : string,
    refreshToken : string
};

export const LocalStoreInformations = (): LocalStoreResponse => {
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    if (user && token) {
    const userObj = JSON.parse(user);
    return {
        User: userObj,
        Token: `Bearer ${token}`,
        isOk: true,
        };
    }
    return {
        isOk: false,
        Token: "",
        User: {} as User
    };
};

export interface ISignin {
    userName: string;
    password: string;
}
export interface User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    age: number;
    country:string;
    email:string,
    roles: string[];
}
export interface UpdateUser {
    id: number;
    userName? : string;
    firstName? : string;
    lastName? : string;
    age? : number;
    country? :string;
    email? :string,
    roles? : string[];
}






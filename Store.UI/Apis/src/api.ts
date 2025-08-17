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
export interface ResponseSigninTokenDto {
    token : string,
    refreshToken : Date
};
export interface LocalStoreResponse extends ResponseSigninTokenDto , RefreshToken {
    User : User,
    isOk : boolean
}
export interface RefreshToken {
    id : number,
}

export const LocalStoreInformations = (): LocalStoreResponse => {
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    if (user && token) {
    const userObj : User = JSON.parse(user);
    const tokenDetail : ResponseSigninTokenDto = JSON.parse(token);
    return {
        User: userObj,
        token: `${tokenDetail.token}`,
        refreshToken : tokenDetail.refreshToken,
        isOk : true,
        id : userObj.id
        };
    }
    return {
        id : -1,
        isOk : false,
        token: "Error",
        refreshToken : new Date(),
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






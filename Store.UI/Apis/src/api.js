;
;
;
export const LocalStoreInformations = () => {
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
        User: {}
    };
};

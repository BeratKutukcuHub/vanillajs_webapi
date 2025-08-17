;
;
;
export const LocalStoreInformations = () => {
    const user = localStorage.getItem("User");
    const token = localStorage.getItem("Token");
    if (user && token) {
        const userObj = JSON.parse(user);
        const tokenDetail = JSON.parse(token);
        return {
            User: userObj,
            token: `${tokenDetail.token}`,
            refreshToken: tokenDetail.refreshToken,
            isOk: true,
            id: userObj.id
        };
    }
    return {
        id: -1,
        isOk: false,
        token: "Error",
        refreshToken: new Date(),
        User: {}
    };
};

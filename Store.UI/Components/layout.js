import {Footer} from "../Components/footer.js"
import {Header} from "../Components/header.js"


const LocalStorageCheck = () => {
    const userCheck = localStorage.getItem("User");
    const userValues = JSON.parse(userCheck);
    if(userCheck !== null){
        return {
            check : true,
            user : userValues 
        }
    }
    else return {
        check : false,
        user : null
    }
};
export const Layout = (content) => 
{
    if(LocalStorageCheck().check){
        return  {
            page : `${Header().login}
            <main class="container" id="container">${content}</main>
            ${Footer()}`,
            check : LocalStorageCheck()
        }
    }
    else return {
        page : `${Header().default}
        <main class="container" id="container">${content}</main>
        ${Footer()}`,
        check : LocalStorageCheck()
    }
}
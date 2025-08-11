import {Footer} from "../Components/footer.js"
import {Header} from "../Components/header.js"

export const Layout = (content) => 
{
    return `${Header()}
    <main>${content}</main>
    ${Footer()}`
}
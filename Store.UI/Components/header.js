export const Header = () => {
    return {
        default : `<div class="navbar">
        <div class="navbar_base">
        <nav class="navbar_logo" style="cursor: pointer;"><a href="index.html" class="nav_logo"
         style="color :rgb(242, 188, 89); ">
        Todo</a><a href="index.html" class="nav_logo" style="color :rgb(169, 226, 113);">App</a></nav>    
        <nav class="navbar_detail">
            <div class="navbar_item"><h1><a href="#product">Ürünler</a></h1></div>
            <div class="navbar_item"><h1><a href="#signup">Kayıt Ol</a></h1></div>
            <div class="navbar_item"><h1><a href="#signin">Giriş Yap</a></h1></div>
        </nav>
        </div>
    </div>`,
        login : `<div class="navbar">
        <div class="navbar_base">
        <nav class="navbar_logo" style="cursor: pointer;"><a href="index.html" class="nav_logo"
         style="color :rgb(242, 188, 89); ">
        Todo</a><a href="index.html" class="nav_logo" style="color :rgb(169, 226, 113);">App</a></nav>    
        <nav class="navbar_detail">
            <div class="navbar_item" id="userName"><h1></h1></div> 
            <div class="navbar_item"><h1><a href="#product">Ürünler</a></h1></div>
            <div class="navbar_item"><h1><a href="#admin" id="admin">Admin Panel</a></h1></div>
            <div class="navbar_item"><h1><a class="logout" id="logout">Çıkış Yap</a></h1></div>
        </nav>
        </div>
    </div>`
    }
}
const documentSolver = () => {
    const logout = document.getElementById("logout");
        if(logout !== undefined){
        return {
        isLogin : true,
        logout : logout
        };}
        else {
            return {
                isLogin : false
            };
        }
}
export const TopMargin = () =>{
    const navbar = document.getElementsByClassName("navbar")[0];
    return navbar.scrollHeight;
} 
export const Logout = () => {
    if(documentSolver().isLogin){
        documentSolver().logout?.addEventListener("click",(event)=> {
        event.preventDefault();
        localStorage.clear("User");
        window.location.href = "http://127.0.0.1:5500/Store.UI/index.html";
        })
    }
} 


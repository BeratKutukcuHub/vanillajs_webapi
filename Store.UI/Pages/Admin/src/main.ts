import { UpdateUser, User } from "../../Signin/src/main";
export const AdminPanel = () => {
    return `
    <main class="userlist_container">
        <div class="userlist_cart_container">
            
        </div>
        <div class="userlist_buttonGroup"></div>
    </main>`;
}
interface Header {
    TotalSize: number,
    TotalPage : number
};
interface PaginationResponse {
    User : User[],
    Header : Header,
};
interface Response {
    User : User,
    isFullFilled : boolean
}
export const FetchNewToken = async () => {
    const localUserInformation = LocalStoreUserInfo();
    if(localUserInformation.isFullFilled){
        const userInfo = localUserInformation.user;
        const user = await fetch(`https://localhost:7230/Auth/Signin`,{
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(userInfo),
        })
        if(!user.ok) return;
        const token  = await user.json();
        return token.token;
    }
}
const capitalize = (value: string): string => {
    return value
        .toLowerCase()                     
        .replace(/^\w/, c => c.toUpperCase()); 
};

export const NormalizeUser = (user: User): User => {
    console.log(user);
    return {
        ...user,
        firstName: capitalize(user.firstName??""),
        lastName: capitalize(user.lastName??""),
        userName: capitalize(user.userName??""),
    };
};
const DeleteUserForAdmin = async (id : number) : Promise<string> => {
    const fetchDeleteUser = await fetch(`https://localhost:7230/User/${id}`,{
        method : "DELETE",
        headers : {
            "Content-type" : "application/json",
            "Authorization" : LocalStoreUserInfo().token?? ""
        }
    });
    if(!fetchDeleteUser.ok) return "401";
    const text : string = await fetchDeleteUser.text();
    return text;
}
const LocalStoreUserInfo = () => {
    const localStore = localStorage.getItem("User");
    const localStoreToken = localStorage.getItem("Token");

    if(localStore !== null && localStoreToken !== null){
        return {
            isFullFilled : true,
            token : localStoreToken,
            user : localStore
        };
    }
    else return {
        isFullFilled : false
    };
}
const FetchUpdateGenerate = async (User : UpdateUser)  => {
    const userInformation = User;
    const tokenDetail = LocalStoreUserInfo();
    console.log(tokenDetail);
    if(tokenDetail.isFullFilled && tokenDetail.token){
        const putResponse = await fetch("https://localhost:7230/User",{
        method : "PUT",
        body : JSON.stringify(userInformation),
        headers : {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${tokenDetail.token}`
            }
        });
        if(!putResponse.ok) return {
            User : await putResponse.json(),
            isFullFilled : false
        };
        else return {
            User : await putResponse.json(),
            isFullFilled : true
        };
    }
    
}
const FetchUserGenerate = async ( pageNumber: number = 0 ) => {
    const localStore = LocalStoreUserInfo();
    if(localStore.isFullFilled && localStore.token){
        const userInfos = await fetch(`https://localhost:7230/User?PageSize=20&PageNumber=${pageNumber}`,{
        method : "GET",
        headers : {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${localStore.token}`
            }
        });
        if(!userInfos.ok){
            const newToken = await FetchNewToken();
        }
        const users : User[] = await userInfos.json();
        const headerGetPagination = userInfos.headers.get("x-pagination") ?? "";
        const header : Header = JSON.parse(headerGetPagination);  
        const response : PaginationResponse = {
            User : users,
            Header : header
        }
        return response;
    }
}

const HeaderAndPagination = async (Header : Header, activePage : number = 0) => {
    const button_group_container = document.getElementsByClassName("userlist_buttonGroup")[0];
    button_group_container.innerHTML = "";
    
    if(Header !== undefined){
        for(let index = 0; index <= Header.TotalPage-1; index++){
            const button = document.createElement("button");
            button.classList.add("userlist_button");
            button.innerText = (index + 1).toString();
            button.dataset.page = index.toString();

            if (index === activePage) {
                button.classList.add("active");
            }

            button.addEventListener("click", async (event)=> {
                const buttons = button_group_container.getElementsByClassName("userlist_button");
                Array.from(buttons).forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                event.preventDefault();
                const inform = await FetchUserGenerate(index);
                if(inform?.User)
                await UserAndPagination(inform?.User)
            });
            button_group_container.appendChild(button);
        }
        
    }
    
}
const UpdateUserForAdmin  = (id : number) => {
    let isUpdate : boolean = false;
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if(target.classList.contains("update")){
            const parent = target.parentElement;
            const card = target.closest(".userlist_cart_container") as HTMLElement;
            const content = card.innerHTML;
            isUpdate = !isUpdate;

            if(isUpdate){
                card.innerHTML = `<form class="update_container">
                <div class="update_content">
                    <label>Kullanıcı Adı : </label>
                    <input name="userName" type="text">
                </div>
                <div class="update_content">
                    <label>İsim : </label>
                    <input name="firstName" type="text">
                </div>
                <div class="update_content">
                    <label>Soyisim : </label>
                    <input name="lastName" type="text">
                </div>
                <div class="update_content">
                    <label>Şifre : </label>
                    <input name="password" type="password">
                </div>
                <div class="update_content">
                    <label>E-mail : </label>
                    <input name="email" type="email">
                </div>
                <div class="update_content">
                    <label>Yaş : </label>
                    <input name="age" type="number">
                </div>
                
                <div class="update_button_group">
                    <button class="apply">Onayla</button>
                    <button class="close">Kapat</button>
                </div>
                </form>`

                document.addEventListener("click",async function innerEvent(event) {
                    const target = event.target as HTMLElement;
                    if(target.classList.contains("close")){
                        isUpdate = !isUpdate;
                        card.innerHTML = content;
                    }
                    let userUpdateForAdmin : UpdateUser & Partial<UpdateUser> = {id : id};
                    if(target.classList.contains("apply")) {
                    event.preventDefault();
                    const inputs = card.querySelectorAll("input");
                    inputs.forEach(input => {
                        userUpdateForAdmin = {
                            ...userUpdateForAdmin,
                            [input.name as keyof UpdateUser] : input.value
                        }
                    });
                    const fetchUpdate = await FetchUpdateGenerate(userUpdateForAdmin);
                    if(fetchUpdate?.isFullFilled)
                    {
                        const user = NormalizeUser(userUpdateForAdmin as User);
                        card.innerHTML = ContentDisplay(user);
                    }
                    }
                })
            }
        }

    })
}

const ContentDisplay = (user : User) => {
    return `
    <div class="userlist_content"><h4>Id : </h4> <h5>${user.id}</h5></div>
        <div class="userlist_content"><h4>Kullanıcı Adı : </h4> <h5>${user.userName}</h5></div>
        <div class="userlist_content"><h4>Email : </h4> <h5 class="userlist_content_email">${user.email}</h5></div>
        <div class="userlist_content"><h4>Yaş : </h4> <h5>${user.age}</h5></div>
        <div class="userlist_content"><h4>İsim : </h4> <h5>${user.firstName}</h5></div>
        <div class="userlist_content"><h4>Soyisim : </h4> <h5>${user.lastName}</h5></div>

        <div style="display: flex; justify-content: space-between; width: 100%;">
        <button class="userlist_adminbutton update" data-index=${user.id} style="background-color:
         rgb(212, 171, 94); cursor:pointer;">Güncelle</button>

        <button class="userlist_adminbutton delete" id="delete" data-index=${user.id} style="background-color:
         rgb(177, 53, 53); cursor:pointer;">Sil</button>
        </div>
    `
}
const UserAndPagination = async (User : User[]) => {
    const userlist_cart_container = document.getElementsByClassName("userlist_cart_container")[0];
    userlist_cart_container.innerHTML = "";
    
    User.forEach(user => {
        const userlist_cart = document.createElement("div");
        userlist_cart.classList.add("userlist_cart");
        const cart_div = document.createElement("div");
        cart_div.classList.add("userlist_cart_container");
        cart_div.dataset.id = user.id.toString();
        cart_div.innerHTML += ContentDisplay(user); 
        UpdateUserForAdmin(user.id);
        userlist_cart.appendChild(cart_div);

        document.addEventListener("click", async(event)=>{
            const target = event.target as HTMLElement;
            if(target.classList.contains("delete")){
                const id = target.dataset.index?.toString();
                if(id){
                    const response = await DeleteUserForAdmin(parseInt(id));
                    if(!response.includes("401")){
                    }
                }
            }
        });
        userlist_cart_container.appendChild(userlist_cart);
    });
}

export const PaginationStarter = async () => {
    const fetchUser = await FetchUserGenerate();
    if (fetchUser?.Header) {
            HeaderAndPagination(fetchUser.Header);
    }
    if (fetchUser?.User) {
            UserAndPagination(fetchUser.User);
    }
}
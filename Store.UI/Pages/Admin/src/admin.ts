import { UpdateUser, User } from "../../../Apis/src/api.js";
import { UserCreate } from "../../../Apis/src/usercreate.js";
import { GetUserById } from "../../../Apis/src/usergetbyid.js";
import { UserRemoveById } from "../../../Apis/src/userremove.js";
import {GetUsersByPagination} from "../../../Apis/src/usersget.js";
import { UserUpdate } from "../../../Apis/src/userupdate.js";

export const AdminPage = () => {
    return `
    <main class="userlist_container">
        <button class="userlist_container_createUser">+ EKLE</button>
        <div class="userlist_cart_container">
            
        </div>
        <div class="userlist_buttonGroup"></div>
    </main>`;
}

export const UserDetailPage = () => {
    return `
    <div class="detail_container">
        <div class="detail_item">
            
        </div>
    </div>
    `
}

export const UserCreatePage = () => {
    return `
    <form class="usercreate_base_container">
        <div class="usercreate_container">
            <div class="usercreate_content">
                <h5>Kullanıcı Adı</h5>
                <input type="text" name="userName"> 
            </div>
            <div class="usercreate_content">
                <h5>Kullanıcı İsmi</h5>
                <input type="text" name="firstName"> 
            </div>
            <div class="usercreate_content">
                <h5>Kullanıcı Soyismi</h5>
                <input type="text" name="lastName"> 
            </div>
            <div class="usercreate_content">
                <h5>Kullanıcı Şifresi</h5>
                <input type="text" name="password"> 
            </div>
            <div class="usercreate_content">
                <h5>Kullanıcı Email Bilgisi</h5>
                <input type="text" name="email"> 
            </div>
            <div class="usercreate_content">
                <h5>Kullanıcı Yaşı</h5>
                <input type="number" max=99 min=17 name="age"> 
            </div>
            <div class="usercreate_content">
                <input type="checkbox" name="role" value="admin" class="usercreate_content_checkbox">
                <label>Admin</label>               
            </div>
        </div>
        <div class="usercreate_buttongroup">
            <button id="usercreate_apply" type="submit">Onayla</button>
            <button id="usercreate_cancel">Geri Dön</button>
        </div>
    </form>
    `
}
    
export const UserCreateController = () => {
    const usercreate_content = document.getElementsByClassName("usercreate_content");
    const usercreate_apply = document.getElementById("usercreate_apply");
    usercreate_apply?.addEventListener("click",async (event)=>{
        event.preventDefault();
        let userCreateDto : UserCreate = {} as UserCreate;
        Array.from(usercreate_content).forEach((usercreate) => {
        const usercreate_input = usercreate.getElementsByTagName("input")[0];
        const {name , value} = usercreate_input;
        const valueManipulation = value === "admin"? ["User"] : value;
        userCreateDto = {
            ...userCreateDto,
            [name] : valueManipulation
        };
    });
    await UserCreate(userCreateDto);
    })
}

const UserCreateLocalication = () => {
    // const userlist_container = document.getElementsByClassName("userlist_container")[0];
    // const userlist_container_createUser = document.createElement("button");
    // userlist_container_createUser.classList.add("userlist_container_createUser");
    // userlist_container_createUser.textContent = "+ EKLE"
    document.getElementsByClassName("userlist_container_createUser")[0].addEventListener("click",()=> {
        window.location.hash = "#Admin/UserCreate";
    });
}
const UsersAndPaginationInformations = async (pageNumber :number = 0) => {
    UserCreateLocalication();
    const page = await GetUsersByPagination(pageNumber,21);
    await UserCartElement(page.Users);
    await PaginationButtonGroup(page.Header.TotalPage,pageNumber == 0?1: pageNumber);
}

const UserDetail = async () => {
    document.addEventListener("click",async (event)=> {
        const target = event.target as HTMLElement;
        const targetClass = target.classList;
        if(targetClass.contains("userlist_cart")){
            const id = target.dataset.id;
            if(id){
                window.location.hash = `#User/${id}`;
            }
        }
    })
}

export const UserDetailInformations = (User : User) => {
    const detail_item = document.getElementsByClassName("detail_item")[0];
    detail_item.innerHTML = `
     <div class="detail_item_content">
                <div class="detail_label">
                    <label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
                 corporis qui necessitatibus, maiores dignissimos
                  voluptatum delectus, omnis corrupti
                   vero totam atque eos distinctio.
                    Aliquam fugiat enim, magni minus odio debitis!</label>
        </div>
    </div>
    <div class="detail_item_content"><h4>Id *</h4> <h5>${User.id}</h5></div>
    <div class="detail_item_content"><h4>Kullanıcı Adı  : </h4> <h5>${User.userName}</h5></div>
    <div class="detail_item_content"><h4>İsmi : </h4> <h5>${User.firstName}</h5></div>
    <div class="detail_item_content"><h4>Soyismi : </h4> <h5>${User.lastName}</h5></div>
    <div class="detail_item_content"><h4>Ülkesi : </h4> <h5>${User.country}</h5></div>
    <div class="detail_item_content"><h4>E-Mail Adres :  *</h4> <h5>${User.email}</h5></div>
    <div class="detail_item_content"><h4>Roller : </h4> <h5>${User.roles.map((role => `${role}`))}</h5></div>
    `
}


const UserCartElement = async (Users : User[]) => {
    const userlist_cart_container = document.getElementsByClassName("userlist_cart_container")[0];
    userlist_cart_container.innerHTML = "";
    Users.forEach((user,index) => 
    {
        const userlist_cart = document.createElement("div");
        userlist_cart.classList.add("userlist_cart");
        userlist_cart.dataset.cartId = index.toString();
        userlist_cart.dataset.id = user.id.toString();
        userlist_cart.innerHTML += 
        `
            <div class="userlist_content"><h4>Id : </h4> <h5>${user.id}</h5></div>
            <div class="userlist_content"><h4>Kullanıcı Adı : </h4> <h5>${user.userName}</h5></div>
            <div class="userlist_content"><h4>Ad Soyad : </h4> <h5>${user.firstName + " " + user.lastName}</h5></div>
            <div class="userlist_content"><h4>Email : </h4> <h5>${user.email}</h5></div>
            <div class="userlist_content"><h4>Yaş : </h4> <h5>${user.age}</h5></div>
            <div class="userlist_content"><h4>Roles : </h4> <h5>${user.roles.map(role => role).join(", ")}</h5></div>
            <hr>
            <div class="update_button_group">
                <button class="update_button" data-cart-id=${index} data-id=${user.id}>Güncelle</button>
                <button class="delete_button" data-cart-id=${index} data-id=${user.id}>Sil</button>
            </div>
        `;
        userlist_cart_container.appendChild(userlist_cart);
    });
    
}
const PaginationButtonGroup = async (totalPage : number = 0, activePage : number = 1) => {
    const userlist_buttonGroup = document.getElementsByClassName("userlist_buttonGroup")[0];
    userlist_buttonGroup.innerHTML = "";
    for(let page = 1; page<=totalPage-1; page++){
        
        if(page == activePage)
            userlist_buttonGroup.innerHTML += `<button class="userlist_button active">${page}</button>`;
        else
        userlist_buttonGroup.innerHTML += `<button class="userlist_button">${page}</button>`;
    }
}
const PaginationButtonEvent = () => {
    document.addEventListener("click" , async (event) => {
        const target = event.target as HTMLElement;
        const isTarget : boolean = target.classList.contains("userlist_button");
        if(isTarget){
            await UsersAndPaginationInformations(parseInt(target.innerText));
        }
    });
}
const RefreshListAndPage = () : number => {
    const buttons = document.getElementsByClassName("userlist_button");
    let pageNumber : number;
    Array.from(buttons).forEach(async (button) => {
        const buttonType = button as HTMLElement; 
        const activeButton = buttonType.classList.contains("active");
        if(activeButton){
            pageNumber =  parseInt(buttonType.innerText);
        }
    });
    pageNumber = 0;
    return pageNumber;
}
const CartButton = () => {
    document.addEventListener("click",async (event)=> {
        const target = event.target as HTMLElement;
        if(target.classList.contains("update_button")){
            const cartid = target.dataset.cartId;
            const id = target.dataset.id;
            if(cartid && id){
            await CartUpdateForm(parseInt(cartid),parseInt(id));
            
        }
        }
        else if(target.classList.contains("delete_button")){
            const id = target.dataset.id;
            if(id)
            await UserRemoveById(parseInt(id));
            const pageNumber =  RefreshListAndPage();
            await UsersAndPaginationInformations(pageNumber);
        }
    })
}

const CartUpdateForm = async (cartId : number ,Id : number) => {
    const content = document.getElementsByClassName("userlist_cart")[cartId];
    const oldContent = content.innerHTML;
    content.innerHTML = "";

    content.innerHTML = `
            <div class="userlist_content"><h4>Kullanıcı Adı : </h4> <input class="userlist_update_input" name="userName">
            </input></div>
            <div class="userlist_content"><h4>Ad : </h4> <input name="firstName" class="userlist_update_input">
            </input></div>
            <div class="userlist_content"><h4>Soyad : </h4> <input name="lastName" class="userlist_update_input">
            </input></div>
            <div class="userlist_content"><h4>Age : </h4> <input name="age" class="userlist_update_input">
            </input></div>
            <div class="userlist_content"><h4>Email : </h4> <input name="email" class="userlist_update_input">
            </input></div>
            <hr>
            <div class="update_button_group">
                <button class="apply_button" data-cart-id=${cartId} data-id=${Id}>Onayla</button>
                <button class="close_button" data-cart-id=${cartId} data-id=${Id}>Kapat</button>
            </div>`;
    await UserUpdateApply(Id, content);
    content.getElementsByClassName("close_button")[0].addEventListener("click",(event)=>{
        event.preventDefault();
        content.innerHTML = oldContent;
    } );
}

const UserUpdateApply = async (Id : number, element : Element) => {
    const targetUpdateButton = element.getElementsByClassName("apply_button")[0];
    targetUpdateButton.addEventListener("click", async () =>{
        let updateObj : UpdateUser = {id : Id}
        const updateValues = document.getElementsByClassName("userlist_update_input");
        Array.from(updateValues).forEach(updated => {
            const updater  = updated as HTMLInputElement;
            updateObj = {
                ...updateObj,
                [updater.name] : updater.value
            };
            
        });
        await UserUpdate(updateObj);
        await RefreshListAndPage();
    });
}

export const AdminController = async () => {
    await UsersAndPaginationInformations();
    PaginationButtonEvent();
    CartButton();
    UserDetail();
}
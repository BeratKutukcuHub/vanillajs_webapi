var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserCreate } from "../../../Apis/src/usercreate.js";
import { UserRemoveById } from "../../../Apis/src/userremove.js";
import { GetUsersByPagination } from "../../../Apis/src/usersget.js";
import { UserUpdate } from "../../../Apis/src/userupdate.js";
export const AdminPage = () => {
    return `
    <main class="userlist_container">
        <button class="userlist_container_createUser">+ EKLE</button>
        <div class="userlist_cart_container">
            
        </div>
        <div class="userlist_buttonGroup"></div>
    </main>`;
};
export const UserDetailPage = () => {
    return `
    <div class="detail_container">
        <div class="detail_item">
            
        </div>
    </div>
    `;
};
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
    `;
};
export const UserCreateController = () => {
    const usercreate_content = document.getElementsByClassName("usercreate_content");
    const usercreate_apply = document.getElementById("usercreate_apply");
    usercreate_apply === null || usercreate_apply === void 0 ? void 0 : usercreate_apply.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        let userCreateDto = {};
        Array.from(usercreate_content).forEach((usercreate) => {
            const usercreate_input = usercreate.getElementsByTagName("input")[0];
            const { name, value } = usercreate_input;
            const valueManipulation = value === "admin" ? ["User"] : value;
            userCreateDto = Object.assign(Object.assign({}, userCreateDto), { [name]: valueManipulation });
        });
        yield UserCreate(userCreateDto);
    }));
};
const UserCreateLocalication = () => {
    // const userlist_container = document.getElementsByClassName("userlist_container")[0];
    // const userlist_container_createUser = document.createElement("button");
    // userlist_container_createUser.classList.add("userlist_container_createUser");
    // userlist_container_createUser.textContent = "+ EKLE"
    document.getElementsByClassName("userlist_container_createUser")[0].addEventListener("click", () => {
        window.location.hash = "#Admin/UserCreate";
    });
};
const UsersAndPaginationInformations = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageNumber = 0) {
    UserCreateLocalication();
    const page = yield GetUsersByPagination(pageNumber, 21);
    yield UserCartElement(page.Users);
    yield PaginationButtonGroup(page.Header.TotalPage, pageNumber == 0 ? 1 : pageNumber);
});
const UserDetail = () => __awaiter(void 0, void 0, void 0, function* () {
    document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        const targetClass = target.classList;
        if (targetClass.contains("userlist_cart")) {
            const id = target.dataset.id;
            if (id) {
                window.location.hash = `#User/${id}`;
            }
        }
    }));
});
export const UserDetailInformations = (User) => {
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
    `;
};
const UserCartElement = (Users) => __awaiter(void 0, void 0, void 0, function* () {
    const userlist_cart_container = document.getElementsByClassName("userlist_cart_container")[0];
    userlist_cart_container.innerHTML = "";
    Users.forEach((user, index) => {
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
});
const PaginationButtonGroup = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (totalPage = 0, activePage = 1) {
    const userlist_buttonGroup = document.getElementsByClassName("userlist_buttonGroup")[0];
    userlist_buttonGroup.innerHTML = "";
    for (let page = 1; page <= totalPage - 1; page++) {
        if (page == activePage)
            userlist_buttonGroup.innerHTML += `<button class="userlist_button active">${page}</button>`;
        else
            userlist_buttonGroup.innerHTML += `<button class="userlist_button">${page}</button>`;
    }
});
const PaginationButtonEvent = () => {
    document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        const isTarget = target.classList.contains("userlist_button");
        if (isTarget) {
            yield UsersAndPaginationInformations(parseInt(target.innerText));
        }
    }));
};
const RefreshListAndPage = () => {
    const buttons = document.getElementsByClassName("userlist_button");
    let pageNumber;
    Array.from(buttons).forEach((button) => __awaiter(void 0, void 0, void 0, function* () {
        const buttonType = button;
        const activeButton = buttonType.classList.contains("active");
        if (activeButton) {
            pageNumber = parseInt(buttonType.innerText);
        }
    }));
    pageNumber = 0;
    return pageNumber;
};
const CartButton = () => {
    document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        const target = event.target;
        if (target.classList.contains("update_button")) {
            const cartid = target.dataset.cartId;
            const id = target.dataset.id;
            if (cartid && id) {
                yield CartUpdateForm(parseInt(cartid), parseInt(id));
            }
        }
        else if (target.classList.contains("delete_button")) {
            const id = target.dataset.id;
            if (id)
                yield UserRemoveById(parseInt(id));
            const pageNumber = RefreshListAndPage();
            yield UsersAndPaginationInformations(pageNumber);
        }
    }));
};
const CartUpdateForm = (cartId, Id) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield UserUpdateApply(Id, content);
    content.getElementsByClassName("close_button")[0].addEventListener("click", (event) => {
        event.preventDefault();
        content.innerHTML = oldContent;
    });
});
const UserUpdateApply = (Id, element) => __awaiter(void 0, void 0, void 0, function* () {
    const targetUpdateButton = element.getElementsByClassName("apply_button")[0];
    targetUpdateButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        let updateObj = { id: Id };
        const updateValues = document.getElementsByClassName("userlist_update_input");
        Array.from(updateValues).forEach(updated => {
            const updater = updated;
            updateObj = Object.assign(Object.assign({}, updateObj), { [updater.name]: updater.value });
        });
        yield UserUpdate(updateObj);
        yield RefreshListAndPage();
    }));
});
export const AdminController = () => __awaiter(void 0, void 0, void 0, function* () {
    yield UsersAndPaginationInformations();
    PaginationButtonEvent();
    CartButton();
    UserDetail();
});

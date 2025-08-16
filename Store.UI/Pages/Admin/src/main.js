var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const AdminPanel = () => {
    return `
    <main class="userlist_container">
        <div class="userlist_cart_container">
            
        </div>
        <div class="userlist_buttonGroup"></div>
    </main>`;
};
;
;
export const FetchNewToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const localUserInformation = LocalStoreUserInfo();
    if (localUserInformation.isFullFilled) {
        const userInfo = localUserInformation.user;
        const user = yield fetch(`https://localhost:7230/Auth/Signin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userInfo),
        });
        if (!user.ok)
            return;
        const token = yield user.json();
        return token.token;
    }
});
const capitalize = (value) => {
    return value
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());
};
export const NormalizeUser = (user) => {
    var _a, _b, _c;
    console.log(user);
    return Object.assign(Object.assign({}, user), { firstName: capitalize((_a = user.firstName) !== null && _a !== void 0 ? _a : ""), lastName: capitalize((_b = user.lastName) !== null && _b !== void 0 ? _b : ""), userName: capitalize((_c = user.userName) !== null && _c !== void 0 ? _c : "") });
};
const DeleteUserForAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const fetchDeleteUser = yield fetch(`https://localhost:7230/User/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": (_a = LocalStoreUserInfo().token) !== null && _a !== void 0 ? _a : ""
        }
    });
    if (!fetchDeleteUser.ok)
        return "401";
    const text = yield fetchDeleteUser.text();
    return text;
});
const LocalStoreUserInfo = () => {
    const localStore = localStorage.getItem("User");
    const localStoreToken = localStorage.getItem("Token");
    if (localStore !== null && localStoreToken !== null) {
        return {
            isFullFilled: true,
            token: localStoreToken,
            user: localStore
        };
    }
    else
        return {
            isFullFilled: false
        };
};
const FetchUpdateGenerate = (User) => __awaiter(void 0, void 0, void 0, function* () {
    const userInformation = User;
    const tokenDetail = LocalStoreUserInfo();
    console.log(tokenDetail);
    if (tokenDetail.isFullFilled && tokenDetail.token) {
        const putResponse = yield fetch("https://localhost:7230/User", {
            method: "PUT",
            body: JSON.stringify(userInformation),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${tokenDetail.token}`
            }
        });
        if (!putResponse.ok)
            return {
                User: yield putResponse.json(),
                isFullFilled: false
            };
        else
            return {
                User: yield putResponse.json(),
                isFullFilled: true
            };
    }
});
const FetchUserGenerate = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageNumber = 0) {
    var _a;
    const localStore = LocalStoreUserInfo();
    if (localStore.isFullFilled && localStore.token) {
        const userInfos = yield fetch(`https://localhost:7230/User?PageSize=20&PageNumber=${pageNumber}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStore.token}`
            }
        });
        if (!userInfos.ok)
            const users = yield userInfos.json();
        const headerGetPagination = (_a = userInfos.headers.get("x-pagination")) !== null && _a !== void 0 ? _a : "";
        const header = JSON.parse(headerGetPagination);
        const response = {
            User: users,
            Header: header
        };
        return response;
    }
});
const HeaderAndPagination = (Header_1, ...args_1) => __awaiter(void 0, [Header_1, ...args_1], void 0, function* (Header, activePage = 0) {
    const button_group_container = document.getElementsByClassName("userlist_buttonGroup")[0];
    button_group_container.innerHTML = "";
    if (Header !== undefined) {
        for (let index = 0; index <= Header.TotalPage - 1; index++) {
            const button = document.createElement("button");
            button.classList.add("userlist_button");
            button.innerText = (index + 1).toString();
            button.dataset.page = index.toString();
            if (index === activePage) {
                button.classList.add("active");
            }
            button.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
                const buttons = button_group_container.getElementsByClassName("userlist_button");
                Array.from(buttons).forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                event.preventDefault();
                const inform = yield FetchUserGenerate(index);
                if (inform === null || inform === void 0 ? void 0 : inform.User)
                    yield UserAndPagination(inform === null || inform === void 0 ? void 0 : inform.User);
            }));
            button_group_container.appendChild(button);
        }
    }
});
const UpdateUserForAdmin = (id) => {
    let isUpdate = false;
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("update")) {
            const parent = target.parentElement;
            const card = target.closest(".userlist_cart_container");
            const content = card.innerHTML;
            isUpdate = !isUpdate;
            if (isUpdate) {
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
                </form>`;
                document.addEventListener("click", function innerEvent(event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const target = event.target;
                        if (target.classList.contains("close")) {
                            isUpdate = !isUpdate;
                            card.innerHTML = content;
                        }
                        let userUpdateForAdmin = { id: id };
                        if (target.classList.contains("apply")) {
                            event.preventDefault();
                            const inputs = card.querySelectorAll("input");
                            inputs.forEach(input => {
                                userUpdateForAdmin = Object.assign(Object.assign({}, userUpdateForAdmin), { [input.name]: input.value });
                            });
                            const fetchUpdate = yield FetchUpdateGenerate(userUpdateForAdmin);
                            if (fetchUpdate === null || fetchUpdate === void 0 ? void 0 : fetchUpdate.isFullFilled) {
                                const user = NormalizeUser(userUpdateForAdmin);
                                card.innerHTML = ContentDisplay(user);
                            }
                        }
                    });
                });
            }
        }
    });
};
const ContentDisplay = (user) => {
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
    `;
};
const UserAndPagination = (User) => __awaiter(void 0, void 0, void 0, function* () {
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
        document.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const target = event.target;
            if (target.classList.contains("delete")) {
                const id = (_a = target.dataset.index) === null || _a === void 0 ? void 0 : _a.toString();
                if (id) {
                    const response = yield DeleteUserForAdmin(parseInt(id));
                    if (!response.includes("401")) {
                    }
                }
            }
        }));
        userlist_cart_container.appendChild(userlist_cart);
    });
});
export const PaginationStarter = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchUser = yield FetchUserGenerate();
    if (fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.Header) {
        HeaderAndPagination(fetchUser.Header);
    }
    if (fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.User) {
        UserAndPagination(fetchUser.User);
    }
});

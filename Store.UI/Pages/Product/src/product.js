var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetUsersByPagination } from "../../../Apis/src/usersget.js";
export const ProductPage = () => {
    return `
    <div class="product_base_container">
        <div class="product_container">
        
        </div>
    </div>`;
};
const RandomValue = (min, max) => Math.random() * (max - min) + min;
const ProductInformation = () => __awaiter(void 0, void 0, void 0, function* () {
    const colors = ["Red", "Blue", "Black", "Pink", "Orange", "Yellow", "Green", "Purple", "White"];
    const product_container = document.getElementsByClassName("product_container")[0];
    product_container.innerHTML = "";
    const productList = yield ProductionFactory(20);
    productList.forEach(product => {
        const product_item = document.createElement("div");
        product_item.classList.add("product_item");
        product_item.innerHTML += `
            <div class="product_item_title">
                <img width="300" height="250" src="${product.photo}">
                <div class="product_item_content_title" >
                <h4 style="font-size: 1.2rem;">${product.User.userName}</h4></div>
            </div>
            <div class="product_item_description">
                <div><h5>Color : ${colors[parseInt(RandomValue(0, colors.length - 1).toFixed(1))]}</h5></div>
                <div><h5>Description : ${crypto.randomUUID()}</h5></div>
                <div><h5>Price : ${product.User.id * parseInt(RandomValue(100, 20000).toPrecision(5))}</h5></div>
            </div>`;
        product_container.appendChild(product_item);
    });
});
export const ProductController = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductInformation();
});
const apiKey = "0D40gBgCZE5NkJ7gkGAlQxg63HdR4tYbZvsfMXsNBJvzYD8IIQSber9b";
const PaginationNumbers = (header, activePage = 1) => {
    const product_base_container = document.getElementsByClassName("product_base_container")[0];
    const product_paginationGroup = document.createElement("div");
    product_paginationGroup.classList.add("product_paginationGroup");
    product_paginationGroup.innerHTML = "";
    for (let page = 1; page <= header.TotalPage; page++) {
        const button = document.createElement("button");
        button.textContent = String(page);
        button.className = page === activePage
            ? "product_pagination_active"
            : "product_pagination";
        button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
            yield ProductController();
        }));
        product_paginationGroup.appendChild(button);
        product_base_container.appendChild(product_paginationGroup);
    }
};
const ProductList = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageSize = 20, activePage = 0) {
    const usersForProducts = yield GetUsersByPagination(activePage - 1, pageSize);
    if (usersForProducts) {
        return usersForProducts;
    }
    throw new Error("The users was not found");
});
const RandomPhotos = (pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const contentPhoto = yield fetch(`https://api.pexels.com/v1/search?query=Product&Size=medium&per_page=${pageSize}`, {
        method: "GET",
        headers: {
            "Authorization": apiKey,
            "Content-type": "application/json"
        },
    });
    if (contentPhoto.ok) {
        const response = yield contentPhoto.json();
        return response;
    }
    throw new Error("The request is something wrong");
});
const ProductionFactory = (pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const [responseUser, responePhoto] = yield Promise.all([
        ProductList(pageSize),
        RandomPhotos(pageSize)
    ]);
    let productFactory = [];
    responseUser.Users.forEach((usersForProducts, index) => {
        const photo = responePhoto.photos[index];
        productFactory.push({
            photo: photo.src.medium,
            User: usersForProducts
        });
    });
    return productFactory;
});

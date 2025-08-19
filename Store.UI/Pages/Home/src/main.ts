export const Home = () => {
    return `<main class="cart_base_controller">
    
    <section class="cart_container">
        <div class="carts" >
            <div class="cart_item">
            </div>
            <div class="cart_number">
            </div>
            <div class="cart_section">
                <button id="prev"><<</button>
                <button id="next">>></button>
            </div>
        </div>
    </section>
    </main>`
}
export const HomeDom = () => {
    const cartNumber = document.getElementsByClassName("cart_number");
const ImagePathGenerate = (...path : string[]) => {
    const listImages : string[] = [];
    path.forEach(path => {
        listImages.push(`./Files/Images/${path}`);
    });
    return listImages;
};
const images = ImagePathGenerate("image0.png", "image1.png", "image2.jpg", "image3.jpg", "image4.jpg");
images.forEach(image => {
    const number_item = document.createElement("div");
    number_item.classList.add("cart_number_item");
    cartNumber[0].appendChild(number_item);
});
const buttonNext = document.getElementById("next");
const buttonPrev = document.getElementById("prev");
const cart_img = document.getElementsByClassName("cart_item")[0];
const img = document.createElement("img");
img.src = images[0];
cart_img.appendChild(img);
const cart_item = document.getElementsByClassName("cart_number_item")[0].classList.add("active");
let activeNumber = 0;
const nextPrevButtonEvent = () => {
    const cart_item = document.getElementsByClassName("cart_number_item");
    activeNumber = activeNumber > cart_item.length - 1 ? 0 : activeNumber < 0 ? cart_item.length - 1 : activeNumber;
    Array.from(cart_item).forEach((item, index) => {
        index == activeNumber ? item.classList.add("active") : item.classList.remove("active");
    });
    if (cart_img.children.length != 0) {
        cart_img.removeChild(img);
    }
    img.src = images[activeNumber];
    cart_img.appendChild(img);
};
buttonNext === null || buttonNext === void 0 ? void 0 : buttonNext.addEventListener("click", (event) => {
    event.preventDefault();
    activeNumber++;
    nextPrevButtonEvent();
    cart_img.appendChild(img);
});
buttonPrev === null || buttonPrev === void 0 ? void 0 : buttonPrev.addEventListener("click", (event) => {
    event.preventDefault();
    activeNumber--;
    nextPrevButtonEvent();
});

}
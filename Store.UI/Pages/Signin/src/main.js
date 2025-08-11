export const Signin = () => {
    return `<section class="section">
        <form class="user_form">
            <div class="user_controller">
                <div class="user_div">
                <label>Adınız  </label>
                <input autocomplete="off" name="firstName" class="user_input" type="text" maxlength="10" minlength="3">
            </div>
            <div class="user_div">
                <label>Soyadınız  </label>
                <input autocomplete="off" name="lastName" class="user_input" type="text" maxlength="15" minlength="2">
            </div>
            <div class="user_div">
                <label>Kullanıcı Adı  </label>
                <input autocomplete="off" name="userName" class="user_input" type="text" maxlength="10" minlength="5">
            </div>
            <div class="user_div">
                <label>Yaş  </label>
                <input autocomplete="off" name="age" class="user_input" type="number" maxlength="1" max="99" min="18">
            </div>
            <div class="user_apply">
                <button id="user_button">ONAYLA</button>
            </div>
            </div>
        </form>
    </section>`;
};

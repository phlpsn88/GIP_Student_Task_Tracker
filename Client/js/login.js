// make variables for navigation login/register button
const loginButton = document.querySelector('#loginBtn')
const footerLoginButton = document.querySelector('#footerLoginBtn')


// make variables for overlay login/register form
const registerOverlay = document.querySelector('.overlay-register')
const loginOverlay = document.querySelector('.overlay-login')

// make variables for close login/register form
const closeRegister = document.querySelector('#closeBtnRegister')
const closeLogin = document.querySelector('#closeBtnLogin')

// make variables to switch from login/register to login/register
const registerLink = document.querySelector('#registerFormLink')
const loginLink = document.querySelector('#loginFormLink')

const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');


loginButton.addEventListener("click", function(){
    loginOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});

if (footerLoginButton) {
    footerLoginButton.addEventListener("click", function () {
        loginOverlay.style.display = "flex";
        document.body.classList.add("remove-scrolling");
    });

}

closeLogin.addEventListener("click", function(){
    loginOverlay.style.display = "none";
    loginForm.reset();
    document.getElementById("foutmeldingLogin").hidden = true;
    document.body.classList.remove("remove-scrolling");
});

registerLink.addEventListener("click", function(){
    loginForm.reset();
    document.getElementById("foutmeldingLogin").hidden = true;

    loginOverlay.style.display = "none";
    registerOverlay.style.display = "flex";
});

closeRegister.addEventListener("click", function(){
    registerOverlay.style.display = "none";
    registerForm.reset();
    document.getElementById("foutmeldingRegister").hidden = true;
    document.body.classList.remove("remove-scrolling");
});

loginLink.addEventListener("click", function(){
    registerForm.reset();
    document.getElementById("foutmeldingRegister").hidden = true;

    registerOverlay.style.display = "none";
    loginOverlay.style.display = "flex";
});

document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const input = document.getElementById(this.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            input.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }

        // Focus terugzetten zonder selectie
        input.focus();

        // Cursor achteraan plaatsen
        const lengte = input.value.length;
        input.setSelectionRange(lengte, lengte);
    });
});
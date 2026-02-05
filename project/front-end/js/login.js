// make variables for navigation login/register button
const registerButton = document.querySelector('#registerBtn')
const loginButton = document.querySelector('#loginBtn')

// make variables for overlay login/register form
const registerOverlay = document.querySelector('.overlay-register')
const loginOverlay = document.querySelector('.overlay-login')

// make variables for close login/register form
const closeRegister = document.querySelector('#closeBtnRegister')
const closeLogin = document.querySelector('#closeBtnLogin')

// make variables to switch from login/register to login/register
const registerLink = document.querySelector('#registerFormLink')
const loginLink = document.querySelector('#loginFormLink')



loginButton.addEventListener("click", function(){
    loginOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});

closeLogin.addEventListener("click", function(){
    loginOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});

registerLink.addEventListener("click", function(){
    loginOverlay.style.display = "none"
    registerOverlay.style.display = "flex"
});

closeRegister.addEventListener("click", function(){
    registerOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});

loginLink.addEventListener("click", function(){
    registerOverlay.style.display = "none"
    loginOverlay.style.display = "flex"
});

registerButton.addEventListener("click", function(){
    registerOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});


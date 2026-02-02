const loginButton = document.querySelector('#loginBtn')
const loginOverlay = document.querySelector('.overlay-login')
const closeLogin = document.querySelector('#closeBtnLogin')
const registerLink = document.querySelector('#registerFormLink')
const registerOverlay = document.querySelector('.overlay-register')
const closeRegister = document.querySelector('#closeBtnRegister')
const loginLink = document.querySelector('#loginFormLink')



loginButton.addEventListener("click", function(){
    loginOverlay.style.display = "flex"
});

closeLogin.addEventListener("click", function(){
    loginOverlay.style.display = "none"
});

registerLink.addEventListener("click", function(){
    loginOverlay.style.display = "none"
    registerOverlay.style.display = "flex"
});

closeRegister.addEventListener("click", function(){
    registerOverlay.style.display = "none"
});

loginLink.addEventListener("click", function(){
    registerOverlay.style.display = "none"
    loginOverlay.style.display = "flex"
});



const loginButton = document.querySelector('#loginBtn')
const loginOverlay = document.querySelector('.overlay')
const closeOverlay = document.querySelector('#closeBtn')


loginButton.addEventListener("click", function(){
    loginOverlay.style.display = "flex"
});

closeOverlay.addEventListener("click", function(){
    loginOverlay.style.display = "none"
});
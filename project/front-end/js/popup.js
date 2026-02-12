const newTaskButton = document.querySelector('.btn-new-task');
const newTaskOverlay = document.querySelector('.overlay-new-task')
const closeNewTask = document.querySelector('#closeNewTask')

newTaskButton.addEventListener("click", function(){
    newTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});


closeNewTask.addEventListener("click", function(){
    newTaskOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});
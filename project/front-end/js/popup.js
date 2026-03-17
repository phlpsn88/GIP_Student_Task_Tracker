const newTaskButton = document.querySelector('.btn-new-task');
const newTaskOverlay = document.querySelector('.overlay-new-task')
const closeNewTask = document.querySelector('#closeNewTask')
const datePicker = document.querySelector('#datePicker')
const editTaskOverlay = document.querySelector('.overlay-edit-task')


newTaskButton.addEventListener("click", function(){
    newTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");

    try{
        datePicker.showPicker();
    } catch(error) {
        console.log(error)
    }
});


closeNewTask.addEventListener("click", function(){
    newTaskOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});



editTaskOverlay.addEventListener("click", function(){
    editTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});

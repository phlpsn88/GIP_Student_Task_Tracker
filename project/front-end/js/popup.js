const newTaskButton = document.querySelector('.btn-new-task');
const newTaskOverlay = document.querySelector('.overlay-new-task')
const closeNewTask = document.querySelector('#closeNewTask')
const datePicker = document.querySelector('#datePicker')
const editTaskButton = document.querySelector('.btn-edit-task');
const pencilEdit = document.querySelector('#pencil-edit-task')
const editTaskOverlay = document.querySelector('#edit-task-overlay')
const closeEditTask = document.querySelector('.close-btn-task')

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



pencilEdit.addEventListener("click", function(){
    editTaskOverlay.style.display = "flex"
       document.body.classList.remove("remove-scrolling");
});

closeEditTask.addEventListener("click", function(){
    closeEditOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});
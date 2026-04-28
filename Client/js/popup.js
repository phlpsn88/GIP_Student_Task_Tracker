const newTaskButton = document.querySelector('.btn-new-task');
const newTaskOverlay = document.querySelector('.overlay-new-task')
const closeNewTask = document.querySelector('#closeNewTask')
const editTaskButton = document.querySelector('.btn-edit-task');
const editTaskOverlay = document.querySelector('#edit-task-overlay')
const closeEditTask = document.querySelector('#closeEditTask')
const deleteButtons = document.querySelectorAll(".btn-delete");
const deletePopup = document.getElementById("popup");


newTaskButton.addEventListener("click", function () {
    newTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});


closeNewTask.addEventListener("click", function () {
    newTaskOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});

editTaskButton.addEventListener("click", function () {
    editTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});

closeEditTask.addEventListener("click", function () {
    editTaskOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});


const iconsEdit = document.querySelectorAll("#pencil-edit-task");

iconsEdit.forEach(edit => {
    edit.addEventListener("click", function () {
        editTaskOverlay.style.display = "flex"
    });
});

deleteButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        deletePopup.style.display = "flex";
        document.body.classList.add("remove-scrolling");
    });
});

function closePopup() {
    deletePopup.style.display = "none";
    document.body.classList.remove("remove-scrolling");
}
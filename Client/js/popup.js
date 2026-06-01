const newTaskButton = document.querySelector('.btn-new-task');
const newTaskOverlay = document.querySelector('.overlay-new-task')
const closeNewTask = document.querySelector('#closeNewTask')
const deleteButtons = document.querySelectorAll(".btn-delete");
const deletePopup = document.getElementById("popup-delete");


newTaskButton.addEventListener("click", function () {
    newTaskOverlay.style.display = "flex"
    document.body.classList.add("remove-scrolling");
});


closeNewTask.addEventListener("click", function () {
    newTaskOverlay.style.display = "none"
    document.body.classList.remove("remove-scrolling");
});

const iconsEdit = document.querySelectorAll("#pencil-edit-task");

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
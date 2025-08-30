
const taskInput = document.getElementById('task-input');  
const btnAdd = document.getElementById('add-task-btn'); 
const taskList = document.getElementById('task-list');

function createTaskElement(taskText) {
    const list = document.createElement("li")
    list.className = "task-item"
    list.textContent = taskText

    const btnDelete = document.createElement("button")

    btnDelete.className = "delete-btn"
    btnDelete.textContent = "X"

    btnDelete.addEventListener("click", () => {
        list.remove()
        saveTasks()

    }) 

    list.appendChild(btnDelete)
    taskList.appendChild(list)

    saveTasks()
};




btnAdd.addEventListener("click", () => {

    const taskInputText = taskInput.value

    if (taskInputText !== "") {
        createTaskElement(taskInputText)
        taskInput.value = ""
    } else {
        alert("No es posible agregar una tarea vacía")
    }
});


function saveTasks() {

    const itemsList = document.querySelectorAll(".task-item")
    tasks = []


    itemsList.forEach((item) => {
        tasks.push(item.firstChild.textContent)
    })

    localStorage.setItem("tasks",JSON.stringify(tasks))

};

function loadTask() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [] 

    if (savedTasks) {
        savedTasks.forEach((task) => {
            createTaskElement(task)

        })};
};

loadTask()
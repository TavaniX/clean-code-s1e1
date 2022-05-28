let taskInput=document.getElementById("input-new-task");
let addButton=document.getElementsByTagName("button")[0];
let incompleteTaskHolder=document.getElementById("todo-tasks");
let completedTasksHolder=document.getElementById("completed-tasks");

const createNewTaskElement = function(taskString) {
    let listItem=document.createElement("li");
    let checkBox=document.createElement("input");
    let label=document.createElement("label");
    let editInput=document.createElement("input");
    let editButton=document.createElement("button");
    let deleteButton=document.createElement("button");
    let deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.classList.add('task-list__label')
    checkBox.type="checkbox";
    checkBox.classList.add('task-list__checkbox')
    editInput.type="text";
    editInput.classList.add('input')
    editButton.innerText="Edit"; 
    editButton.className="button_edit";

    deleteButton.className="button_delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.classList.add('button__img')
    deleteButtonImg.alt = 'remove'
    deleteButton.appendChild(deleteButtonImg);

    listItem.classList.add('task-list')
    editButton.classList.add('button')
    deleteButton.classList.add('button')

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function() {
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

const editTask = function() {
    let listItem=this.parentNode;
    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".button_edit");
    let containsClass=listItem.classList.contains("task-list_edit");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("task-list_edit");
};

const deleteTask = function() {
    let listItem=this.parentNode;
    let ul=listItem.parentNode;

    ul.removeChild(listItem);
}

const taskCompleted = function() {
    let listItem=this.parentNode;
    listItem.classList.add('task-list_completed')
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    listItem.classList.remove('task-list_completed')
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector(".button_edit");
    let deleteButton=taskListItem.querySelector(".button_delete");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
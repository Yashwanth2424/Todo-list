let listItemsContainerElement = document.getElementById("listItemsContainer");
let addTodoButtonElement = document.getElementById("addTodoButton");
let saveTodoButtonElement = document.getElementById("saveTodoButton");

function gettodoListFromLocalStorage() {
    let stringifiedtodolist = localStorage.getItem("todoList");
    let parsedtodoList = JSON.parse(stringifiedtodolist);

    if (parsedtodoList === null) {
        return [];
    }
    else {
        return parsedtodoList;
    }
}


let todoList = gettodoListFromLocalStorage();

saveTodoButtonElement.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todosCount = todoList.length;

function addTodo() {
    let todoInputEl = document.getElementById("todoInput");
    let todoInputValue = todoInputEl.value;
    if (todoInputValue === "") {
        alert("Enter What you need to be Done!!")
    }
    else {
        todosCount = todosCount + 1;
        let newTodo = {
        text : todoInputValue,
        id : todosCount,
        isChecked : false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo)
    }
    todoInputEl.value = "";
}

addTodoButtonElement.onclick = function() {
    addTodo();
}

function ontodoStatusChange(checkboxID,labelID,todoID) {
    let checkboxEl = document.getElementById(checkboxID);
    let labelEl = document.getElementById(labelID);
    labelEl.classList.toggle("checked");
    /*
    if (checkboxEl.checked === true) {
        labelEl.classList.add("checked");
    }
    else {
        labelEl.classList.remove("checked");
    }
        */
    let todoElement = document.getElementById(todoID);
    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.id;
        if (eachTodoId === todoID) {
            return true;
        }
        else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true){
        todoObject.isChecked = false;
    }
    else {
        todoObject.isChecked = true;
    }
    
}

function deletetodo(todoID) {
    todoElement = document.getElementById(todoID);
    listItemsContainerElement.removeChild(todoElement);
    let itemIndex = todoList.findIndex(function(eachItem){
        let eachTodoId = "todo" + eachItem.id;
        if (eachTodoId === todoID){
            return true;
        }
        else {
            return false;
        }
    });
    todoList.splice(itemIndex,1);
}

function createAndAppendTodo(todo) {
    let checkboxID = "checkbox" + todo.id;
    let labelID = "label" + todo.id;
    let todoID = "todo" + todo.id;

    let listItemElement = document.createElement("li");
    listItemElement.classList.add("list-item-container","d-flex","flex-row");
    listItemElement.id = todoID;
    listItemsContainerElement.appendChild(listItemElement);
    
    let inputCheckboxElement = document.createElement("input");
    inputCheckboxElement.type = "checkbox";
    inputCheckboxElement.id = checkboxID;
    inputCheckboxElement.checked = todo.isChecked;
    inputCheckboxElement.classList.add("checkbox");
    inputCheckboxElement.onclick = function() {
        ontodoStatusChange(checkboxID,labelID,todoID,);
    }
    listItemElement.appendChild(inputCheckboxElement);
    
    let labelContainerElement = document.createElement("div");
    labelContainerElement.classList.add("list-inner-container");
    listItemElement.appendChild(labelContainerElement);
    

    let labelElement = document.createElement("label");
    labelElement.classList.add("label-item-text");
    labelElement.htmlFor = checkboxID;  
    labelElement.id = labelID;
    if(todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelElement.textContent = todo.text;
    
    labelContainerElement.appendChild(labelElement);



    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    deleteIconContainer.onclick = function() {
        deletetodo(todoID);
    }
    labelContainerElement.appendChild(deleteIconContainer);

    let deleteIconElement = document.createElement("i");
    deleteIconElement.classList.add("fa-solid","fa-trash-can-arrow-up","icon");
    deleteIconContainer.appendChild(deleteIconElement);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

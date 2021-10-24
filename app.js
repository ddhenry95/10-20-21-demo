//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
    //This method prevents the form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    //DATE DISPLAY - Allows the user to input a date for when the user
    //  will work on the task
    const dateDisplay = document.createElement("div");
    //dateDisplay.innerText = '12:00'; //will replace with an input later
    dateDisplay.innerHTML = '<input type="date" id="todoDate" name="todoDate"></input>';
    dateDisplay.classList.add("date-display");
    todoDiv.appendChild(dateDisplay);
    //TIME Display - As above, but for a specified amount of time.
    const timeDisplay = document.createElement("div");
    timeDisplay.innerText = '12:00 PM';
    timeDisplay.classList.add("time-display");
    todoDiv.appendChild(timeDisplay)
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";
}

const createObject = () => {
    let todos;
    //CHECK-- HEY Do I already have something in there?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {

    const todos = todoList.childNodes;

    todos.forEach((todo) => {


    //check for undefined values, skips them and only applies the switch statement on nodes with properties 
      if (todo.classList !== undefined) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
                } else {
                todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
            }
        }
      }
      return;
    });
}

function saveLocalTodos(todo) {
    let todos;
    //CHECK-- HEY Do I already have something in there?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    //CHECK-- HEY Do I already have something in localStorage?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    //CHECK-- HEY Do I already have something in localStorage?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
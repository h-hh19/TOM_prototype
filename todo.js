const toDoForm = document.getElementById("todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo_list");

const TODOS_KEY = "todos";

const toDos = [];

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newToDo;
    const button = document.createElement("button");
    button.innerText = "❌";
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    button.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    toDos.push(newToDo);
    paintToDo(newToDo);
    saveToDos();

}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(){
    console.log("hello");
}

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos ==! null){
    const parsedToDos = JSON.parse(savedToDos);
    parsedToDos.forEach(sayHello);
    console.log(paintToDo);
}
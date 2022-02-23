const toDoForm = document.getElementById("todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo_list");

const TODOS_KEY = "human";

let Human = [];

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    Human = Human.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(Human));
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
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
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    }
    Human.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();

}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

console.log(savedToDos);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    Human = parsedToDos;
    parsedToDos.forEach(paintToDo);

}



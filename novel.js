const toDoForm = document.getElementById("todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("novel_memo");

const TODOS_KEY = "novel";

let Novel = [];

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    Novel = Novel.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(Novel));
}

function paintToDo(newToDo){
    const div = document.createElement("div");
    div.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    div.appendChild(span);
    div.appendChild(button);
    toDoList.appendChild(div);
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
    Novel.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();

}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

console.log(savedToDos);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    Novel = parsedToDos;
    parsedToDos.forEach(paintToDo);

}



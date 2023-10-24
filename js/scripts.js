// Carrega a lista de tarefas do localStorage quando a página é carregada
loadToDoListFromLocalStorage();

document.getElementById("addToDo").onclick = addTodo;

document.getElementById("inputField").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Função para adicionar uma tarefa à lista
function addTodo() {
    var inputField = document.getElementById("inputField");
    var inputValue = inputField.value.trim();

    if (inputValue === "") {
        inputField.focus();
        return;
    }

    // Cria uma nova tarefa e adiciona ao HTML
    var list = document.getElementById("list");
    var toDoItem = document.createElement("div");
    toDoItem.className = "toDo";
    var toDoName = document.createElement("span");
    toDoName.id = "toDoName";
    toDoName.textContent = inputValue;
    var deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "-";
    toDoItem.appendChild(toDoName);
    toDoItem.appendChild(deleteButton);
    list.appendChild(toDoItem);

    // Limpa o campo de entrada e define o foco novamente
    inputField.value = "";
    inputField.focus();

    // Adiciona eventos de clique e atualiza o localStorage
    updateEventsAndLocalStorage();
}

// Função para atualizar eventos de clique e localStorage
function updateEventsAndLocalStorage() {
    var currentToDos = document.getElementsByClassName("delete");
    for (var i = 0; i < currentToDos.length; i++) {
        currentToDos[i].onclick = function () {
            this.parentNode.remove();
            updateLocalStorage();
        };
    }

    var toDoItems = document.getElementsByClassName("toDo");
    for (var i = 0; i < toDoItems.length; i++) {
        toDoItems[i].onclick = function () {
            this.classList.toggle("completed");
            updateLocalStorage();
        };
    }

    // Salva os dados da lista de tarefas no localStorage
    saveToDoListToLocalStorage();
}

// Função para salvar a lista de tarefas no localStorage
function saveToDoListToLocalStorage() {
    var toDoItems = document.getElementsByClassName("toDo");
    var todoList = [];

    for (var i = 0; i < toDoItems.length; i++) {
        var toDoName = toDoItems[i].querySelector("#toDoName").textContent;
        var completed = toDoItems[i].classList.contains("completed");
        todoList.push({ name: toDoName, completed: completed });
    }

    // Converte a lista de tarefas em JSON e a salva no localStorage
    var todoListJSON = JSON.stringify(todoList);
    localStorage.setItem("todoList", todoListJSON);
}

// Função para carregar a lista de tarefas do localStorage, se existir
function loadToDoListFromLocalStorage() {
    var todoListJSON = localStorage.getItem("todoList");
    if (todoListJSON) {
        var todoList = JSON.parse(todoListJSON);

        // Limpa a lista existente
        var list = document.getElementById("list");
        list.innerHTML = "";

        // Adiciona as tarefas da lista do localStorage ao HTML
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i];
            var completedClass = todo.completed ? "completed" : "";
            var toDoItem = document.createElement("div");
            toDoItem.className = `toDo ${completedClass}`;
            var toDoName = document.createElement("span");
            toDoName.id = "toDoName";
            toDoName.textContent = todo.name;
            var deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "-";
            toDoItem.appendChild(toDoName);
            toDoItem.appendChild(deleteButton);
            list.appendChild(toDoItem);
        }

        // Atualiza eventos de clique
        updateEventsAndLocalStorage();
    }
}

// Botão para limpar a lista (zerar)
document.getElementById("clearList").onclick = function () {
    var list = document.getElementById("list");
    list.innerHTML = "";
    // Atualiza o localStorage após limpar a lista
    updateLocalStorage();
};

// Função para atualizar o localStorage após qualquer alteração na lista
function updateLocalStorage() {
    saveToDoListToLocalStorage();
}

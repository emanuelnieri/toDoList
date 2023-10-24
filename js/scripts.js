// Carrega a lista de tarefas dos cookies quando a página é carregada
loadToDoListFromCookies();

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
    list.innerHTML +=
        `<div class="toDo">
            <span id="toDoName">${inputValue}</span>
            <button class="delete">-</button>
        </div>`;

    // Limpa o campo de entrada e define o foco novamente
    inputField.value = "";
    inputField.focus();

    // Adiciona eventos de clique e cookie
    updateEventsAndCookies();
}

// Função para atualizar eventos de clique e cookies
function updateEventsAndCookies() {
    var currentToDos = document.getElementsByClassName("delete");
    for (var i = 0; i < currentToDos.length; i++) {
        currentToDos[i].onclick = function () {
            this.parentNode.remove();
            updateCookies();
        };
    }

    var toDoItems = document.getElementsByClassName("toDo");
    for (var i = 0; i < toDoItems.length; i++) {
        toDoItems[i].onclick = function () {
            this.classList.toggle("completed");
            updateCookies();
        };
    }

    // Salva os dados da lista de tarefas em cookies
    saveToDoListToCookies();
}

// Função para salvar a lista de tarefas em cookies com duração de 366 dias
function saveToDoListToCookies() {
    var toDoItems = document.getElementsByClassName("toDo");
    var todoList = [];

    for (var i = 0; i < toDoItems.length; i++) {
        var toDoName = toDoItems[i].querySelector("#toDoName").textContent;
        var completed = toDoItems[i].classList.contains("completed");
        todoList.push({ name: toDoName, completed: completed });
    }

    // Converte a lista de tarefas em JSON
    var todoListJSON = JSON.stringify(todoList);

    // Define a data de expiração para daqui a 366 dias
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 366);

    // Salva os dados da lista de tarefas em cookies com uma duração de 366 dias
    document.cookie = `todoList=${todoListJSON}; expires=${expirationDate.toUTCString()}`;
}

// Função para carregar a lista de tarefas dos cookies, se existir
function loadToDoListFromCookies() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)todoList\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        var todoList = JSON.parse(decodeURIComponent(cookieValue));

        // Limpa a lista existente
        var list = document.getElementById("list");
        list.innerHTML = "";

        // Adiciona as tarefas da lista de cookies ao HTML
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i];
            var completedClass = todo.completed ? "completed" : "";
            list.innerHTML +=
                `<div class="toDo ${completedClass}">
                    <span id="toDoName">${todo.name}</span>
                    <button class="delete">-</button>
                </div>`;
        }

        // Atualiza eventos de clique
        updateEventsAndCookies();
    }
}

// Botão para limpar a lista (zerar)
document.getElementById("clearList").onclick = function () {
    var list = document.getElementById("list");
    list.innerHTML = "";
    // Atualiza cookies após limpar a lista
    updateCookies();
};

// Função para atualizar os cookies após qualquer alteração na lista
function updateCookies() {
    saveToDoListToCookies();
}

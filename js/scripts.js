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

// Função para salvar a lista de tarefas e o estado em cookies
function saveToDoListToCookies() {
    var toDoItems = document.getElementsByClassName("toDo");
    var todoList = [];
    var listState = "empty"; // Inicialmente, a lista está vazia

    if (toDoItems.length > 0) {
        listState = "hasItems";
    }

    for (var i = 0; i < toDoItems.length; i++) {
        var toDoName = toDoItems[i].querySelector("#toDoName").textContent;
        var completed = toDoItems[i].classList.contains("completed");
        todoList.push({ name: toDoName, completed: completed });
    }

    // Cria um objeto com a lista de tarefas e o estado
    var todoData = {
        listState: listState,
        todoList: todoList,
    };

    // Converte o objeto em JSON e o salva em cookies
    var todoDataJSON = JSON.stringify(todoData);
    document.cookie = "todoData=" + todoDataJSON;
}

// Função para carregar a lista de tarefas dos cookies, se existir
function loadToDoListFromCookies() {
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)todoData\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        var todoData = JSON.parse(decodeURIComponent(cookieValue));

        // Limpa a lista existente
        var list = document.getElementById("list");
        list.innerHTML = "";

        // Adiciona as tarefas da lista de cookies ao HTML
        for (var i = 0; i < todoData.todoList.length; i++) {
            var todo = todoData.todoList[i];
            var completedClass = todo.completed ? "completed" : "";
            list.innerHTML +=
                `<div class="toDo ${completedClass}">
                    <span id="toDoName">${todo.name}</span>
                    <button class="delete">-</button>
                </div>`;
        }

        // Atualiza eventos de clique
        updateEvents();

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

// Carrega a lista de tarefas dos cookies quando a página é carregada
loadToDoListFromCookies();

document.getElementById("addToDo").onclick = () =>{
    if(document.getElementById("inputField").value == ""){
        document.getElementById("inputField").focus();
    }
    else{
        document.getElementById("list").innerHTML
        += `
            <div class="toDo">
                <span id="toDoName">
                    ${(document.getElementById("inputField").value)}
                </span>
                <button class="delete">
                    -
                </button>
            </div>
        `;

        var current_ToDos = document.getElementsByClassName("delete");
        for(var i = 0; i < current_ToDos.length; i++){
            current_ToDos[i].onclick = function() {
                this.parentNode.remove();
            }
        }

        var toDo = document.getElementsByClassName("toDo");
        for(var i = 0; i < toDo.length; i++){
            toDo[i].onclick = function() {
                this.classList.toggle("completed");
            }
        }

        document.getElementById("inputField").value = "";
        document.getElementById("inputField").focus();
    }
}




document.addEventListener("DOMContentLoaded", function(){
    fetch('/todo')
    .then(response => response.json())
    .then(arr => {
        var todos = document.getElementsByClassName("todos")[0];

        arr.forEach(element => {
            var todoEle = document.createElement("todo-component");
            todoEle.setAttribute("id", element.id);
            todoEle.setAttribute("title", element.title);
            if(element.completed == true) {
                todoEle.setAttribute("completed", 'on');
            }
            
            todos.appendChild(todoEle);
            console.log(todoEle);

            var appendedTodo =  document.getElementById("todo-" + element.id);
        });
    });
});
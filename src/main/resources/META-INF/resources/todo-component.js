window.customElements.define('todo-component', 
    class extends HTMLElement {

       connectedCallback() {
            var todo = this;

            this.innerHTML = '\
                <form>\
                    <label>\
                        <input type="hidden" name="id">\
                        <input type="checkbox" name="completed">\
                        <span>\
                            <input type="text" name="title" required size="40" maxlength="80">\
                        </span>\
                    </label>\
                </form>\
            ';

            var form = this.getElementsByTagName("form")[0];
            var idInput = form.elements["id"];
            var titleInput = form.elements["title"];
            var completedInput = form.elements["completed"];

            // Populate component with any existing values upon load
            idInput.value = this.getAttribute('id');
            titleInput.value = this.getAttribute('title');
            if(this.getAttribute('completed') == 'on') {
                completedInput.checked = 'on';
            }
            
            titleInput.addEventListener("keyup", function(e) {
                e.preventDefault();
                if (e.keyCode === 13) {
                    new FormData(form);
                }
            });

            completedInput.addEventListener("click", (e) => {
                new FormData(form);
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
            
            form.addEventListener('formdata', (e) => {
                e.preventDefault();
                var data = Object.fromEntries(e.formData);

                if(data.id == '') { // New Todo
                    fetch('/todo', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        idInput.value = data.id;
                        console.log("Added: " + JSON.stringify(data));
                    });

                    var newTodo = document.createElement("todo-component");
                    todo.parentElement.prepend(newTodo);
                }
                else { // Update Todo
                    // Convert completed to boolean value
                    (data.completed == 'on') ? data.completed = true : data.completed = false;

                    fetch('/todo', {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    });
                }
            });
        }
    });
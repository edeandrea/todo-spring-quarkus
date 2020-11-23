window.customElements.define('todo-component', 
    class extends HTMLElement {

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});

            let tmpl = document.createElement('template');
            tmpl.innerHTML = `
            <style>

            input[type="text"] {
                background: transparent;
                color: white;
            }

            label > input[type="checkbox"] {
                display: none;
            }
              
            label > input[type="checkbox"] + *::before {
                content: "";
                display: inline-block;
                vertical-align: bottom;
                width: 2rem;
                height: 2rem;
                border-radius: 10%;
                border-style: solid;
                border-width: 0.1rem;
                border-color: gray;
                border-radius: 2rem;
                margin-right: 0.5rem;
            }
              
            label > input[type="checkbox"]:checked + *::before {
                content: "✓";
                line-height: 2rem;
                font-weight: bold;
                color: white;
                text-align: center;
                background: green;
                border-color: green;
            }

            label > input[type="checkbox"]:checked + * > input[type="text"] {
                color: silver;
                text-decoration: line-through;
            }
              
            label > input[type="checkbox"] + * > button {
                visibility: hidden;
            }
              
            label > input[type="checkbox"]:checked + * > button {
                visibility: visible;
                background: none;
                border: none;
                font-size: 1.3rem
            }
              
            label > input[type="checkbox"] + * > input[type="text"] {
                line-height: 1.5rem;
                font-size: 1.5rem;
                border: 0;
                margin-bottom: 2px;
            }

            :host(:first-of-type) label > input[type="checkbox"] + * > input[type="text"] {
                border: 1px solid gray;
                border-radius: 6px;
                margin-left: 3.1rem;
            }
            
            :host(:first-of-type) label > input[type="checkbox"] + *::before {
                display: none;
            }
            </style>
            <form>
                <label>
                    <input type="hidden" name="id">
                    <input type="checkbox" name="completed">
                    <span>
                        <input type="text" name="title" required size="40" maxlength="80">
                        <button type="button" name="delete">&#x274C;</button>
                    </span>
                </label>
            </form>`;

            this.shadow.appendChild(tmpl.content.cloneNode(true));
        }

        connectedCallback() {
            const todo = this;
            const form = this.shadow.querySelector('form');
            const idInput = form.elements['id'];
            const titleInput = form.elements['title'];
            const completedInput = form.elements['completed'];
            const deleteButton = form.elements['delete'];

            // Populate component with any existing values upon load
            idInput.value = this.getAttribute('id');

            const escapedTitle = decodeURI(this.getAttribute('title'));
            if(escapedTitle != 'null') {
                titleInput.value = escapedTitle;
            }

            if(this.getAttribute('completed') == 'on') {
                completedInput.checked = 'on';
            }

            // The attributes are no longer useful, as the state is maintained internally
            this.removeAttribute('title');
            this.removeAttribute('completed');

            deleteButton.addEventListener('click', function(e) {
                fetch('/todo/' + idInput.value, {
                    method: 'DELETE'
                })
                .then(response => {
                    todo.remove();
                })
                .catch(err => console.error(err));
            });
            
            titleInput.addEventListener('keyup', function(e) {
                e.preventDefault();
                if (e.keyCode === 13) {
                    new FormData(form);
                }
            });

            completedInput.addEventListener('click', (e) => {
                new FormData(form);
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
            
            form.addEventListener('formdata', (e) => {
                e.preventDefault();
                const data = Object.fromEntries(e.formData);
                data.title = encodeURI(data.title);

                if(data.id == '') { // New Todo
                    fetch('/todo', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        idInput.value = data.id;
                        console.log('Added: ' + JSON.stringify(data));
                    })
                    .catch(err => console.error(err));

                    var newTodo = document.createElement('todo-component');
                    todo.parentElement.prepend(newTodo);
                }
                else { // Update Todo
                    // Convert completed to boolean value
                    (data.completed == 'on') ? data.completed = true : data.completed = false;

                    fetch('/todo', {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    .catch(err => console.error(err));
                }
            });
        }
    });
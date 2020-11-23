class TodoComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        fetch('./todo-component.html')
        .then(stream => stream.text())
        .then(html => {
            let tmpl = document.createElement('template');
            tmpl.innerHTML = html;
            console.log(html);
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.attachEvents();
        });
    }

    attachEvents() {
        const todo = this;
        const form = this.shadowRoot.querySelector('form');
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
}

window.customElements.define('todo-component', TodoComponent);
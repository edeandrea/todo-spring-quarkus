window.customElements.define('todo-component', 
    class extends HTMLElement {
        /*
        get id() {
            return this.hasAttribute('id');
        }

        set id(val) {
            this.setAttribute('id', '');
        }

        get title() {
            return this.hasAttribute('title');
        }

        set title(val) {
            this.setAttribute('title', '');
        }

        get completed() {
            return this.hasAttribute('title');
        }

        set completed(val) {
            this.setAttribute('completed', '');
        }
        */
       
        constructor() {
            super();

            this.innerHTML = '\
                <form>\
                    <label>\
                        <input type="checkbox" name="completed">\
                        <span>\
                            <input type="text" name="title" required size="40" maxlength="80">\
                        </span>\
                    </label>\
                </form>\
            ';

            var form = this.getElementsByTagName("form")[0];
            var titleInput = form.elements["title"];
            var completedInput = form.elements["completed"];
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
            
            form.addEventListener('formdata', (e) => {
                e.preventDefault();
                alert(JSON.stringify(Object.fromEntries(e.formData)));  
            });
            
            titleInput.addEventListener("keyup", function(e) {
                e.preventDefault();
                if (e.keyCode === 13) {
                    new FormData(form);
                }
            });
            
            completedInput.addEventListener("click", (e) => {
                new FormData(form);
            });
        }
    });
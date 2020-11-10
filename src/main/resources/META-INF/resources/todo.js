/*
let myForm = document.getElementById('todo-1');

var titleInput = myForm.elements["title"];
var completedInput = myForm.elements["completed"];

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

myForm.addEventListener('formdata', (e) => {
    e.preventDefault();
    alert(JSON.stringify(Object.fromEntries(e.formData)));  
});

titleInput.addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        new FormData(myForm);
    }
});

completedInput.addEventListener("click", (e) => {
    new FormData(myForm);
});

fetch('/todo')
.then(response => response.json())
.then(data => alert("1 " + data));

var data = {
    "title": "New todo"
}

fetch('/todo', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => alert("2 " + data));

fetch('/todo/1')
.then(response => response.json())
.then(data => alert("3 " + data));

data = {
    "id": 2,
    "title": "New todo",
    "completed": true
}

fetch('/todo', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
})
.then(response => alert("4"));


fetch('/todo/1', {
    method: 'DELETE'
})
.then(response => alert("4"));  
*/
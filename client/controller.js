init();

function _commit(todos = this.todos) {
    var self = this;
    displayTodos(
        todos.filter(function(todo) {
            if (self.filter == "0") return true;
            return self.filter == "1" ? !todo.complete : todo.complete;
        })
    );

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodos(todoText) {
    var todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
        text: todoText,
        complete: false
    };

    todos.push(todo);

    _commit(todos);
}

function deleteTodos(id) {
    todos = todos.filter(todo => todo.id !== id);

    _commit(todos);
}

function editTodos(id, updatedText) {
    todos = todos.map(todo =>
        todo.id === id
            ? {
                  id: todo.id,
                  text: updatedText,
                  complete: todo.complete
              }
            : todo
    );

    _commit(todos);
}

function toggleTodos(id) {
    todos = todos.map(todo =>
        todo.id === id
            ? {
                  id: todo.id,
                  text: todo.text,
                  complete: !todo.complete
              }
            : todo
    );

    _commit(todos);
}

function filterTodos(filter) {
    this.filter = filter;

    _commit();
}

function uploadTodos() {
    let todos = JSON.stringify(JSON.parse(localStorage.getItem("todos")));
    if (todos == "[]") return alert("There's nothing to save");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Saved successfully!");
        }
    };
    xhr.open("POST", "write", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(todos);
}

function init() {
    (todos = JSON.parse(localStorage.getItem("todos")) || []), (filter = "0");

    _commit();
}

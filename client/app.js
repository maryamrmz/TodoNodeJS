class Model {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        this.filter = "0";
    }

    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    _commit(todos = this.todos) {
        var self = this;
        this.onTodoListChanged(
            todos.filter(function(todo) {
                if (self.filter == "0") return true;
                return self.filter == "1" ? !todo.complete : todo.complete;
            })
        );
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    uploadTodo() {
        this._commit(this.todos);
    }

    addTodo(todoText) {
        var todo = {
            id:
                this.todos.length > 0
                    ? this.todos[this.todos.length - 1].id + 1
                    : 0,
            text: todoText,
            complete: false
        };

        this.todos.push(todo);

        this._commit(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

        this._commit(this.todos);
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map(todo =>
            todo.id === id
                ? {
                      id: todo.id,
                      text: updatedText,
                      complete: todo.complete
                  }
                : todo
        );

        this._commit(this.todos);
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id
                ? {
                      id: todo.id,
                      text: todo.text,
                      complete: !todo.complete
                  }
                : todo
        );

        this._commit(this.todos);
    }

    filterTodo(filter) {
        this.filter = filter;
        this._commit();
    }
}

class View {
    constructor() {
        this.form = document.querySelector("#taskForm");
        this.input = document.getElementById("taskInput");
        this.list = document.querySelector("#taskList");
        this.filterBtnS = document.getElementById("filterButtons");
        this.allBtn = document.querySelector(".all");
        this.activeBtn = document.querySelector(".active");
        this.completeBtn = document.querySelector(".complete");
        this.upload = document.querySelector(".upload");
        this.download = document.querySelector(".download");

        this._temporaryTodoText = "";
        this._initLocalListeners();
    }

    createElement(tag, className) {
        var element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    getElement(selector) {
        var element = document.querySelector(selector);

        return element;
    }

    set _value(value) {
        this.input.value = value;
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = "";
    }

    displayTodos(todos) {
        var self = this;
        // Faster way for clear tasks
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }

        if (todos.length !== 0) {
            var self = this;
            todos.forEach(function(todo) {
                var li = self.createElement("li", "task"),
                    span = self.createElement("span"),
                    remove = self.createElement("button", "remove"),
                    tooltip = self.createElement("span", "tooltiptext");

                li.id = todo.id;
                span.textContent = todo.text;
                span.contentEditable = true;
                span.classList.add("span");
                remove.classList.add("tooltip");
                tooltip.textContent = "delete";
                remove.append(tooltip);

                var checkbox = self.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;

                if (todo.complete) {
                    var strike = self.createElement("s");
                    strike.textContent = todo.text;
                    span.innerHTML = "";
                    span.contentEditable = false;
                    span.classList.remove("span");
                    span.classList.add("completed");
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                li.append(checkbox, span, remove);

                self.list.append(li);
            });
        }
    }

    bindAddTodo(handler) {
        var self = this;
        this.form.addEventListener("submit", function(e) {
            e.preventDefault();

            if (self._todoText) {
                handler(self._todoText);
                self._resetInput();
            } else {
                return alert("Please enter a task");
            }
        });
    }

    bindDeleteTodo(handler) {
        this.list.addEventListener("click", function(e) {
            if (e.target.classList.contains("remove")) {
                var id = +e.target.parentElement.id;

                handler(id);
            }
        });
    }

    _initLocalListeners() {
        var self = this;
        this.list.addEventListener("input", function(e) {
            if (e.target.className == "span") {
                self._temporaryTodoText = e.target.innerHTML;
            }
        });
    }

    bindEditTodo(handler) {
        var self = this;
        this.list.addEventListener("focusout", function(event) {
            if (self._temporaryTodoText) {
                var id = +event.target.parentElement.id;

                handler(id, self._temporaryTodoText);
                self._temporaryTodoText = "";
            }
        });
    }

    bindUploadTodo(handler) {
        this.upload.addEventListener("click", function() {
            var e = localStorage.getItem("key");
            handler(e);
        });
    }

    bindToggleTodo(handler) {
        this.list.addEventListener("change", function(event) {
            if (event.target.type === "checkbox") {
                var id = +event.target.parentElement.id;

                handler(id);
            }
        });
    }

    bindFilterTodo(handler) {
        var self = this;
        this.filterBtnS.addEventListener("click", function(e) {
            var filter = e.target.getAttribute("value");
            if (filter == null) return false;
            self._changePage(filter);

            handler(filter);
        });
    }

    _changePage(event) {
        switch (event) {
            case "0":
                this.allBtn.classList.add("activeBtn");
                this.activeBtn.classList.remove("activeBtn");
                this.completeBtn.classList.remove("activeBtn");
                break;
            case "1":
                this.allBtn.classList.remove("activeBtn");
                this.activeBtn.classList.add("activeBtn");
                this.completeBtn.classList.remove("activeBtn");
                break;
            case "2":
                this.allBtn.classList.remove("activeBtn");
                this.activeBtn.classList.remove("activeBtn");
                this.completeBtn.classList.add("activeBtn");
                break;
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindTodoListChanged(this.onTodoListChanged.bind(this));
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.view.bindEditTodo(this.handleEditTodo.bind(this));
        this.view.bindToggleTodo(this.handleToggleTodo.bind(this));
        this.view.bindFilterTodo(this.handleFilterTodo.bind(this));
        this.view.bindUploadTodo(this.handleUploadTodo.bind(this));

        this.onTodoListChanged(this.model.todos);
    }

    onTodoListChanged = function(todos) {
        this.view.displayTodos(todos);
    };

    handleAddTodo = function(todoText) {
        this.model.addTodo(todoText);
    };

    handleDeleteTodo = function(id) {
        this.model.deleteTodo(id);
    };

    handleEditTodo = function(id, todoText) {
        this.model.editTodo(id, todoText);
    };

    handleToggleTodo = function(id) {
        this.model.toggleTodo(id);
    };

    handleFilterTodo = function(filter) {
        this.model.filterTodo(filter);
    };

    handleUploadTodo = function() {
        this.model.uploadTodo();
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
    };
}

var app = new Controller(new Model(), new View());

var form = document.querySelector("#taskForm"),
    input = document.getElementById("taskInput"),
    list = document.querySelector("#taskList"),
    filterBtnS = document.getElementById("filterButtons"),
    allBtn = document.querySelector(".all"),
    activeBtn = document.querySelector(".active"),
    completeBtn = document.querySelector(".complete"),
    upload = document.querySelector(".upload"),
    download = document.querySelector(".download");

function displayTodos(todos) {
    // Faster way for clear tasks
    while (this.list.firstChild) {
        this.list.removeChild(this.list.firstChild);
    }

    if (todos.length !== 0) {
        var self = this;
        todos.forEach(function(todo) {
            var li = document.createElement("li"),
                span = document.createElement("span"),
                remove = document.createElement("button"),
                tooltip = document.createElement("span");

            li.className = "task";
            li.id = todo.id;
            span.textContent = todo.text;
            span.contentEditable = true;
            span.classList.add("span");
            remove.className = "remove";
            remove.classList.add("tooltip");
            tooltip.className = "tooltiptext";
            tooltip.textContent = "delete";
            remove.append(tooltip);

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.complete;

            if (todo.complete) {
                var strike = document.createElement("s");
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
    _temporaryTodoText = "";
    _initLocalListeners();
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (input.value === "") {
        return alert("Please enter a task");
    }
    addTodos(input.value);
    input.value = "";
    input.focus();
});

list.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove")) {
        var id = +e.target.parentElement.id;

        deleteTodos(id);
    }
});

function _initLocalListeners() {
    var self = this;
    this.list.addEventListener("input", function(e) {
        if (e.target.className == "span") {
            self._temporaryTodoText = e.target.innerHTML;
        }
    });
}

list.addEventListener("focusout", function(event) {
    if (_temporaryTodoText) {
        var id = +event.target.parentElement.id;

        editTodos(id, self._temporaryTodoText);
        self._temporaryTodoText = "";
    }
});

list.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        var id = +event.target.parentElement.id;

        toggleTodos(id);
    }
});

filterBtnS.addEventListener("click", function(e) {
    var filter = e.target.getAttribute("value");
    if (filter == null) return false;

    changePages(filter);
    filterTodos(filter);
});

function changePages(event) {
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

upload.addEventListener("click", function() {
    uploadTodos();
});

download.addEventListener("click", function() {
    downloadTodos();
});

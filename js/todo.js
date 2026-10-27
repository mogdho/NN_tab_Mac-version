export function initTodo() {
    const todoList = document.getElementById('todo-list');
    const addTodoBtn = document.getElementById('add-todo-btn');
    
    let todos = [];
    let isAdding = false;

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            const dash = document.createElement('span');
            dash.className = 'dash';
            dash.textContent = '-';
            
            const text = document.createElement('span');
            text.className = 'text';
            text.textContent = todo;
            text.title = 'Double-click to edit';
            text.addEventListener('dblclick', () => editTodo(li, text, index));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn material-symbols-outlined';
            deleteBtn.textContent = 'check';
            deleteBtn.style.fontSize = '18px';
            deleteBtn.onclick = () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            };

            li.appendChild(dash);
            li.appendChild(text);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    // Swaps a todo's text for an input. Enter/blur saves, Escape cancels,
    // and saving an empty value removes the todo.
    function editTodo(li, textEl, index) {
        if (isAdding) return;
        isAdding = true;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-input-inline';
        input.value = todos[index];

        let done = false;
        function finish(save) {
            if (done) return;
            done = true;
            if (save) {
                const value = input.value.trim();
                if (value) todos[index] = value;
                else todos.splice(index, 1);
                saveTodos();
            }
            isAdding = false;
            renderTodos();
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finish(true);
            } else if (e.key === 'Escape') {
                finish(false);
            }
        });
        input.addEventListener('blur', () => finish(true));

        li.replaceChild(input, textEl);
        input.focus();
        input.select();
    }

    function saveTodos() {
        chrome.storage.local.set({ todos: todos });
    }

    function loadTodos() {
        chrome.storage.local.get(['todos'], (result) => {
            if (result.todos) {
                todos = result.todos;
                renderTodos();
            }
        });
    }

    function showInlineInput() {
        if (isAdding) return;
        isAdding = true;

        const li = document.createElement('li');
        li.className = 'todo-item';

        const dash = document.createElement('span');
        dash.className = 'dash';
        dash.textContent = '-';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-input-inline';
        input.placeholder = 'Type a new note...';

        function commitInput() {
            const value = input.value.trim();
            if (value) {
                todos.push(value);
                saveTodos();
            }
            isAdding = false;
            renderTodos();
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                commitInput();
            } else if (e.key === 'Escape') {
                isAdding = false;
                renderTodos();
            }
        });

        input.addEventListener('blur', commitInput);

        li.appendChild(dash);
        li.appendChild(input);
        todoList.appendChild(li);

        input.focus();
    }

    addTodoBtn.addEventListener('click', showInlineInput);

    loadTodos();
}

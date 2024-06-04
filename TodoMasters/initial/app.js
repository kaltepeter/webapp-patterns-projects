import { TodoList } from "./webapp/classes.js";
import { CommandExecutor, Command, Commands } from "./webapp/command.js";
import { LocalStorage } from "./webapp/storage.js";

globalThis.DOM = {};
const DOM = globalThis.DOM;

const renderList = () => {
    DOM.todoList.innerHTML = '';
    const list = TodoList.getInstance();
    for (let todo of list.items) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        listItem.innerHTML = `${todo.text} <button class="delete-btn">X</button>`;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    DOM.todoList = document.getElementById('todo-list');
    DOM.addBtn = document.getElementById('add-btn');
    DOM.todoInput = document.getElementById('todo-input');

    DOM.addBtn.addEventListener('click', (evt) => {
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    });

    DOM.todoList.addEventListener('click', evt => {
        if (evt.target.classList.contains('delete-btn')) {
            const todo = evt.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [todo]);
            CommandExecutor.execute(cmd);
        }
    });

    // renderList();
    TodoList.getInstance().addObserver(renderList);
    LocalStorage.load();

    document.addEventListener('keydown', evt => {
        if (evt.ctrlKey && evt.key === 'p') {
            evt.preventDefault();
            const cmd = new Command(Commands.ADD);
            CommandExecutor.execute(cmd);
        }
        if (evt.metaKey && evt.key === 'z') {
            evt.preventDefault();
            const cmd = new Command(Commands.UNDO, []);
            CommandExecutor.execute(cmd);
        }
    })
})

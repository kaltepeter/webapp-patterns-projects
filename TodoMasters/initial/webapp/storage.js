import { TodoList, TodoItem } from "./classes.js";

const todoList = TodoList.getInstance();

const storageKey = 'todos';

export const LocalStorage = {
    load() {
        if (localStorage.getItem(storageKey)) {
            for (let t of JSON.parse(localStorage.getItem("todos"))) {
                todoList.add(new TodoItem(t.text));
            }
        }
    },
    save() {
        const array = Array.from(todoList.items);
        localStorage.setItem(storageKey, JSON.stringify(array));
    }
}

todoList.addObserver(LocalStorage.save);

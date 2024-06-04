import { observerMixin} from './mixin.js';

class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text == other.text;
    }
}

class TodoList {
    #data = new Set();
    get items() {
        return this.#data;
    }

    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (TodoList.instance) {
            throw new Error('Use TodoList.getInstance() to access the list')
        }
    }

    add(item) {
        // const array = Array.from(this.#data);
        // const todoExists = array.filter(t => t.equals(item)).length > 0;
        const todoExists = this.#data.has(item);
        if (!todoExists) {
            this.#data.add(item);
            this.notify?.call(this);
        }
    }

    delete(todo_text) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(t => t.text === todo_text)[0];
        console.log(todoToDelete);
        this.#data.delete(todoToDelete);
        this.notify?.call(this);
    }

    find(todo_text) {
        const array = Array.from(this.#data);
        return array.find(t => t.text === todo_text);
    }

    replaceList(list) {
        this.#data = list;
        this.notify?.call(this);
    }
}

Object.assign(TodoList.prototype, observerMixin);

export {
    TodoItem,
    TodoList
}

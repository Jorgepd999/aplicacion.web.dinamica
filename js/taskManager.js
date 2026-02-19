// Clase que representa una tarea individual
class Task {
    constructor(name) {
        this.id = Date.now() + Math.random(); // Genera un id único (un poco más seguro)
        this.name = name;
    }
}

// Clase que gestiona las tareas
class TaskManager {
    constructor() {
        this.tasks = []; 
        this.loadTasks(); // Cargar tareas guardadas en localStorage al iniciar

        // Si no hay tareas guardadas, añadimos algunas por defecto
        if (this.tasks.length === 0) {
            this.addTask(new Task("Comprar leche"));
            this.addTask(new Task("Estudiar JavaScript"));
            this.addTask(new Task("Hacer ejercicio"));
        }
    }

    // Añadir una tarea
    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
    }

    // Eliminar una tarea por ID
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    // Editar una tarea por ID
    editTask(id, newName) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.name = newName;
            this.saveTasks();
        }
    }

    // Buscar tareas por texto
    searchTasks(query) {
        return this.tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Guardar tareas en localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Cargar tareas desde localStorage
    loadTasks() {
        const saved = JSON.parse(localStorage.getItem('tasks'));
        if (saved) {
            this.tasks = saved.map(task => {
                const t = new Task(task.name);
                t.id = task.id; // Mantener los IDs originales
                return t;
            });
        }
    }
}

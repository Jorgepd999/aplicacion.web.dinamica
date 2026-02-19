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
            this.addTask(new Task("Leer un libro"));
            this.addTask(new Task("Llamar a mamá"));
            this.addTask(new Task("Organizar el escritorio"));
            this.addTask(new Task("Planificar el fin de semana"));
            this.addTask(new Task("Aprender algo nuevo"));
            this.addTask(new Task("Escribir un diario"));
            this.addTask(new Task("Meditar por 10 minutos"));
            this.addTask(new Task("Limpiar la casa"));
            this.addTask(new Task("Preparar la cena"));
            this.addTask(new Task("Hacer la compra"));
            this.addTask(new Task("Pagar las deudas"));
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

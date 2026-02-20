// Clase que representa una tarea individual
class Tarea {
    constructor(nombre) {
        this.id = Date.now() + Math.random(); // ID único
        this.nombre = nombre;                 // Nombre de la tarea
    }
}

// Clase que gestiona todas las tareas
class GestorTareas {
    constructor() {
        this.tareas = [];        // Array donde guardamos las tareas
        this.cargarTareas();     // Cargar tareas guardadas en localStorage

        // Si no hay tareas guardadas, añadir algunas de ejemplo
        if (this.tareas.length === 0) {
            this.agregarTarea(new Tarea("Comprar leche"));
            this.agregarTarea(new Tarea("Estudiar JavaScript"));
            this.agregarTarea(new Tarea("Hacer ejercicio"));
        }
    }

    // Añadir tarea
    agregarTarea(tarea) {
        this.tareas.push(tarea);
        this.guardarTareas();
    }

    // Eliminar tarea por ID
    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        this.guardarTareas();
    }

    // Editar tarea por ID
    editarTarea(id, nuevoNombre) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.nombre = nuevoNombre;
            this.guardarTareas();
        }
    }

    // Buscar tareas por texto
    buscarTareas(consulta) {
        return this.tareas.filter(t => t.nombre.toLowerCase().includes(consulta.toLowerCase()));
    }

    // Guardar tareas en localStorage
    guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    // Cargar tareas desde localStorage
    cargarTareas() {
        const guardadas = JSON.parse(localStorage.getItem('tareas'));
        if (guardadas) {
            this.tareas = guardadas.map(t => {
                const tarea = new Tarea(t.nombre);
                tarea.id = t.id;
                return tarea;
            });
        }
    }
}
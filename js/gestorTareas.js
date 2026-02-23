// Clase que representa una tarea individual
class Tarea {
    constructor(nombre) {
        this.id = Date.now() + Math.random(); // Genera un ID único combinando timestamp y número aleatorio
        this.nombre = nombre;                 // Nombre de la tarea
    }
}

// Clase que gestiona todas las tareas
class GestorTareas {
    constructor() {
        this.tareas = [];             // Array donde guardamos todas las tareas
        this.nombresTareas = new Set(); // Set para controlar nombres únicos y evitar duplicados
        this.cargarTareas();          // Cargar tareas guardadas en localStorage

        // Si no hay tareas guardadas, añadimos algunas de ejemplo
        if (this.tareas.length === 0) {
            this.agregarTarea(new Tarea("Hacer la compra"));
            this.agregarTarea(new Tarea("Estudiar JavaScript"));
            this.agregarTarea(new Tarea("Hacer ejercicio"));
            this.agregarTarea(new Tarea("Terminar proyecto de clase"));
                        this.agregarTarea(new Tarea("Estudiar para el examen"));


        }
    }

    // =========================
    // Añadir una tarea
    // =========================
    agregarTarea(tarea) {
        // Comprobamos si el nombre ya existe en el Set (evita duplicados)
        if (this.nombresTareas.has(tarea.nombre.toLowerCase())) {
            alert("Ya existe una tarea con ese nombre.");
            return; // No añadir tarea duplicada
        }

        this.tareas.push(tarea);                       // Añadimos la tarea al array
        this.nombresTareas.add(tarea.nombre.toLowerCase()); // Añadimos el nombre al Set
        this.guardarTareas();                          // Guardamos en localStorage
    }

    // =========================
    // Eliminar una tarea por ID
    // =========================
    eliminarTarea(id) {
        // Buscar la tarea que vamos a eliminar para quitar su nombre del Set
        const tareaEliminar = this.tareas.find(t => t.id === id);
        if (tareaEliminar) {
            this.nombresTareas.delete(tareaEliminar.nombre.toLowerCase()); // Quitar del Set
        }

        // Filtrar el array para eliminar la tarea
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardarTareas(); // Guardar cambios en localStorage
    }

    // =========================
    // Editar una tarea por ID
    // =========================
    editarTarea(id, nuevoNombre) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            // Comprobamos si el nuevo nombre ya existe (y no es el mismo que la tarea actual)
            if (this.nombresTareas.has(nuevoNombre.toLowerCase()) && tarea.nombre.toLowerCase() !== nuevoNombre.toLowerCase()) {
                alert("Ya existe otra tarea con ese nombre.");
                return;
            }

            // Actualizamos el Set: quitamos el antiguo nombre y añadimos el nuevo
            this.nombresTareas.delete(tarea.nombre.toLowerCase());
            this.nombresTareas.add(nuevoNombre.toLowerCase());

            // Cambiamos el nombre de la tarea
            tarea.nombre = nuevoNombre;

            this.guardarTareas(); // Guardar cambios en localStorage
        }
    }

    // =========================
    // Buscar tareas por texto
    // =========================
    buscarTareas(consulta) {
        // Filtramos el array buscando coincidencias ignorando mayúsculas/minúsculas
        return this.tareas.filter(t => t.nombre.toLowerCase().includes(consulta.toLowerCase()));
    }

    // =========================
    // Guardar tareas en localStorage
    // =========================
    guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    // =========================
    // Cargar tareas desde localStorage
    // =========================
    cargarTareas() {
        const guardadas = JSON.parse(localStorage.getItem('tareas'));
        if (guardadas) {
            // Creamos nuevas instancias de Tarea a partir de los datos guardados
            this.tareas = guardadas.map(t => {
                const tarea = new Tarea(t.nombre);
                tarea.id = t.id; // Mantenemos el ID original
                this.nombresTareas.add(t.nombre.toLowerCase()); // También añadimos los nombres al Set
                return tarea;
            });
        }
    }
}
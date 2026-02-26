// ============================
// CLASE TAREA
// ============================

// Clase que representa una tarea individual
class Tarea {

    constructor(nombre) {

        // Genera un ID único combinando:
        // - Date.now() → milisegundos actuales (timestamp)
        // - Math.random() → número decimal aleatorio
        // Esto reduce muchísimo la probabilidad de IDs duplicados
        this.id = Date.now() + Math.random();

        // Nombre descriptivo de la tarea
        this.nombre = nombre;
    }
}



// ============================
// CLASE GESTOR DE TAREAS
// ============================

// Clase que gestiona todas las tareas
class GestorTareas {

    constructor() {

        // Array principal donde se almacenan todas las tareas
        this.tareas = [];

        // Set para controlar nombres únicos (evita duplicados de forma eficiente)
        // Guardamos los nombres en minúsculas para evitar problemas de mayúsculas/minúsculas
        this.nombresTareas = new Set();

        // Intentamos cargar tareas guardadas en localStorage
        this.cargarTareas();

        // Si no hay tareas guardadas, creamos tareas de ejemplo
        if (this.tareas.length === 0) {
            this.agregarTarea(new Tarea("Hacer la compra"));
            this.agregarTarea(new Tarea("Estudiar JavaScript"));
            this.agregarTarea(new Tarea("Hacer ejercicio"));
            this.agregarTarea(new Tarea("Terminar proyecto de clase"));
            this.agregarTarea(new Tarea("Estudiar para el examen"));
        }
    }



    // =========================
    // AÑADIR UNA TAREA
    // =========================

    agregarTarea(tarea) {

        // Comprobamos si el nombre ya existe en el Set
        // Convertimos a minúsculas para evitar duplicados tipo:
        // "Tarea" y "tarea"
        if (this.nombresTareas.has(tarea.nombre.toLowerCase())) {
            alert("Ya existe una tarea con ese nombre.");
            return; // Cancelamos si es duplicado
        }

        // Añadimos la tarea al array principal
        this.tareas.push(tarea);

        // Guardamos el nombre en el Set para control futuro
        this.nombresTareas.add(tarea.nombre.toLowerCase());

        // Guardamos cambios en localStorage
        this.guardarTareas();
    }



    // =========================
    // ELIMINAR UNA TAREA POR ID
    // =========================

    eliminarTarea(id) {

        // Buscamos primero la tarea que vamos a eliminar
        // para quitar su nombre del Set
        const tareaEliminar = this.tareas.find(t => t.id === id);

        if (tareaEliminar) {
            // Eliminamos su nombre del Set
            this.nombresTareas.delete(tareaEliminar.nombre.toLowerCase());
        }

        // Creamos un nuevo array excluyendo la tarea con ese ID
        this.tareas = this.tareas.filter(t => t.id !== id);

        // Guardamos cambios en localStorage
        this.guardarTareas();
    }



    // =========================
    // EDITAR UNA TAREA POR ID
    // =========================

    editarTarea(id, nuevoNombre) {

        // Buscar la tarea por ID
        const tarea = this.tareas.find(t => t.id === id);

        if (tarea) {

            // Verificamos si el nuevo nombre ya existe
            // (y que no sea el mismo nombre actual)
            if (
                this.nombresTareas.has(nuevoNombre.toLowerCase()) &&
                tarea.nombre.toLowerCase() !== nuevoNombre.toLowerCase()
            ) {
                alert("Ya existe otra tarea con ese nombre.");
                return; // Cancelar edición
            }

            // Actualizamos el Set:
            // 1. Quitamos el nombre antiguo
            this.nombresTareas.delete(tarea.nombre.toLowerCase());

            // 2. Añadimos el nuevo nombre
            this.nombresTareas.add(nuevoNombre.toLowerCase());

            // Cambiamos el nombre en el objeto tarea
            tarea.nombre = nuevoNombre;

            // Guardamos cambios
            this.guardarTareas();
        }
    }



    // =========================
    // BUSCAR TAREAS POR TEXTO
    // =========================

    buscarTareas(consulta) {

        // Filtramos el array devolviendo solo las tareas
        // cuyo nombre incluya el texto buscado
        // .includes() permite coincidencias parciales
        // Convertimos todo a minúsculas para búsqueda insensible a mayúsculas
        return this.tareas.filter(t =>
            t.nombre.toLowerCase().includes(consulta.toLowerCase())
        );
    }



    // =========================
    // GUARDAR EN LOCALSTORAGE
    // =========================

    guardarTareas() {

        // Convertimos el array de tareas a JSON
        // y lo almacenamos en el navegador
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }



    // =========================
    // CARGAR DESDE LOCALSTORAGE
    // =========================

    cargarTareas() {

        // Recuperamos datos guardados
        const guardadas = JSON.parse(localStorage.getItem('tareas'));

        if (guardadas) {

            // Convertimos los objetos planos (JSON)
            // nuevamente en instancias reales de Tarea
            this.tareas = guardadas.map(t => {

                // Creamos nueva instancia
                const tarea = new Tarea(t.nombre);

                // Restauramos el ID original
                tarea.id = t.id;

                // Añadimos el nombre al Set para mantener control de duplicados
                this.nombresTareas.add(t.nombre.toLowerCase());

                return tarea;
            });
        }
    }
}
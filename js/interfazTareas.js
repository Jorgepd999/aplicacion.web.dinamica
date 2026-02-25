// Crear instancia del gestor de tareas
const gestor = new GestorTareas();

// Referencias al DOM
const formularioTarea = document.getElementById('formularioTarea');
const listaTareas = document.getElementById('listaTareas');
const nombreTareaInput = document.getElementById('nombreTarea');
const buscarTareaInput = document.getElementById('buscarTarea');



// Función para mostrar las tareas en pantalla
function mostrarTareas(tareas) {
    listaTareas.innerHTML = ''; // Limpiar lista antes de mostrar

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;

        // Botón de editar
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.onclick = () => {
            const nuevoNombre = prompt('Nuevo nombre de la tarea:', tarea.nombre);
            if (nuevoNombre) {
                const nombreRecortado = nuevoNombre.trim();

                // Validaciones simples
                if (nombreRecortado.length < 3) { alert('El nombre debe tener al menos 3 caracteres.'); return; }
                if (nombreRecortado.length > 50) { alert('El nombre no puede superar 50 caracteres.'); return; }

                // Evitar duplicados
                const existe = gestor.tareas.some(t => t.nombre.toLowerCase() === nombreRecortado.toLowerCase() && t.id !== tarea.id);
                if (existe) { alert('Ya existe otra tarea con ese nombre.'); return; }

                gestor.editarTarea(tarea.id, nombreRecortado);
                mostrarTareas(gestor.tareas);
            }
        };

        // Botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {
            const confirmado = confirm(`¿Seguro que quieres eliminar la tarea "${tarea.nombre}"?`);
            if (confirmado) {
                gestor.eliminarTarea(tarea.id);
                mostrarTareas(gestor.tareas);
            }
        };

        // Contenedor de botones (alineados a la derecha)
        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('acciones-tarea');
        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);

        li.appendChild(contenedorBotones);
        listaTareas.appendChild(li);
    });
}

// Evento para añadir nueva tarea
formularioTarea.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar recargar la página

    const nombre = nombreTareaInput.value.trim();

    // Validaciones
    if (nombre.length === 0) { alert('Debes escribir un nombre de tarea'); return; }
    if (nombre.length < 3) { alert('El nombre debe tener al menos 3 caracteres'); return; }
    if (nombre.length > 50) { alert('El nombre no puede superar 50 caracteres'); return; }

    const existe = gestor.tareas.some(t => t.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) { alert('Ya existe una tarea con ese nombre'); return; }

    const confirmado = confirm(`¿Seguro que quieres añadir la tarea "${nombre}"?`);
    if (!confirmado) return;

    // Añadir tarea
    const tarea = new Tarea(nombre);
    gestor.agregarTarea(tarea);
    mostrarTareas(gestor.tareas);

    nombreTareaInput.value = ''; // Limpiar campo
});

// Evento para buscar tareas
buscarTareaInput.addEventListener('input', () => {
    const consulta = buscarTareaInput.value.trim();
    const filtradas = gestor.buscarTareas(consulta);
    mostrarTareas(filtradas);
});

// Mostrar tareas al cargar la página
mostrarTareas(gestor.tareas);
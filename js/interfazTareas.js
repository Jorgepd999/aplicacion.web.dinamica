// ============================
// INSTANCIA DEL GESTOR
// ============================

// Crear instancia del gestor de tareas (controla agregar, editar, eliminar y buscar)
const gestor = new GestorTareas();


// ============================
// REFERENCIAS AL DOM
// ============================

// Obtener elementos del HTML para poder manipularlos desde JavaScript
const formularioTarea = document.getElementById('formularioTarea'); // Formulario para agregar tareas
const listaTareas = document.getElementById('listaTareas'); // Lista donde se muestran las tareas
const nombreTareaInput = document.getElementById('nombreTarea'); // Input donde se escribe el nombre
const buscarTareaInput = document.getElementById('buscarTarea'); // Input para buscar tareas


// ============================
// CREAR BOTÓN DE EXPORTAR JSON
// ============================

// Crear dinámicamente un botón
const botonExportar = document.createElement('button');
botonExportar.textContent = "Exportar tareas"; // Texto visible del botón
botonExportar.classList.add('boton-exportar'); // Clase CSS para estilos personalizados


// ============================
// ANIMACIÓN DE APARICIÓN DEL BOTÓN
// ============================

// Inicialmente invisible
botonExportar.style.opacity = 0;

// Definir transición suave
botonExportar.style.transition = "opacity 0.5s ease";

// Pequeño retraso para activar animación de aparición
setTimeout(() => { 
    botonExportar.style.opacity = 1; 
}, 50);


// ============================
// EVENTO DEL BOTÓN EXPORTAR
// ============================

botonExportar.onclick = () => {

    // Confirmar antes de exportar
    const confirmado = confirm(`¿Seguro que quieres exportar las tareas a JSON?`);

    if (confirmado) {

        // Convertir array de tareas a formato JSON legible
        const dataStr = JSON.stringify(gestor.tareas, null, 2);

        // Crear archivo tipo JSON en memoria
        const blob = new Blob([dataStr], { type: "application/json" });

        // Crear URL temporal para descargarlo
        const url = URL.createObjectURL(blob);

        // Crear enlace invisible para forzar descarga
        const a = document.createElement("a");
        a.href = url;
        a.download = "tareas.json"; // Nombre del archivo descargado
        a.click();

        // Liberar memoria eliminando la URL creada
        URL.revokeObjectURL(url);
    }
};

// Insertar el botón antes de la lista de tareas en el body
document.body.insertBefore(botonExportar, listaTareas);



// ============================
// FUNCIÓN PARA MOSTRAR TAREAS
// ============================

function mostrarTareas(tareas) {

    // Limpiar lista antes de volver a dibujarla
    listaTareas.innerHTML = '';

    // Recorrer cada tarea y crear su elemento visual
    tareas.forEach(tarea => {

        const li = document.createElement('li');
        li.textContent = tarea.nombre; // Mostrar nombre de la tarea


        // ============================
        // ANIMACIÓN DE APARICIÓN
        // ============================

        li.style.opacity = 0;
        li.style.transition = "opacity 0.5s ease";

        setTimeout(() => { 
            li.style.opacity = 1; 
        }, 50);


        // ============================
        // BOTÓN EDITAR
        // ============================

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';

        botonEditar.onclick = () => {

            // Pedir nuevo nombre
            const nuevoNombre = prompt('Nuevo nombre de la tarea:', tarea.nombre);

            if (nuevoNombre) {

                const nombreRecortado = nuevoNombre.trim();

                // Validación: mínimo 3 caracteres
                if (nombreRecortado.length < 3) { 
                    alert('El nombre debe tener al menos 3 caracteres.'); 
                    return; 
                }

                // Validación: máximo 50 caracteres
                if (nombreRecortado.length > 50) { 
                    alert('El nombre no puede superar 50 caracteres.'); 
                    return; 
                }

                // Validación: evitar nombres duplicados
                const existe = gestor.tareas.some(t => 
                    t.nombre.toLowerCase() === nombreRecortado.toLowerCase() 
                    && t.id !== tarea.id
                );

                if (existe) { 
                    alert('Ya existe otra tarea con ese nombre.'); 
                    return; 
                }

                // Actualizar tarea en el gestor
                gestor.editarTarea(tarea.id, nombreRecortado);

                // Volver a renderizar lista
                mostrarTareas(gestor.tareas);
            }
        };


        // ============================
        // BOTÓN ELIMINAR
        // ============================

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';

        botonEliminar.onclick = () => {

            // Confirmar antes de eliminar
            const confirmado = confirm(
                `¿Seguro que quieres eliminar la tarea "${tarea.nombre}"?`
            );

            if (confirmado) {
                gestor.eliminarTarea(tarea.id); // Eliminar del gestor
                mostrarTareas(gestor.tareas);   // Actualizar vista
            }
        };


        // ============================
        // CONTENEDOR DE BOTONES
        // ============================

        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('acciones-tarea');

        // Añadir botones al contenedor
        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);

        // Añadir contenedor al elemento de la lista
        li.appendChild(contenedorBotones);

        // Añadir elemento a la lista en el DOM
        listaTareas.appendChild(li);
    });
}



// ============================
// EVENTO: AÑADIR NUEVA TAREA
// ============================

formularioTarea.addEventListener('submit', (e) => {

    e.preventDefault(); // Evitar que el formulario recargue la página

    const nombre = nombreTareaInput.value.trim();

    // Validaciones básicas
    if (nombre.length === 0) { 
        alert('Debes escribir un nombre de tarea'); 
        return; 
    }

    if (nombre.length < 3) { 
        alert('El nombre debe tener al menos 3 caracteres'); 
        return; 
    }

    if (nombre.length > 50) { 
        alert('El nombre no puede superar 50 caracteres'); 
        return; 
    }

    // Verificar duplicados
    const existe = gestor.tareas.some(t => 
        t.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (existe) { 
        alert('Ya existe una tarea con ese nombre'); 
        return; 
    }

    // Confirmar antes de agregar
    const confirmado = confirm(
        `¿Seguro que quieres añadir la tarea "${nombre}"?`
    );

    if (!confirmado) return;

    // Crear nueva instancia de Tarea
    const tarea = new Tarea(nombre);

    // Agregar al gestor
    gestor.agregarTarea(tarea);

    // Actualizar vista
    mostrarTareas(gestor.tareas);

    // Limpiar input
    nombreTareaInput.value = '';
});


// ============================
// EVENTO: BUSCAR TAREAS
// ============================

buscarTareaInput.addEventListener('input', () => {

    const consulta = buscarTareaInput.value.trim();

    // Obtener tareas filtradas
    const filtradas = gestor.buscarTareas(consulta);

    // Mostrar solo las filtradas
    mostrarTareas(filtradas);
});


// ============================
// INICIALIZACIÓN
// ============================

// Mostrar tareas al cargar la página
mostrarTareas(gestor.tareas);
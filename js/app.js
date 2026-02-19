// Crear instancia del gestor de tareas
const manager = new TaskManager();

// Referencias al DOM
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskNameInput = document.getElementById('taskName');
const searchTaskInput = document.getElementById('searchTask');


function renderTasks(tasks) {
    taskList.innerHTML = ''; // Limpiar lista antes de mostrar

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;

        // Botón de editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => {
            const newName = prompt('Nuevo nombre de la tarea:', task.name);
            if (newName) {
                const trimmed = newName.trim();

                // Validaciones al editar
                if (trimmed.length < 3) {
                    alert('El nombre debe tener al menos 3 caracteres.');
                    return;
                }

                if (trimmed.length > 50) {
                    alert('El nombre no puede superar 50 caracteres.');
                    return;
                }

                // Evitar duplicados (excepto la tarea que estamos editando)
                const exists = manager.tasks.some(t => t.name.toLowerCase() === trimmed.toLowerCase() && t.id !== task.id);
                if (exists) {
                    alert('Ya existe otra tarea con ese nombre.');
                    return;
                }

                manager.editTask(task.id, trimmed);
                renderTasks(manager.tasks);
            }
        };

        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.onclick = () => {
            const confirmed = confirm(`¿Seguro que quieres eliminar la tarea "${task.name}"?`);
            if (confirmed) {
                manager.deleteTask(task.id);
                renderTasks(manager.tasks);
            }
        };

        // Añadir botones a la lista
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

/**
 * Evento para añadir una nueva tarea
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar recargar la página

    const name = taskNameInput.value.trim();

    // Validaciones al añadir tarea
    if (name.length === 0) {
        alert('Debes escribir un nombre de tarea');
        return;
    }

    if (name.length < 3) {
        alert('El nombre de la tarea debe tener al menos 3 caracteres.');
        return;
    }

    if (name.length > 50) {
        alert('El nombre no puede superar 50 caracteres.');
        return;
    }

    const exists = manager.tasks.some(task => task.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('Ya existe una tarea con ese nombre.');
        return;
    }
    
    // Confirmación antes de añadir
    const confirmed = confirm(`¿Seguro que quieres añadir la tarea "${name}"?`);
    if (!confirmed) {
        return;
    }

    // Crear tarea y actualizar la lista
    const task = new Task(name);
    manager.addTask(task);
    renderTasks(manager.tasks);

    taskNameInput.value = ''; // Limpiar el campo
});

/**
 * Evento para buscar tareas
 */
searchTaskInput.addEventListener('input', () => {
    const query = searchTaskInput.value.trim();
    const filtered = manager.searchTasks(query);
    renderTasks(filtered);
});

// Mostrar tareas al cargar la página
renderTasks(manager.tasks);

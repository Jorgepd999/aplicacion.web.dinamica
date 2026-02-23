# Proyecto AWDG – Gestión de Tareas

Aplicación web para la gestión de tareas desarrollada con **HTML, CSS y JavaScript puro**.  
Permite crear, editar, eliminar y buscar tareas, almacenándolas en el navegador mediante **localStorage**.

---

##  Descripción

Este proyecto implementa una aplicación tipo **To-Do List** con persistencia de datos en el navegador.

La aplicación está estructurada separando responsabilidades:

- **Lógica de negocio** → `gestorTareas.js`
- **Interacción con el DOM** → `interfazTareas.js`
- **Gestión del tema visual** → `modoOscuro.js`

Se utilizan **clases en JavaScript (ES6)** para una mejor organización, mantenimiento y escalabilidad del código.

---

##  Funcionalidades

- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas con confirmación
- Buscar tareas en tiempo real
- Evitar tareas duplicadas
- Validaciones en creación y edición
- Almacenamiento persistente con `localStorage`
- Cambio entre modo claro y modo oscuro
- Persistencia del tema seleccionado

---

##  Validaciones Implementadas

- La tarea no puede estar vacía
- Debe tener un mínimo de **3 caracteres**
- No puede superar los **50 caracteres**
- No se permiten tareas duplicadas (comparación sin distinguir mayúsculas/minúsculas)
- Confirmación antes de añadir o eliminar tareas

---

##  Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- API LocalStorage

---

##  Estructura del Proyecto

ProyectoAWDG/
│
├── index.html
├── css/
│ └── estilo.css
├── js/
│ ├── gestorTareas.js
│ ├── interfazTareas.js
│ └── modoOscuro.js
└── README.md


---

##  Descripción de Archivos

- **index.html** → Estructura principal de la aplicación.
- **css/estilo.css** → Estilos visuales, incluyendo modo oscuro.
- **js/gestorTareas.js** → Contiene las clases `Tarea` y `GestorTareas` (lógica de negocio).
- **js/interfazTareas.js** → Maneja la interacción con el DOM y los eventos.
- **js/modoOscuro.js** → Gestiona el cambio y persistencia del tema visual.

---

#  Funcionamiento del Sistema

---

##  Clase `Tarea`

Representa una tarea individual dentro de la aplicación.

###  Propiedades

- `id` → Identificador único generado dinámicamente combinando:
  - `Date.now()` (timestamp)
  - `Math.random()` (valor aleatorio)
- `nombre` → Texto descriptivo de la tarea

###  Responsabilidad

- Modelar la estructura básica de una tarea.
- Garantizar que cada tarea tenga un identificador único.

---

##  Clase `GestorTareas`

Se encarga de gestionar toda la lógica relacionada con las tareas.

###  Propiedades

- `tareas` → Array donde se almacenan todas las tareas.
- `nombresTareas` → `Set` que guarda los nombres en minúsculas para evitar duplicados.

###  Responsabilidades

- Añadir tareas
- Editar tareas
- Eliminar tareas
- Buscar tareas
- Guardar tareas en `localStorage`
- Cargar tareas desde `localStorage`

---

###  Métodos Principales

#### `agregarTarea(tarea)`

- Verifica que no exista una tarea con el mismo nombre.
- Añade la tarea al array.
- Añade el nombre al `Set`.
- Guarda los cambios en `localStorage`.

#### `eliminarTarea(id)`

- Busca la tarea por su ID.
- Elimina su nombre del `Set`.
- Filtra el array para eliminarla.
- Guarda los cambios.

#### `editarTarea(id, nuevoNombre)`

- Busca la tarea por ID.
- Verifica que el nuevo nombre no esté duplicado.
- Actualiza el `Set` (elimina el antiguo nombre y añade el nuevo).
- Modifica el nombre de la tarea.
- Guarda los cambios.

#### `buscarTareas(consulta)`

- Devuelve un array filtrado.
- La búsqueda no distingue mayúsculas/minúsculas.

#### `guardarTareas()`

- Convierte el array en JSON.
- Lo almacena en `localStorage` bajo la clave `"tareas"`.

#### `cargarTareas()`

- Recupera las tareas almacenadas.
- Reconstruye instancias de la clase `Tarea`.
- Rellena el `Set` de nombres.
- Si no hay tareas guardadas, crea tareas de ejemplo automáticamente.

---

##  Clase `InterfazTareas`

Gestiona toda la interacción con el DOM y conecta la interfaz con la lógica del `GestorTareas`.

###  Responsabilidades

- Mostrar tareas en pantalla
- Capturar eventos del formulario
- Gestionar edición y eliminación
- Aplicar validaciones en la interfaz
- Gestionar la búsqueda en tiempo real

###  Funcionamiento

1. Se crea una instancia de `GestorTareas`.
2. Se obtienen referencias a los elementos del DOM:
   - Formulario
   - Lista de tareas
   - Input de nueva tarea
   - Input de búsqueda
3. Se define la función `mostrarTareas()` que:
   - Limpia la lista.
   - Genera dinámicamente los elementos `<li>`.
   - Añade botones de editar y eliminar.
4. Se añaden eventos:
   - `submit` → Añadir tarea.
   - `click` → Editar y eliminar.
   - `input` → Filtrar tareas en tiempo real.

###  Validaciones en la Interfaz

- Campo no vacío.
- Mínimo 3 caracteres.
- Máximo 50 caracteres.
- Comprobación manual de duplicados.
- Confirmación antes de añadir o eliminar.

Esta separación permite mantener desacopladas la lógica y la presentación.

---

##  Clase `modoOscuro`

Se encarga de gestionar el cambio entre modo claro y modo oscuro en la aplicación, mejorando la experiencia de usuario y permitiendo guardar su preferencia.

###  Responsabilidades

- Detectar el evento `click` del botón de cambio de tema.
- Alternar la clase `dark-mode` en el `<body>`.
- Cambiar dinámicamente el texto del botón.
- Guardar la preferencia del usuario en `localStorage`.
- Aplicar automáticamente el tema guardado al cargar la página.

###  Funcionamiento

- Se obtiene una referencia al botón mediante `getElementById`.
- Se añade un `addEventListener` al evento `click`:
  - Se alterna la clase `dark-mode` con `classList.toggle()`.
  - Se comprueba el estado con `classList.contains()`.
  - Se guarda `"oscuro"` o `"claro"` en `localStorage`.
- Se utiliza el evento `window.load` para:
  - Recuperar la preferencia guardada.
  - Aplicar automáticamente el modo oscuro si estaba seleccionado.

---

##  Persistencia del Tema

La preferencia se almacena bajo la clave `"tema"` en `localStorage`, lo que permite:

- Mantener el modo seleccionado tras recargar.
- Conservar la configuración incluso al cerrar el navegador.
- Mejorar la experiencia de usuario.

---

#  Instalación y Uso

1. Clonar el repositorio:

```bash
git clone https://github.com/Jorgepd999/aplicacion.web.dinamica.git
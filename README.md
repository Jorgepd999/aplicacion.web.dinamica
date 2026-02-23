# Proyecto AWDG – Gestión de Tareas

Aplicación web para la gestión de tareas desarrollada con HTML, CSS y JavaScript puro. Permite crear, editar, eliminar y buscar tareas, almacenándolas en el navegador mediante localStorage.

## Descripción

Este proyecto implementa una aplicación sencilla de lista de tareas (To-Do List) con persistencia de datos en el navegador. Está estructurado separando la lógica de negocio de la manipulación del DOM, utilizando clases en JavaScript para una mejor organización del código.

## Funcionalidades

- Crear nuevas tareas  
- Editar tareas existentes  
- Eliminar tareas con confirmación  
- Buscar tareas en tiempo real  
- Almacenamiento persistente mediante localStorage  
- Validaciones en la creación y edición de tareas  

## Validaciones implementadas

- La tarea no puede estar vacía  
- Debe tener un mínimo de 3 caracteres  
- No puede superar los 50 caracteres  
- No se permiten tareas duplicadas (comparación sin distinguir mayúsculas y minúsculas)  

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- API LocalStorage  

## Estructura del proyecto

```
ProyectoAWDG/
│
├── index.html
├── css/
│   └── estilo.css
├── js/
│   ├── gestorTareas.js
│   └── interfazTareas.js 
│   └── modoOscuro.js
└── README.md
```

## Descripción de archivos

- `index.html`: estructura principal de la aplicación.  
- `css/estilo.css`: estilos visuales de la interfaz.  
- `js/taskManager.js`: contiene la lógica de negocio mediante las clases `Task` y `TaskManager`.  
- `js/app.js`: gestiona la interacción con el DOM y los eventos de la aplicación.  

## Funcionamiento

### Clase Task

Representa una tarea individual con las siguientes propiedades:

- `id`: identificador único generado dinámicamente  
- `name`: nombre de la tarea  

### Clase TaskManager

Se encarga de:

- Añadir tareas  
- Editar tareas  
- Eliminar tareas  
- Buscar tareas  
- Guardar y cargar tareas desde localStorage  

## Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Acceder a la carpeta del proyecto.  
3. Abrir el archivo `index.html` en cualquier navegador web.

No requiere dependencias externas ni servidor.



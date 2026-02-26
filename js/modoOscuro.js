// ============================
// REFERENCIA AL BOTÓN DE MODO
// ============================

// Obtenemos el botón del HTML que permitirá cambiar el tema
const botonModo = document.getElementById('botonModo');



// ============================
// CAMBIAR ENTRE MODO OSCURO Y CLARO
// ============================

// Escuchamos el evento "click" del botón
botonModo.addEventListener('click', () => {

    // Alterna (activa/desactiva) la clase "dark-mode" en el body
    // Si existe la clase la elimina, si no existe la añade
    document.body.classList.toggle('dark-mode');

    // Comprobamos si el modo oscuro está activado
    if (document.body.classList.contains('dark-mode')) {

        // Cambiamos el texto del botón
        botonModo.textContent = 'Modo Claro';

        // Guardamos la preferencia del usuario en localStorage
        // Así se mantiene incluso si recarga la página
        localStorage.setItem('tema', 'oscuro');

    } else {

        // Si no está activado el modo oscuro, volvemos al claro
        botonModo.textContent = 'Modo Oscuro';

        // Guardamos preferencia en localStorage
        localStorage.setItem('tema', 'claro');
    }
});



// ============================
// APLICAR TEMA GUARDADO AL CARGAR
// ============================

// Cuando la página termina de cargarse
window.addEventListener('load', () => {

    // Recuperamos la preferencia guardada
    const temaGuardado = localStorage.getItem('tema');

    // Si el usuario tenía activado el modo oscuro
    if (temaGuardado === 'oscuro') {

        // Añadimos la clase al body automáticamente
        document.body.classList.add('dark-mode');

        // Ajustamos el texto del botón para que sea coherente
        botonModo.textContent = 'Modo Claro';
    }
});
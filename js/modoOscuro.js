// Referencia al botón de modo oscuro
const botonModo = document.getElementById('botonModo');

// Cambiar entre modo oscuro y claro
botonModo.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Alterna clase dark-mode

    if (document.body.classList.contains('dark-mode')) {
        botonModo.textContent = 'Modo Claro';
        localStorage.setItem('tema', 'oscuro'); // Guardar preferencia
    } else {
        botonModo.textContent = 'Modo Oscuro';
        localStorage.setItem('tema', 'claro');
    }
});

// Aplicar tema guardado al cargar la página
window.addEventListener('load', () => {
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
        botonModo.textContent = 'Modo Claro';
    }
});
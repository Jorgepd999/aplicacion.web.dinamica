const toggleButton = document.getElementById('toggleTheme');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        toggleButton.textContent = ' Modo Claro';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.textContent = ' Modo Oscuro';
        localStorage.setItem('theme', 'light');
    }
});

// Aplicar tema guardado al cargar la página
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark'){
        document.body.classList.add('dark-mode');
        toggleButton.textContent = ' Modo Claro';
    }
});
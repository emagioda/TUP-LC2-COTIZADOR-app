function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById('alerta');
    alerta.textContent = mensaje;
    alerta.className = `alerta ${tipo}`;
    alerta.classList.remove('ocultar');
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.classList.add('ocultar');
        alerta.style.display = 'none';
    }, 5000);
}
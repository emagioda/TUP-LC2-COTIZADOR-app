/********************************************************************************
*  Archivo: common.js
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   12-06-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

const comentarios = [
    {
        img: 'img/Elon_Musk.jpg',
        nombre: 'Elon Musk',
        texto: 'El diseño de la página es intuitivo. Puedo encontrar siempre las cotizaciones que necesito. ¡Muy recomendada!'
    },
    {
        img: 'img/Steve_Jobs.jpg',
        nombre: 'Steve Jobs',
        texto: 'El equipo de desarrollo hizo un gran trabajo. La calidad de la página es sobresaliente. ¡Felicitaciones!'
    },
    {
        img: 'img/Bill_Gates.jpg',
        nombre: 'Bill Gates',
        texto: 'La atención al cliente es excepcional. Siempre resuelven mis dudas rápidamente. ¡Muy agradecido!'
    }
];

let comentarioActual = 0;

// Función para rotar los comentarios
function rotarComentarios() {
    comentarioActual = (comentarioActual + 1) % comentarios.length;
    document.querySelector('.comentario-img img').src = comentarios[comentarioActual].img;
    document.querySelector('.comentario-contenido h2').textContent = comentarios[comentarioActual].nombre;
    document.querySelector('.comentario-contenido p').textContent = comentarios[comentarioActual].texto;
}

/********************************************************************************
* BOTONES DE LA BARRA LATERAL                                                   *
*********************************************************************************/

const btnInicio = document.getElementById("btnInicio");
const btnMiarchivo = document.getElementById("btnMiarchivo");
const btnInformes = document.getElementById("btnInformes");
const btnContactos = document.getElementById("btnContactos");

const botones = [btnInicio, btnMiarchivo, btnInformes, btnContactos];

function cambiarVista(iframeSrc, botonActivo, nombrePagina) {
    const iframe = document.querySelector("iframe");
    // Si ya estamos en la página solicitada, no hacer nada.
    if (iframe.src.endsWith(iframeSrc)) {
        return;
    }

    iframe.src = iframeSrc;
    for (let i = 0; i < botones.length; i++) {
        botones[i].classList.remove("actual");
    }
    botonActivo.classList.add("actual");

    // Actualizar migas de pan
    actualizarMigasDePan(nombrePagina);
}

btnInicio.addEventListener("click", function () {
    cambiarVista("html/pizarra.html", btnInicio, "Inicio");
});

btnMiarchivo.addEventListener("click", function () {
    cambiarVista("html/miarchivo.html", btnMiarchivo, "Mi Archivo");
});

btnInformes.addEventListener("click", function () {
    cambiarVista("html/informes.html", btnInformes, "Informes");
});

btnContactos.addEventListener("click", function () {
    cambiarVista("html/contacto.html", btnContactos, "Contáctenos");
});

/********************************************************************************
* FUNCIONALIDAD DE BOTONES DEL FOOTER                                           *
*********************************************************************************/

const btnFooterInicio = document.getElementById("footerInicio");
const btnFooterMiArchivo = document.getElementById("footerMiArchivo");
const btnFooterInformes = document.getElementById("footerInformes");
const btnFooterContactenos = document.getElementById("footerContactenos");
const btnFooterEscribanos = document.getElementById("footerEscribanos");

btnFooterInicio.addEventListener('click', function (event) {
    cambiarVista('html/pizarra.html', btnInicio, "Inicio");
});

btnFooterMiArchivo.addEventListener('click', function (event) {
    cambiarVista('html/miarchivo.html', btnMiarchivo, "Mi Archivo");
});

btnFooterInformes.addEventListener('click', function (event) {
    cambiarVista('html/informes.html', btnInformes, "Informes");
});

btnFooterContactenos.addEventListener('click', function (event) {
    cambiarVista('html/contacto.html', btnContactos, "Contáctenos");
});

btnFooterEscribanos.addEventListener('click', function (event) {
    cambiarVista('html/contacto.html', btnContactos, "Contáctenos");
});

/********************************************************************************
* FUNCIONALIDAD DE MIGAS DE PAN                                                  *
********************************************************************************/

function crearLinkInicio() {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Inicio';
    link.addEventListener('click', function (event) {
        event.preventDefault();
        cambiarVista('html/pizarra.html', btnInicio, 'Inicio');
    });
    return link;
}

function actualizarMigasDePan(nombrePagina) {
    const migasDePan = document.getElementById("migas_de_pan");
    const linkInicio = crearLinkInicio();

    migasDePan.innerHTML = '<b>Usted está aquí:</b> ';
    migasDePan.appendChild(linkInicio);

    if (nombrePagina !== "Inicio") {
        const texto = document.createTextNode(` / ${nombrePagina}`);
        migasDePan.appendChild(texto);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    rotarComentarios();
    setInterval(rotarComentarios, 6000);
    actualizarMigasDePan('Inicio');
});

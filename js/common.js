/********************************************************************************
*  Archivo: index.js
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
        texto: 'El equipo de desarrollo hizo un gran trabajo. La calidad de la página es sobresaliente. ¡Felicitaciones!            '
    },
    {
        img: 'img/Bill_Gates.jpg',
        nombre: 'Bill Gates',
        texto: 'La atención al cliente es excepcional. Siempre resuelven mis dudas rápidamente. ¡Muy agradecido!              '
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

setInterval(rotarComentarios, 5000);

/********************************************************************************
* BOTONES DE LA BARRA LATERAL                                                   *
*********************************************************************************/

const btnInicio = document.getElementById("btnInicio");
const btnMiarchivo = document.getElementById("btnMiarchivo");
const btnInformes = document.getElementById("btnInformes");
const btnContactos = document.getElementById("btnContactos");

const botones = [btnInicio, btnMiarchivo, btnInformes, btnContactos];

function cambiarVista(iframeSrc, botonActivo) {
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
}

btnInicio.addEventListener("click", function() {
    cambiarVista("html/pizarra.html", btnInicio);
});

btnMiarchivo.addEventListener("click", function() {
    cambiarVista("html/miarchivo.html", btnMiarchivo);
});

btnInformes.addEventListener("click", function() {
    cambiarVista("html/informes.html", btnInformes);
});

btnContactos.addEventListener("click", function() {
    cambiarVista("html/contacto.html", btnContactos);
});

/********************************************************************************
* FUNCIONALIDAD DE BOTONES DEL FOOTER                                           *
*********************************************************************************/

const btnFooterInicio = document.getElementById("footerInicio");
const btnFooterMiArchivo = document.getElementById("footerMiArchivo");
const btnFooterInformes = document.getElementById("footerInformes");
const btnFooterContactenos = document.getElementById("footerContactenos");
const btnFooterEscribanos = document.getElementById("footerEscribanos");

btnFooterInicio.addEventListener('click', function(event) {
    cambiarVista('html/pizarra.html', btnInicio);
});

btnFooterMiArchivo.addEventListener('click', function(event) {
    cambiarVista('html/miarchivo.html', btnMiarchivo);
});

btnFooterInformes.addEventListener('click', function(event) {
    cambiarVista('html/informes.html', btnInformes);
});

btnFooterContactenos.addEventListener('click', function(event) {
    cambiarVista('html/contacto.html', btnContactos);
});

btnFooterEscribanos.addEventListener('click', function(event) {
    cambiarVista('html/contacto.html', btnContactos);
});

/********************************************************************************
* FETCH                                                                         *
********************************************************************************/

let array_cotizacion=[]

function fetch_datos(){
    
    fetch("https://dolarapi.com/v1/dolares").then(response => response.json()).then(data => array_cotizacion[0] =data)
    fetch("https://dolarapi.com/v1/cotizaciones/eur").then(response => response.json()).then(data => array_cotizacion[1] =data );
    fetch("https://dolarapi.com/v1/cotizaciones/brl").then(response => response.json()).then(data => array_cotizacion[2] =data );
    fetch("https://dolarapi.com/v1/cotizaciones/clp").then(response => response.json()).then(data => array_cotizacion[3] =data );
    fetch("https://dolarapi.com/v1/cotizaciones/uyu").then(response => response.json()).then(data => array_cotizacion[4] =data );

    console.log(array_cotizacion[1])

    //Ver porque si saco el delay no se ejecuta bien el localstorage
    setTimeout(function(){
        localStorage.setItem("CotizacionActual", JSON.stringify(array_cotizacion))
    },50) 
}

document.addEventListener("DOMContentLoaded", function(){
      
    fetch_datos()
})

 setInterval(function(){
    
    fetch_datos()
    
 },30000)
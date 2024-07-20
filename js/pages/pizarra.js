/********************************************************************************
*  Archivo: pizarra.js                                                          *
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   03-07-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* FUNCION: GENERAR TABLA                                                        *
********************************************************************************/
let main = document.querySelector("main");

// VARIABLES QUE USO PARA LOS BOTONES DE FAVORITOS
let moneda_marcada = [false, false, false, false, false, false, false, false, false, false, false];

/* 
Uso este array en la llamada a la funcion 'generar_tabla()' para identificar luego en que moneda 
hace "click" el usuario para guardar los datos 
*/
const lista_monedas = ["Oficial",
                        "Blue",
                        "Bolsa",
                        "Contado con liquidación",
                        "Mayorista",
                        "Cripto",
                        "Tarjeta",
                        "Euro",
                        "Real Brasileño",
                        "Peso Chileno",
                        "Peso Uruguayo"];

/********************************************************************************
* FUNCION: GENERAR TABLA                                                        *
********************************************************************************/
function generar_tabla(datos, tipo_moneda) {
    let tabla = document.createElement("table");

    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");

    let elemento_i = document.createElement("i");
    elemento_i.className = "fa solid fa-star fa-lg";
    elemento_i.id = "estrella1";

    // Lee el array donde se guarda el estado de las estrellas y le asigna "azul" si True o "gray" si False
    for (let i = 0; i < lista_monedas.length; ++i) {
        if (lista_monedas[i] === tipo_moneda) {
            if (moneda_marcada[i]) {
                elemento_i.style.color = "blue";
            } else {
                elemento_i.style.color = "gray";
            }
            break;
        }
    }

    // Seleccionar estrella.
    elemento_i.addEventListener("click", function () {
        // Se guardan los datos de la cotización.
        guardarDatos(datos);
        // Cambia el color de la estrella para indicar que ya hay un dato guardado para ese día.
        for (let i = 0; i < lista_monedas.length; ++i) {
            if (lista_monedas[i] === tipo_moneda) {
                if (!moneda_marcada[i]) { // Si no está marcada
                    elemento_i.style.color = "blue";
                    moneda_marcada[i] = true; // Marcar como true
                }
                break;
            }
        }
    });

    // Columna 1
    td1.className = "celdaTipoMoneda";
    td1.rowSpan = "2";
    td1.textContent = datos.moneda + " - " + datos.nombre;
    td1.style.fontWeight = "700";

    // Columna 2
    td2.className = "fila1";
    td2.textContent = "COMPRA";

    // Columna 3
    td3.className = "fila1";
    td3.textContent = "VENTA";

    // Columna 4
    td4.rowSpan = "2";
    td4.appendChild(elemento_i);

    // Agrega columnas a fila 1
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);

    // Columna 1 fila 2
    td5.className = "fila2";
    td5.textContent = "$ " + datos.compra;
    td5.style.fontWeight = "700";

    // Columna 2 fila 2
    td6.className = "fila2";
    td6.textContent = "$ " + datos.venta;
    td6.style.fontWeight = "700";

    // Agrega fila 2
    tr2.appendChild(td5);
    tr2.appendChild(td6);

    // Agrega filas a la tabla
    tabla.appendChild(tr1);
    tabla.appendChild(tr2);

    // Agrega tabla al main
    main.appendChild(tabla);
}

/********************************************************************************
* FUNCION: GUARDA COTIZACIONES DE USUARIO EN LOCAL STORAGE                      *
********************************************************************************/
function guardarDatos(datos) {
    let cotizacionesGuardadas = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    let fechaActual = new Date().toLocaleDateString();
    let nuevaCotizacion = {
        moneda: datos.nombre,
        fecha: fechaActual,
        compra: datos.compra,
        venta: datos.venta
    };

    let encontrada = false;

    // Busca si ya existe una cotización para la misma moneda y fecha.
    for (let i = 0; i < cotizacionesGuardadas.length; i++) {
        if (cotizacionesGuardadas[i].moneda === nuevaCotizacion.moneda && cotizacionesGuardadas[i].fecha === nuevaCotizacion.fecha) {
            // Si existe, actualiza la cotización.
            cotizacionesGuardadas[i] = nuevaCotizacion;
            encontrada = true;
            mostrarAlerta('Cotización actualizada correctamente', 'success');
            break;
        }
    }
    // Si no existe, agrega la nueva cotización.
    if (!encontrada) {
        cotizacionesGuardadas.push(nuevaCotizacion);
        mostrarAlerta('Cotización almacenada correctamente', 'success');
    }

    localStorage.setItem('cotizaciones', JSON.stringify(cotizacionesGuardadas));
}

/********************************************************************************
* FUNCION: TRAE LAS COTIZACIONES GUARDADAS Y GENERA LOS ESTADOS DE LAS ESTRELLAS*
********************************************************************************/
function array_estrellas() {
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    let fechaActual = new Date().toLocaleDateString();

    // Verifica si hay cotizaciones y si son del día actual
    if (cotizaciones.length > 0) {
        for (let i = 0; i < cotizaciones.length; ++i) {
            if (cotizaciones[i]["fecha"] === fechaActual) {
                for (let j = 0; j < moneda_marcada.length; ++j) {
                    if (cotizaciones[i]["moneda"] === lista_monedas[j]) {
                        moneda_marcada[j] = true;
                        break;
                    }
                }
            }
        }
    }
}

/********************************************************************************
* FUNCION: FETCH DATOS Y ACTUALIZAR TABLA CADA 5 MINUTOS                       *
********************************************************************************/
async function fetch_datos() {
    try {
        const urls = [
            "https://dolarapi.com/v1/dolares",
            "https://dolarapi.com/v1/cotizaciones/eur",
            "https://dolarapi.com/v1/cotizaciones/brl",
            "https://dolarapi.com/v1/cotizaciones/clp",
            "https://dolarapi.com/v1/cotizaciones/uyu"
        ];

        const requests = urls.map(url => fetch(url).then(response => response.json()));
        array_cotizacion_actual = await Promise.all(requests);

        localStorage.setItem("CotizacionActual", JSON.stringify(array_cotizacion_actual));
        array_cotizacion = JSON.parse(localStorage.getItem("CotizacionActual")) || []; // Actualiza el array de cotizaciones
        actualizarFechaHora();
        mostrarAlerta('Datos actualizados correctamente', 'success');

        // Actualizar la tabla con los nuevos datos
        actualizarTabla();
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        mostrarAlerta('ERROR: Ha ocurrido un error al consultar los datos', 'error');
    }
}

/********************************************************************************
* FUNCION: ACTUALIZA LA TABLA CON LOS DATOS MAS RECIENTES                        *
********************************************************************************/
function actualizarTabla() {
    // Limpia la tabla actual
    while (main.lastChild) {
        main.removeChild(main.lastChild);
    }

    // Genera LA tabla inicial con los datos actualizados
    if (array_cotizacion.length === 0) {
        console.error('array_cotizacion está vacío o es null');
        return;
    }

    switch (selecMoneda.value) {
        case "Todas":
            for (let i = 0; i < 7; ++i) {
                if (array_cotizacion[0] && array_cotizacion[0][i]) {
                    generar_tabla(array_cotizacion[0][i], lista_monedas[i]);
                }
            }
            if (array_cotizacion[1]) generar_tabla(array_cotizacion[1], lista_monedas[7]);
            if (array_cotizacion[2]) generar_tabla(array_cotizacion[2], lista_monedas[8]);
            if (array_cotizacion[3]) generar_tabla(array_cotizacion[3], lista_monedas[9]);
            if (array_cotizacion[4]) generar_tabla(array_cotizacion[4], lista_monedas[10]);
            break;

        case "Dolar Oficial":
            if (array_cotizacion[0] && array_cotizacion[0][0]) {
                generar_tabla(array_cotizacion[0][0], lista_monedas[0]);
            }
            break;

        case "Dolar Blue":
            if (array_cotizacion[0] && array_cotizacion[0][1]) {
                generar_tabla(array_cotizacion[0][1], lista_monedas[1]);
            }
            break;

        case "Dolar Bolsa":
            if (array_cotizacion[0] && array_cotizacion[0][2]) {
                generar_tabla(array_cotizacion[0][2], lista_monedas[2]);
            }
            break;

        case "Dolar Contado con liquidación":
            if (array_cotizacion[0] && array_cotizacion[0][3]) {
                generar_tabla(array_cotizacion[0][3], lista_monedas[3]);
            }
            break;

        case "Dolar Mayorista":
            if (array_cotizacion[0] && array_cotizacion[0][4]) {
                generar_tabla(array_cotizacion[0][4], lista_monedas[4]);
            }
            break;

        case "Dolar Cripto":
            if (array_cotizacion[0] && array_cotizacion[0][5]) {
                generar_tabla(array_cotizacion[0][5], lista_monedas[5]);
            }
            break;

        case "Dolar Tarjeta":
            if (array_cotizacion[0] && array_cotizacion[0][6]) {
                generar_tabla(array_cotizacion[0][6], lista_monedas[6]);
            }
            break;

        case "Euro":
            if (array_cotizacion[1]) {
                generar_tabla(array_cotizacion[1], lista_monedas[7]);
            }
            break;

        case "Real Brasileño":
            if (array_cotizacion[2]) {
                generar_tabla(array_cotizacion[2], lista_monedas[8]);
            }
            break;

        case "Peso Chileno":
            if (array_cotizacion[3]) {
                generar_tabla(array_cotizacion[3], lista_monedas[9]);
            }
            break;

        case "Peso Uruguayo":
            if (array_cotizacion[4]) {
                generar_tabla(array_cotizacion[4], lista_monedas[10]);
            }
            break;

        default:
            console.log("Moneda no reconocida");
            break;
    }
}

/********************************************************************************
* FUNCION: FILTRAR LA SELECCIÓN DE MONEDAS DE LA LISTA E IMPRIMIR TABLA       *
********************************************************************************/
let array_cotizacion = JSON.parse(localStorage.getItem("CotizacionActual")) || [];
const selecMoneda = document.getElementById("selectMoneda");

selecMoneda.addEventListener("change", function () {
    actualizarTabla()
});

/********************************************************************************
* FUNCION: FECHA Y HORA DE ACTUALIZACIÓN                                       *
********************************************************************************/
function actualizarFechaHora() {
    let actual_date = new Date();
    let dia = actual_date.getDate().toString().padStart(2, '0');
    let mes = (actual_date.getMonth() + 1).toString().padStart(2, '0');
    let año = actual_date.getFullYear();
    let hora = actual_date.getHours().toString().padStart(2, '0');
    let minutos = actual_date.getMinutes().toString().padStart(2, '0');

    let fecha_actualizacion = `Datos actualizados: ${dia}/${mes}/${año} - ${hora}:${minutos} Hs.`;

    document.getElementById("fecha_actualizacion").textContent = fecha_actualizacion;
}

/********************************************************************************
* GENERAL                                                                       *
********************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si 'CotizacionActual' existe en el local storage. Si no existe, ejecuta fetch_datos y recarga la página.
    if (!localStorage.getItem("CotizacionActual")) {
        fetch_datos().then(() => {
            location.reload();
        });
    } else {
        actualizarFechaHora();
        array_estrellas();
        actualizarTabla(); 
        mostrarAlerta('Los datos han sido cargados exitosamente', 'success');

        // Actualizar datos y tabla cada 5 minutos
        setInterval(fetch_datos, 300000);
    }
});
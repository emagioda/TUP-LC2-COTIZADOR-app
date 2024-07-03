let main = document.querySelector("main");

// Genera una tabla en el contenido principal.
function generar_tabla(datos) {
    let tabla = document.createElement("table");

    // Crea filas y celdas para la tabla.
    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    let elemento_i = document.createElement("i");

    // Configura el icono de estrella y su comportamiento al hacer click.
    elemento_i.className = "fa solid fa-star fa-lg";
    elemento_i.id = "estrella1";

    // Al hacer click en la estrella, se cambia a color azul y se almacena la información.
    elemento_i.addEventListener('click', function () {
        elemento_i.style.color = "blue"; 
        guardarDatos(datos); 
    });

    // Columna 1 (tipo de moneda y nombre)
    let td1 = document.createElement("td");
    td1.className = "celdaTipoMoneda";
    td1.rowSpan = "2";
    td1.textContent = datos.moneda + " - " + datos.nombre;
    td1.style.fontWeight = "700";

    // Columna 2 (COMPRA)
    let td2 = document.createElement("td");
    td2.className = "fila1";
    td2.textContent = "COMPRA";

    // Columna 3 (VENTA)
    let td3 = document.createElement("td");
    td3.className = "fila1";
    td3.textContent = "VENTA";

    // Columna 4 (acción de estrella)
    let td4 = document.createElement("td");
    td4.rowSpan = "2";
    td4.appendChild(elemento_i);

    // Columna 1 fila 2 (valor de compra)
    let td5 = document.createElement("td");
    td5.className = "fila2";
    td5.textContent = "$ " + datos.compra;
    td5.style.fontWeight = "700";

    // Columna 2 fila 2 (valor de venta)
    let td6 = document.createElement("td");
    td6.className = "fila2";
    td6.textContent = "$ " + datos.venta;
    td6.style.fontWeight = "700";

    // Se agregan las celdas a las filas.
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);

    tr2.appendChild(td5);
    tr2.appendChild(td6);

    // Se agregan las filas a la tabla.
    tabla.appendChild(tr1);
    tabla.appendChild(tr2);

    // Se agrega la tabla al contenedor principal.
    main.appendChild(tabla);
}

// Guarda los datos de la cotización en localStorage.
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
            break;
        }
    }
    // Si no existe, agrega la nueva cotización.
    if (!encontrada) {
        cotizacionesGuardadas.push(nuevaCotizacion);
    }

    localStorage.setItem('cotizaciones', JSON.stringify(cotizacionesGuardadas));
}

/********************************************************************************
* FILTRAR LA SELECCIÓN DE MONEDAS DE LA LISTA                                   *
********************************************************************************/

let array_cotizacion = JSON.parse(localStorage.getItem("CotizacionActual"));
const selecMoneda = document.getElementById("selectMoneda");

selecMoneda.addEventListener("change", function () {
    // Limpia el contenido principal
    while (main.lastChild) {
        main.removeChild(main.lastChild);
    }

    // Genera tablas según la selección de moneda
    switch (selecMoneda.value) {
        case "Todas":
            for (let i = 0; i < 7; ++i) {
                generar_tabla(array_cotizacion[0][i]);
            }
            generar_tabla(array_cotizacion[1]);
            generar_tabla(array_cotizacion[2]);
            generar_tabla(array_cotizacion[3]);
            generar_tabla(array_cotizacion[4]);
            break;

        case "Dolar Oficial":
            generar_tabla(array_cotizacion[0][0]);
            break;

        case "Dolar Blue":
            generar_tabla(array_cotizacion[0][1]);
            break;

        case "Dolar Bolsa":
            generar_tabla(array_cotizacion[0][2]);
            break;

        case "Dolar Contado Con Liqui":
            generar_tabla(array_cotizacion[0][3]);
            break;

        case "Dolar Mayorista":
            generar_tabla(array_cotizacion[0][4]);
            break;

        case "Dolar Cripto":
            generar_tabla(array_cotizacion[0][5]);
            break;

        case "Dolar Tarjeta":
            generar_tabla(array_cotizacion[0][6]);
            break;

        case "Euro":
            generar_tabla(array_cotizacion[1]);
            break;

        case "Real Brasileño":
            generar_tabla(array_cotizacion[2]);
            break;

        case "Peso Chileno":
            generar_tabla(array_cotizacion[3]);
            break;

        case "Peso Uruguayo":
            generar_tabla(array_cotizacion[4]);
            break;
    }
});

/********************************************************************************
* FECHA Y HORA DE ACTUALIZACIÓN                                                 *
********************************************************************************/

// Actualiza la fecha y hora.
function actualizarFechaHora() {
    let actual_date = new Date();
    let dia = actual_date.getDate().toString().padStart(2, '0');
    let mes = (actual_date.getMonth() + 1).toString().padStart(2, '0');
    let año = actual_date.getFullYear();
    let hora = actual_date.getHours().toString().padStart(2, '0');
    let minutos = actual_date.getMinutes().toString().padStart(2, '0');

    // Se da formato a la fecha y hora.
    let fecha_actualizacion = `Datos actualizados: ${dia}/${mes}/${año} - ${hora}:${minutos} Hs.`;

    // Muestra la fecha y hora en la página.
    document.getElementById("fecha_actualizacion").textContent = fecha_actualizacion;
}

// Actualiza la fecha y hora cada 5 minutos.
setInterval(actualizarFechaHora, 300000);

// Muestra la fecha y hora al cargar la página.
actualizarFechaHora();

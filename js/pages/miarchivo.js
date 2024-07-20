/********************************************************************************
*  Archivo: miarchivo.js                                                        *
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   03-072024                                                           *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* CARGAR MONEDAS GUARDADAS                                                      *
********************************************************************************/

function cargarMonedasGuardadas() {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    let tablaMonedas = document.getElementById("tablaMonedas");
    let sinDatos = document.getElementById("sinDatos");

    // Se muestra un mensaje si no hay datos guardados.
    if (monedasGuardadas.length === 0) {
        sinDatos.style.display = "block";
    } else {
        sinDatos.style.display = "none";
    }

    let monedasPorFecha = {};

    // Organiza las monedas por fecha.
    monedasGuardadas.forEach(moneda => {
        if (!monedasPorFecha[moneda.fecha]) {
            monedasPorFecha[moneda.fecha] = [];
        }
        monedasPorFecha[moneda.fecha].push(moneda);
    });

    // Ordena las fechas de la más reciente a la más antigua.
    let fechasOrdenadas = Object.keys(monedasPorFecha).sort((a, b) => {
        let [diaA, mesA, añoA] = a.split('/').map(Number);
        let [diaB, mesB, añoB] = b.split('/').map(Number);

        if (añoA !== añoB) return añoB - añoA;
        if (mesA !== mesB) return mesB - mesA;
        return diaB - diaA;
    });

    // Crea las filas de la tabla
    fechasOrdenadas.forEach(fecha => {
        monedasPorFecha[fecha].forEach((moneda, index) => {
            let tr = document.createElement("tr");

            // Si es la primera moneda de la fecha, agregar una celda que contenga todas las monedas de esa fecha.
            if (index === 0) {
                let tdFecha = document.createElement("td");
                tdFecha.rowSpan = monedasPorFecha[fecha].length;
                tdFecha.className = "celdaFecha";
                tdFecha.textContent = fecha;
                tr.appendChild(tdFecha);
            }

            // Crea y agrega la celda para el nombre de la moneda.
            let tdMoneda = document.createElement("td");
            tdMoneda.textContent = moneda.moneda;
            tr.appendChild(tdMoneda);

            // Crea y agrega la celda para el valor de compra.
            let tdCompra = document.createElement("td");
            tdCompra.textContent = "$" + moneda.compra;
            tr.appendChild(tdCompra);

            // Crea y agrega la celda para el valor de venta.
            let tdVenta = document.createElement("td");
            tdVenta.textContent = "$" + moneda.venta;
            tr.appendChild(tdVenta);

            // Crea y agrega la celda para la acción de borrar.
            let tdAccion = document.createElement("td");
            let iconoBorrar = document.createElement("i");
            iconoBorrar.className = "fa solid fa-eraser fa-lg";

            // Agrega la función para borrar la moneda.
            iconoBorrar.addEventListener("click", function () {
                borrarMoneda(fecha, moneda);
            });

            tdAccion.appendChild(iconoBorrar);
            tr.appendChild(tdAccion);

            // Agrega la fila a la tabla.
            tablaMonedas.appendChild(tr);
        });
    });
}

/********************************************************************************
* BORRA MONEDAS GUARDADAS EN LOCALSTORAGE                                       *
********************************************************************************/
function borrarMoneda(fecha, moneda) {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    let nuevasMonedasGuardadas = [];

    // Recorre las monedas guardadas y agrega las que no coincidan con la moneda y fecha dadas.
    for (let i = 0; i < monedasGuardadas.length; i++) {
        if (!(monedasGuardadas[i].fecha === fecha && monedasGuardadas[i].moneda === moneda.moneda)) {
            nuevasMonedasGuardadas.push(monedasGuardadas[i]);
        }
    }

    localStorage.setItem("cotizaciones", JSON.stringify(nuevasMonedasGuardadas));
    mostrarAlerta('Cotización borrada!', 'success');
    
    setTimeout(function() {
        location.reload();
    }, 1000);
}

/********************************************************************************
* IMPRIMIR LA VISTA ACTUAL                                                      *
********************************************************************************/
function imprSelec(nombre) {
    var contenido = document.getElementById(nombre).innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    var estiloImpresion = `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    `;

    document.body.innerHTML = estiloImpresion + contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
}

/********************************************************************************
* EVENTO: CARGAR OBJETO DOM                                                     *
********************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    cargarMonedasGuardadas();

    let iconoImpresora = document.querySelector(".fa-print");
    if (iconoImpresora) {
        iconoImpresora.addEventListener("click", function () {
            imprSelec("imprimir");
        });
    }
});

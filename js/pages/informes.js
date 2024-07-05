/********************************************************************************
*  Archivo: informes.js                                                         *
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   03-07-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* FUNCIONES PARA MANEJO DE DATOS DE MONEDAS                                     *
********************************************************************************/

function cargarMonedasGuardadas() {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    mostrarMonedas(monedasGuardadas);
    actualizarGrafica(monedasGuardadas);
}

// Muestra las monedas en una tabla.
function mostrarMonedas(monedas) {
    let tablaMonedas = document.getElementById("tablaMonedas");
    let sinDatos = document.getElementById("sinDatos");
    tablaMonedas.innerHTML = "";

    // Muestra un mensaje si no hay datos guardados.
    if (monedas.length === 0) {
        sinDatos.style.display = "block";
    } else {
        sinDatos.style.display = "none";
    }

    let monedasPorNombre = {};

    // Organiza las monedas por nombre de moneda.
    monedas.forEach(moneda => {
        if (!monedasPorNombre[moneda.moneda]) {
            monedasPorNombre[moneda.moneda] = [];
        }
        monedasPorNombre[moneda.moneda].push(moneda);
    });

    // Crea las filas de la tabla.
    Object.keys(monedasPorNombre).forEach(nombreMoneda => {
        // Ordena las monedas por fecha en orden descendente.
        let monedasOrdenadas = monedasPorNombre[nombreMoneda].sort(function(a, b) {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaB - fechaA;
        });
        
        // Agrega las filas a la tabla HTML.
        monedasOrdenadas.forEach((moneda, index) => {
            let tr = document.createElement("tr");

            // Si es la primera moneda del nombre de moneda, agregar una celda que contenga todas las monedas de ese nombre.
            if (index === 0) {
                let tdMoneda = document.createElement("td");
                tdMoneda.rowSpan = monedasOrdenadas.length;
                tdMoneda.className = "celdaMoneda";
                tdMoneda.textContent = nombreMoneda;
                tr.appendChild(tdMoneda);
            }

            // Crea y agrega la celda para la fecha.
            let tdFecha = document.createElement("td");
            tdFecha.textContent = moneda.fecha;
            tr.appendChild(tdFecha);

            // Crea y agrega la celda para el valor de compra.
            let tdCompra = document.createElement("td");
            tdCompra.textContent = "$" + moneda.compra;
            tr.appendChild(tdCompra);

            // Crea y agrega la celda para el valor de venta.
            let tdVenta = document.createElement("td");
            tdVenta.textContent = "$" + moneda.venta;
            tr.appendChild(tdVenta);

            // Crea y agrega la celda para la variación.
            let tdVariacion = document.createElement("td");
            let elementoVariacion = document.createElement("i");

            // Determina la dirección de la flecha de variación.
            if (index < monedasOrdenadas.length - 1) {
                let precioAnterior = monedasOrdenadas[index + 1].venta;
                if (moneda.venta > precioAnterior) {
                    elementoVariacion.className = "fa solid fa-arrow-up flechaSuba";
                } else if (moneda.venta < precioAnterior) {
                    elementoVariacion.className = "fa solid fa-arrow-down flechaBaja";
                } else {
                    elementoVariacion.textContent = "-";
                }
            } else {
                elementoVariacion.textContent = "-";
            }

            tdVariacion.appendChild(elementoVariacion);
            tr.appendChild(tdVariacion);

            // Agrega la fila a la tabla.
            tablaMonedas.appendChild(tr);
        });
    });
}

// Filtra las monedas mostradas según la selección del usuario.
function filtrarMonedas() {
    let monedasGuardadas = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    let seleccion = document.getElementById("selectMoneda").value;

    if (seleccion === "Todas") {
        mostrarMonedas(monedasGuardadas);
        actualizarGrafica(monedasGuardadas);
    } else {
        let monedasFiltradas = monedasGuardadas.filter(moneda => moneda.moneda === seleccion);
        mostrarMonedas(monedasFiltradas);
        actualizarGrafica(monedasFiltradas);
    }
}

/********************************************************************************
* GRAFICA                                                                       *
********************************************************************************/

let grafica;

// Actualiza la gráfica de líneas con los datos de las monedas.
function actualizarGrafica(monedas) {
    let etiquetas = [];
    let datosPorMoneda = {};

    // Organiza las monedas por nombre y almacena todas las fechas únicas.
    monedas.forEach(moneda => {
        if (!datosPorMoneda[moneda.moneda]) {
            datosPorMoneda[moneda.moneda] = {};
        }
        datosPorMoneda[moneda.moneda][moneda.fecha] = moneda.venta;
        if (!etiquetas.includes(moneda.fecha)) {
            etiquetas.push(moneda.fecha);
        }
    });

    // Ordena las etiquetas de fechas en orden cronológico.
    etiquetas.sort((a, b) => {
        let fechaA = new Date(a);
        let fechaB = new Date(b);
        return fechaA - fechaB;
    });

    // Crea los datos para la gráfica por cada nombre de moneda.
    let datasets = Object.keys(datosPorMoneda).map(nombreMoneda => {
        let data = etiquetas.map(fecha => datosPorMoneda[nombreMoneda][fecha] || null);
        return {
            label: nombreMoneda,
            data: data,
            borderColor: getRandomColor(),
            fill: false
        };
    });

    // Destruye la gráfica existente si ya está creada.
    if (grafica) {
        grafica.destroy();
    }

    const ctx = document.getElementById("graficas").getContext("2d");
    grafica = new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'DD/MM/YYYY'
                    }
                }
            }
        }
    });
}

// Genera un color aleatorio para la gráfica.
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/********************************************************************************
* EVENTO: CARGAR OBJETO DOM                                                     *
********************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
    cargarMonedasGuardadas();
    document.getElementById("selectMoneda").addEventListener("change", filtrarMonedas);
});

/********************************************************************************
*  Archivo: informes.js                                                         *
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   03-07-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* TABLA: funcion que imprime la tabla dentro del objeto main                    *
********************************************************************************/
let main = document.querySelector("main")

function generar_tabla(moneda, fecha, compra, venta, variacion) {

    //Tabla
    let tabla = document.createElement("table");
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")

    let th1 = document.createElement("th")
    let th2 = document.createElement("th")
    let th3 = document.createElement("th")
    let th4 = document.createElement("th")
    let th5 = document.createElement("th")

    //Caption
    let capt = document.createElement("caption")
    let elemento_i = document.createElement("i")
    let elemento_a = document.createElement("a")

    //Icono variación
    let elemento_flecha_baja = document.createElement("i")
    let elemento_flecha_suba = document.createElement("i")

    elemento_flecha_baja.className = "fa solid fa-arrow-down flechaBaja"
    elemento_flecha_suba.className = "fa solid fa-arrow-up flechaSuba"


    //Enlace "compartir infromación"
    elemento_i.className = "fa solid fa-share fa-lg"
    elemento_a.textContent = "Compartir información"
    elemento_a.href = ""

    capt.appendChild(elemento_i)
    capt.appendChild(elemento_a)

    th1.textContent = "Moneda"
    th2.textContent = "Fecha"
    th3.textContent = "Compra"
    th4.textContent = "Venta"
    th5.textContent = "Variacion"

    thead.appendChild(th1)
    thead.appendChild(th2)
    thead.appendChild(th3)
    thead.appendChild(th4)
    thead.appendChild(th5)


    let tr = []
    let td = []

    for (let fila = 0; fila < fecha.length; fila++) {

        tr[fila] = document.createElement("tr")

        //Crea columnas
        for (let col = 0; col < 5; col++) {
            td[col] = document.createElement("td")
        }

        td[0].textContent = moneda[fila]
        td[1].textContent = fecha[fila]
        td[2].textContent = compra[fila]
        td[3].textContent = venta[fila]

        if (variacion[fila]) {
            td[4].innerHTML = elemento_flecha_suba.outerHTML
        }
        else {
            td[4].innerHTML = elemento_flecha_baja.outerHTML
        }

        for (let i = 0; i < 5; i++) {
            tr[fila].appendChild(td[i])
        }

        tbody.appendChild(tr[fila])
    }

    //Agrega Head y Caption a la Tabla
    tabla.appendChild(capt)
    tabla.appendChild(thead)
    tabla.appendChild(tbody)

    //Agrega tabla al main
    main.appendChild(tabla)
}

/********************************************************************************
* Select box                                                                    *
********************************************************************************/
const selecMoneda = document.getElementById("selectMoneda")

/*DATOS DE PRUEBA DE GENERACIÓN DE LA TABLA */
let prueba_moneda = ["Blue", "Blue", "blue", "blue"]
let prueba_fecha = ["1/1/2000", "3/3/2023", "6/5/1984", "6/6/1988"]
let prueba_compra = [10, 12, 33, 55]
let prueba_venta = [12, 33, 21, 41]
let prueba_variacion = [0, 1, 0, 1]

//Gráfica tabla al cambiar a la página
main.removeChild(main.lastChild)
generar_tabla(prueba_moneda, prueba_fecha, prueba_compra, prueba_venta, prueba_variacion)


//Gráfica tabla al seleccionar moneda
selecMoneda.addEventListener("change", function () {
    main.removeChild(main.lastChild)
    generar_tabla(prueba_moneda, prueba_fecha, prueba_compra, prueba_venta, prueba_variacion)
})


/********************************************************************************
* GRAFICA                                                                       *
********************************************************************************/
const etiquetas = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "junio"];
const datos = [100, 150, 120, 200, 0, 20];
const ctx = document.getElementById("graficas").getContext("2d");
new Chart(ctx,
    {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Valor",
                data: datos,
                borderColor: "blue",
                fill: false
            }]
        }
    });
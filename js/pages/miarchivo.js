
/********************************************************************************
* TABLA: funcion que imprime la tabla dentro del objeto main                    *
********************************************************************************/
let main = document.querySelector("main")

function generar_tabla(moneda, fecha, compra, venta, accion){

    //Tabla
    let tabla = document.createElement("table");
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")

    let th1 = document.createElement("th")
    let th2 = document.createElement("th")
    let th3 = document.createElement("th")
    let th4 = document.createElement("th")
    let th5 = document.createElement("th")

    th1.textContent = "Fecha"
    th2.textContent = "Moneda"
    th3.textContent = "Compra"
    th4.textContent = "Venta"
    th5.textContent = "Acción"

    thead.appendChild(th1)
    thead.appendChild(th2)
    thead.appendChild(th3)
    thead.appendChild(th4)
    thead.appendChild(th5)


    let tr = [fecha.length] 
    let td = []

    for (let fila=0; fila< fecha.length ; ++fila)
    {

        tr[fila] = document.createElement("tr")

        //Crea columnas
        for (let col=0; col < 5 ; ++col)
        {
            td[col] = document.createElement("td")    
        }

        td[0].textContent = fecha[fila]
        td[1].textContent = moneda[fila]
        td[2].textContent = compra[fila]
        td[3].textContent = venta[fila]
        td[4].textContent = accion[fila]     


        for (let i=0; i < 5 ; ++i)
        {
            tr[fila].appendChild(td[i])        
        }

        tbody.appendChild(tr[fila])

    }

    //Agrega Head y Caption a la Tabla
    tabla.appendChild(thead)
    tabla.appendChild(tbody)

    //Agrega tabla al main
    main.appendChild(tabla)

}


/********************************************************************************
* TABLA / Carga datos                                                                    *
********************************************************************************/

/*DATOS DE PRUEBA DE GENERACIÓN DE LA TABLA */
let prueba_moneda = ["Blue", "Blue","blue"]
let prueba_fecha = ["1/1/2000", "3/3/2023","6/5/1984"]
let prueba_compra = [10,12,33]
let prueba_venta = [12,33,21]
let prueba_accion = [1,1,1]


//Grafica tabla
main.removeChild(main.lastChild)
generar_tabla(prueba_moneda, prueba_fecha, prueba_compra, prueba_venta, prueba_accion)




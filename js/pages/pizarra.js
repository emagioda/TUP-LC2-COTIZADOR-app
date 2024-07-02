/********************************************************************************
*  Archivo: pizarra.js
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   12-06-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* FUNCION ARMAR Y MOSTRAR ETIQUETAS DE COTIZACIONES                             *
*********************************************************************************/
let main = document.querySelector("main")


//VARIABLES QUE USO PARA LOS BOTONES DE FAVORITOS
let moneda_marcada = [false,false,false,false,false,false,false,false,false,false,false]

const lista_monedas = ["usd_oficial",
                        "usd_blue",
                        "usd_bolsa",
                        "usd_cc",
                        "usd_mayorista",
                        "usd_cripto",
                        "usd_tarjeta",
                        "euro",
                        "brasilero",
                        "chileno",
                        "uruguayo"]


function generar_tabla(datos, tipo_moneda)
{
    
    let tabla = document.createElement("table");
    
    let tr1 = document.createElement("tr")
    let tr2 = document.createElement("tr")    

    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    let td6 = document.createElement("td")

    let elemento_i = document.createElement("i")
    elemento_i.className = "fa solid fa-star fa-lg"
    elemento_i.id = "estrella1"


    //Lee el array donde se guarda el estado de las estrellas y le asigna "azul" si True o "gray" si False
    for (let i=0; i<lista_monedas.length;++i)
        {
            if (lista_monedas[i] == tipo_moneda)      
            {
                if (moneda_marcada[i]==true){
                    elemento_i.style.color="blue"
                }else{

                    elemento_i.style.color="gray"
                }
            }  
        }


    //Evento seleccionar estrella.
    elemento_i.addEventListener("click", function() {
        
        for (let i=0; i<lista_monedas.length;++i)
        {
            if (lista_monedas[i] == tipo_moneda)      
            {
                if (moneda_marcada[i]==true){
                    moneda_marcada[i]=false
                    elemento_i.style.color="gray"
                }else{
                    moneda_marcada[i]=true
                    elemento_i.style.color="blue"
                }
            }  
        }
        //console.log(moneda_marcada)
    });

    

    
    //Columna 1
    td1.className="celdaTipoMoneda"
    td1.rowSpan="2";
    td1.textContent=datos.moneda+" - "+datos.nombre
    td1.style.fontWeight="700"

    //Columna 2
    td2.className = "fila1"
    td2.textContent = "COMPRA"

    //Columna 3
    td3.className = "fila1"
    td3.textContent="VENTA"

    //Columna 4
    td4.rowSpan = "2"
    td4.appendChild(elemento_i)
   
    //Agrega columnas a fila 1
    tr1.appendChild(td1)
    tr1.appendChild(td2)
    tr1.appendChild(td3)
    tr1.appendChild(td4)

    //Columna 1 fila 2
    td5.className = "fila2"
    td5.textContent = "$ " + datos.compra
    td5.style.fontWeight = "700"


    //Columna 2 fila 2
    td6.className = "fila2"
    td6.textContent = "$ "+ datos.venta
    td6.style.fontWeight = "700"

    //Agrega fila 2
    tr2.appendChild(td5)
    tr2.appendChild(td6)

    //Agrega filas a la tabla
    tabla.appendChild(tr1);
    tabla.appendChild(tr2);

    //Agrega tabla al main
    main.appendChild(tabla)
 }

/********************************************************************************
* FILTRA LA SELECCIÓN DE MONEDAS DE LA LISTA                                    *
USD - Oficial	COMPRA	VENTA	
USD - Blue	COMPRA	VENTA	
USD - Bolsa	COMPRA	VENTA	
USD - Contado con liquidación	COMPRA	VENTA	
USD - Mayorista	COMPRA	VENTA	
USD - Cripto	COMPRA	VENTA	
USD - Tarjeta	COMPRA	VENTA	
EUR - Euro	COMPRA	VENTA	
BRL - Real Brasileño	COMPRA	VENTA	
CLP - Peso Chileno	COMPRA	VENTA	
UYU - Peso Uruguayo	COMPRA	VENTA	
********************************************************************************/

let array_cotizacion= JSON.parse(localStorage.getItem("CotizacionActual"))

const selecMoneda = document.getElementById("selectMoneda")

selecMoneda.addEventListener("change", function()
{

    while(main.lastChild){
        main.removeChild(main.lastChild)
    }     
    
    switch (selecMoneda.value){

        case "Todas":
            for (let i=0;i<7;++i){
                generar_tabla(array_cotizacion[0][i],lista_monedas[i]);
            }   
            generar_tabla(array_cotizacion[1],lista_monedas[7]);
            generar_tabla(array_cotizacion[2],lista_monedas[8]);
            generar_tabla(array_cotizacion[3],lista_monedas[9]);
            generar_tabla(array_cotizacion[4],lista_monedas[10]);

            break;

        case "Dolar Oficial":
                generar_tabla(array_cotizacion[0][0],lista_monedas[0]);
            break;    

        case "Dolar Blue":
                generar_tabla(array_cotizacion[0][1],lista_monedas[1]);
            break;

        case "Dolar Bolsa":
                generar_tabla(array_cotizacion[0][2],lista_monedas[2]);
            break;

        case "Dolar Contado Con Liqui":
                generar_tabla(array_cotizacion[0][3],lista_monedas[3]);
            break;

        case "Dolar Mayorista":
                generar_tabla(array_cotizacion[0][4],lista_monedas[4]);
            break;

        case "Dolar Cripto":
                generar_tabla(array_cotizacion[0][5],lista_monedas[5]);
            break;

        case "Dolar Tarjeta":
                generar_tabla(array_cotizacion[0][6],lista_monedas[6]);
            break;

        case "Euro":
                generar_tabla(array_cotizacion[1],lista_monedas[7]);
            break;    

        case "Real Brasileño":
                generar_tabla(array_cotizacion[2],lista_monedas[8]);
            break; 

        case "Peso Uruguayo":
                generar_tabla(array_cotizacion[3],lista_monedas[9]);
            break;  
            
        case "Peso Chileno":
                generar_tabla(array_cotizacion[4],lista_monedas[10]);
            break; 

    }

})


/********************************************************************************
* FECHA Y HORA DE ACTUALIZACIÓN                                                 *
********************************************************************************/
let actual_date = ""

actual_date = array_cotizacion[1].fechaActualizacion

let cadena = actual_date.substring(8,10) 
            + "/"+actual_date.substring(5,7)
            + "/"+actual_date.substring(0,4)
            + " - "+actual_date.substring(11,16)
            + " Hs."

document.getElementById("fecha_actualizacion").innerText = "Datos actualizados: "+ cadena



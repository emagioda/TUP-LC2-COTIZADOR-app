/********************************************************************************
*  Archivo: pizarra.js                                                          *
*  Autores: Emanuel Gioda / Juan M. Banquero                                    *
*  Fecha:   03-07-2024                                                          *
*  Materia: Laboratorio de computación II                                       *       
********************************************************************************/

/********************************************************************************
* GENERAR TABLA                                                                 *
********************************************************************************/
let main = document.querySelector("main");

//VARIABLES QUE USO PARA LOS BOTONES DE FAVORITOS
let moneda_marcada = [false,false,false,false,false,false,false,false,false,false,false]

/* 
Uso este array en la llamada a la funcion 'generar_tabla()' para identificar luego en que moneda 
hace "click" el usuario para guardar los datos 
*/

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

        //Llamada a funcion de guardar los datos de usuarios en local storage
        guardarDatos(datos)
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
* GUARDA COTIZACIONES DE USUARIO EN LOCAL STORAGE                               *
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
* FILTRAR LA SELECCIÓN DE MONEDAS DE LA LISTA E IMPRIMIR TABLA                  *
********************************************************************************/

let array_cotizacion = JSON.parse(localStorage.getItem("CotizacionActual"));
const selecMoneda = document.getElementById("selectMoneda");

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

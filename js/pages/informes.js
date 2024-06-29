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
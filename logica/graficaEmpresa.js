$(document).ready(function() {
    $("#salir").click(pantallaCarga);
    $("#iniciar").click(pabtallaCargaInicio);
});

function pantallaCarga() {
    const loader = document.getElementById('loader'); // Obtenemos el elemento
    loader.style.display = 'flex'; // Mostramos
    setTimeout(function() {
    window.location.href = "../interfaz/logout.php";
        }, 2000);
}

function pabtallaCargaInicio() {
    const loader = document.getElementById('cargando'); // Obtenemos el elemento
    loader.style.display = 'flex'; // Mostramos
    setTimeout(function() {
    window.location.href = "../interfaz/login.html";
        }, 2000);
}

$.ajax({
    url: '../persistencia/empresa/empresa.php?accion=graficaVentasEmpresa&idEmpresa=1',
    method: 'GET',
    dataType: 'json',
    success: function(data) {

        // Crear un array para las ventas y otro para los meses
        const ventas = new Array(12).fill(0); // Inicializa un array con 12 posiciones, todas con el valor 0
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        // Recorrer los datos y llenar el array de ventas
        data.forEach(item => {
            const mes = item.Mes; // Asegúrate de que esto corresponde al mes que regresaste en el SQL
            const ventasCount = item.ventas;

            if (mes >= 1 && mes <= 12) {
                ventas[mes - 1] += ventasCount; // Sumar las ventas al mes correspondiente
            }
        });

        const ctx = document.getElementById('ventas').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // Cambia a 'line'
            data: {
                labels: meses, // Usar el array de meses
                datasets: [{
                    label: 'Número de Ventas',
                    data: ventas, // Usar el array de ventas
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true, // Para rellenar el área bajo la línea
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1 // Cambiar el tamaño del paso a 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', error);
    }
});

$.ajax({
    url: '../persistencia/empresa/empresa.php?accion=graficaTotalGenerado',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        // Inicializar el arreglo de ventas con ceros para cada mes
        const ventas = Array(12).fill(0);

        // Iterar sobre los datos devueltos
        data.forEach(item => {
            // Obtener el mes del formato YYYY-MM
            const [year, month] = item.mes.split('-'); // Descomponer la cadena
            const mesIndex = parseInt(month) - 1; // Convertir a índice de 0 (Enero = 0)

            // Sumar las ventas al mes correspondiente
            ventas[mesIndex] += item.ventas; // Asumimos que item.ventas ya tiene el valor correcto
        });

        const ctx = document.getElementById('totalVentas').getContext('2d');
        const ventasBarras = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                    'Junio', 'Julio', 'Agosto', 'Septiembre',
                    'Octubre', 'Noviembre', 'Diciembre'
                ], // Etiquetas para cada mes
                datasets: [{
                    label: 'Total Generado por Ventas ($)',
                    data: ventas, // Datos de ventas procesados
                    backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color de las barras
                    borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true, // Comienza en 0
                        title: {
                            display: true,
                            text: 'Total Generado ($)' // Título del eje Y
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Meses' // Título del eje X
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top', // Posición de la leyenda
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: $${tooltipItem.raw}`; // Formato del tooltip
                            }
                        }
                    }
                }
            }
        });
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', error);
    }
});

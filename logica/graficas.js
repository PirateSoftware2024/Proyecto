$(document).ready(function() {
    $.ajax({
        url: '../persistencia/usuario/usuario.php?accion=grafica', // Cambia esta ruta a tu archivo PHP
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Crear arreglos para los nombres y las compras
            const nombres = data.map(item => `${item.nombre} (ID: ${item.idUsuario})`);
            const compras = data.map(item => item.compras);

            const ctx = document.getElementById('usuarios');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Número de Compras',
                        data: compras,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1.5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,  // Comienza desde cero
                            min: 0,             // Establece el valor mínimo en 1
                            ticks: {
                                stepSize: 1      // Incrementos de 1 en 1
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


    $.ajax({
        url: '../persistencia/producto/producto.php?accion=grafica', // Cambia esta ruta a tu archivo PHP
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Crear arreglos para los nombres y las compras
            const nombres = data.map(item => `${item.nombre} (ID: ${item.id})`);
            const compras = data.map(item => item.compras);

            const ctx = document.getElementById('productos');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Número de Compras',
                        data: compras,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1.5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,  // Comienza desde cero
                            min: 0,             // Establece el valor mínimo en 1
                            ticks: {
                                stepSize: 1      // Incrementos de 1 en 1
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


    $.ajax({
        url: '../persistencia/empresa/empresa.php?accion=grafica', // Cambia esta ruta a tu archivo PHP
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Crear arreglos para los nombres y las compras
            const nombres = data.map(item => `${item.nombre} (ID: ${item.idEmpresa})`);
            const compras = data.map(item => item.ventas);

            const ctx = document.getElementById('empresa');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Número de Ventas',
                        data: compras,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1.5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,  // Comienza desde cero
                            min: 0,             // Establece el valor mínimo en 1
                            ticks: {
                                stepSize: 1      // Incrementos de 1 en 1
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

    $(document).ready(function() {
        $.ajax({
            url: '../persistencia/pedidos/pedidos.php?accion=grafica', // Cambia esta ruta a tu archivo PHP
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Crear arreglos para los nombres y las ventas
                const nombres = data.map(item => item.nombre);
                const ventas = data.map(item => item.ventas);
                
                // Calcular el total de ventas
                const totalVentas = ventas.reduce((acc, current) => acc + current, 0);
                
                // Mostrar el total de ventas en un elemento HTML
                $('#totalVentas').html(`Total de Ventas: $${totalVentas}`);
    
                const ctx = document.getElementById('total').getContext('2d');
                const ventasPastel = new Chart(ctx, {
                    type: 'pie', // Cambia a 'doughnut' si prefieres un gráfico de dona
                    data: {
                        labels: nombres,
                        datasets: [{
                            label: 'Total de Ventas',
                            data: ventas,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(255, 205, 86, 0.5)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 205, 86, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        const label = tooltipItem.label || '';
                                        const value = tooltipItem.raw || 0;
                                        return `${label}: ${value}`;
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
    });    
});
/*
const ctx = document.getElementById('myChart');
const names = ['Carlos', 'Pedro', 'Maria'];
const ages = [24, 10, 24];

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: 'Edad',
            data: ages, 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1.5
        }]
    }
});
*/
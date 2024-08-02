fetch('databaseconectar.php')
    .then(response => response.text())
    .then(data => {
        console.log('Datos recibidos:', data);
        //Pasamos datos a JSON
        const jsonData = JSON.parse(data);
        console.log('Datos JSON:', jsonData);
        mostrarDatos(jsonData);
    });


function mostrarDatos(jsonData){
    for(let i=0;i<jsonData.length;i++){
        $("#mostrarDatos").append("Nombre: "+jsonData[i].nombre+"   Cedula: "+jsonData[i].ci+"<br>");
    }
}
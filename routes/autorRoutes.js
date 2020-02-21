const express = require('express');
//se require los metodos que trae la libreria mssql de npm y se agregan en la variable sql
//para mas información leer la documentacion https://www.npmjs.com/package/mssql
const sql = require('mssql');

//Se requiere la configuración de el archivo que esta en la carpeta config/config.js
//Hay que acceder a la ruta  del archivo, los dos puntos significan retroceder entre directorios
//para más información  https://pressroom.hostalia.com/white-papers/rutas-absolutas-y-relativas/
const config = require('../config/config');

//se guardan los metodos de express en la variable app
//para más información verificar la documentación oficial de express 
//https://www.npmjs.com/package/express
const app = express();

//rutas de express https://www.npmjs.com/package/express


//==============================================================================
//                                 CONSIDERACIONES
//*************************************************************************** */
//las rutas tipo get si pueden ser puestas en un navegador
//las rutas post,put, delete tienen que ser probadas en postman.
//los nombres de las api no se pueden repetir con el mismo verbo 
//ejemplo GET api/mensaje y POST api/mensaje si se puede porque son diferente verbo http 
//POST api/mensajeInicial POST api/mensajeInicial no se puede esta misma ruta dos veces por el mismo metodo http
//Investigar y leer sobre esto
//==============================================================================



//======================================================================================
//Ruta o direccion del api para ser llamada 
//localhost:3000/api/autores 
//====================================================================================
app.get('/autores', async function(req, res) { //req(peticion del cliente), res(respuesta del servidor)

    //conexion a la base de datos sqlServer https://www.npmjs.com/package/mssql
    //el resultado obtenido se almacena en la variable resultado que esa es la que 
    //se le envia al cliente(navegador)
    const resultado = await sql.connect(config).then((pool) => { //https://www.npmjs.com/package/mssql


        return pool.request()
            .execute('Autor.spAutorMostrar');


    }).catch(err => {
        return err;
    });

    return res.send(resultado);

});

//======================================================================================
//Ruta o direccion del api para ser llamada en postman
//localhost:3000/api/autor
//====================================================================================

app.post('/autor', async function(req, res) { //req(peticion del cliente), res(respuesta del servidor)

    //conexion a la base de datos sqlServer https://www.npmjs.com/package/mssql
    //el resultado obtenido se almacena en la variable resultado que esa es la que 
    //se le envia al cliente(navegador)
    const resultado = await sql.connect(config).then((pool) => { //https://www.npmjs.com/package/mssql


        //ver la documentacion
        return pool.request()
            .input('nombre parametro procedimiento', sql.Nvarchar, 'valor enviado desde postman')
            .execute('nombre procedimiento');


    }).catch(err => {
        //retorna error en caso de haber dentro del try
        return err;
    });

    return res.send(resultado);

});



//======================================================================================
//Ruta o direccion del api para ser llamada 
//localhost:3000/api/autor  la misma de crear pero con diferente verbo http en esta caso PUT
//====================================================================================

app.put('/autor', async function(req, res) { //req(peticion del cliente), res(respuesta del servidor)

    //conexion a la base de datos sqlServer https://www.npmjs.com/package/mssql
    //el resultado obtenido se almacena en la variable resultado que esa es la que 
    //se le envia al cliente(navegador)
    const resultado = await sql.connect(config).then((pool) => { //https://www.npmjs.com/package/mssql


        //ver la documentacion
        //los parametros pueden ser mas de uno
        return pool.request()
            .input('nombre parametro procedimiento', sql.Nvarchar, 'valor enviado desde postman')
            .execute('nombre procedimiento');


    }).catch(err => {
        //retorna error en caso de haber dentro del try
        return err;
    });

    return res.send(resultado);

});


//exportamos la configuracion de la variable app para ser usada en otro archivo
module.exports = app;
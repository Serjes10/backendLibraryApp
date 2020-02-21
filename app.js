const express = require('express');


const app = express();

//importar rutas 
const autorRoutes = require('./routes/autorRoutes');



/*  app.get('/prueba', (req,res)=>{
    
     res.send({mensaje: 'Primer api'})
}); */

//ejecutar rutas  
//Es un middleware investigar el concepto general y orientado a express
app.use('/api', autorRoutes);

//Escuchar el puerto 
app.listen(3000, function() {
    console.log('corriendo en el puerto 3000');
});
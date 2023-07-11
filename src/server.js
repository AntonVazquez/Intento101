const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Añadido

// Importa los routers
const routers = require('./routes/index');

// Inicializa la app Express
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs'); // Añadido
app.set('views', path.join(__dirname, 'views')); // Añadido

// Configura la app para usar archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'))); // Añadido

// Conecta a la base de datos
const uri = "mongodb+srv://antonvazquez99:Pical@cluster0.wk1crns.mongodb.net/?retryWrites=true&w=majority";

// Comprueba que la conexión a la base de datos se ha realizado correctamente
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Configura el middleware
app.use(cors());
app.use(bodyParser.json());

// Configura las rutas
app.use('/api', routers);

// Inicia el servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

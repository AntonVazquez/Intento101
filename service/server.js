require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importa los routers
const routers = require('./routes/index');

// Inicializa la app Express
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Configura la app para usar archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/', (req, res) => {
    let data = {
        title: "Home Page",
        username: "Anton"
    }
    res.render('Register', data);
});


// Conecta a la base de datos
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Comprueba que la conexión a la base de datos se ha realizado correctamente
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Configura el middleware
app.use(cors());
app.use(bodyParser.json());

// Configura las rutas
routers(app); // Usar la función importada de routers para configurar las rutas

// Inicia el servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


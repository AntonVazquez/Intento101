require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash'); // Importamos el modulo connect-flash

// Importa los routers
const routers = require('./routes/index');

// Inicializa la app Express
const app = express();

// Configura EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Configura la app para usar archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// Configura sesiones para manejar la autenticación del usuario
app.use(session({
  secret: process.env.SECRET, // Deberías considerar almacenar la llave secreta en un archivo .env
  resave: false,
  saveUninitialized: false
}));

// Configura connect-flash para los mensajes flash
app.use(flash());

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Configura Passport
require('./config/passportConfig')(passport);

app.get('/', (req, res) => {
  
  res.render('home');
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
app.use(bodyParser.urlencoded({ extended: true })); // Esto analiza las solicitudes x-www-form-urlencoded

// Configura las rutas
routers(app); // Usar la función importada de routers para configurar las rutas

// Inicia el servidor
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

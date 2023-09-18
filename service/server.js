const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
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

// Conecta a la base de datos
const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Configura MongoDBStore con la URL de MongoDB
const store = MongoDBStore.create({ 
  mongoUrl: process.env.DB_URL, 
  mongooseConnection: mongoose.connection, 
  collection: 'sessions' 
});

// Configura sesiones para manejar la autenticación del usuario
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: store
}));

// Configura connect-flash para los mensajes flash
app.use(flash());

// Implementa middleware para hacer 'user' accesible en las vistas y exponer mensajes flash
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.warning = req.flash('warning');
  next();
});

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Implementa middleware para hacer 'user' accesible en las vistas
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Configura Passport
require('./config/passportConfig')(passport);

app.get('/', (req, res) => {
  res.render('home');
});

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

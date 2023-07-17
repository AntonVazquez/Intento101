const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');  
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // si estás utilizando el email para iniciar sesión.
    async (email, password, done) => {
      // Busca el usuario en la base de datos
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: 'No se encontró el usuario.' });
      }

      // Verifica la contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }

      return done(null, user);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}

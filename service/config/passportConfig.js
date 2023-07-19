const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');  

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // si estás utilizando el email para iniciar sesión.
    async (email, password, done) => {
      // Busca el usuario en la base de datos
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: 'No se encontró el usuario.' });
      }

      // Verifica la contraseña utilizando comparePassword
      try {
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
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
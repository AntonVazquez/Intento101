const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define el esquema para un usuario
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(v) {
        return /.+@.+\..+/.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido!`
    },
  },
  username: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(v) {
        // No permitas caracteres especiales en el nombre de usuario
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: props => `${props.value} no es un nombre de usuario válido!`
    },
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  savedMenus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu'
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // añade campos createdAt y updatedAt
});

// Antes de guardar el usuario, encripta la contraseña
UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Método para verificar la contraseña
UserSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);

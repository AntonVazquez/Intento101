const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    
    user.password = hash;
  }

  next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        console.log('Error al comparar contraseñas:', err);
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

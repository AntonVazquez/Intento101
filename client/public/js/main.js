// main.js

// Espacio para importar módulos externos (si es necesario)
// Por ejemplo: import axios from 'axios';

// Funciones globales que pueden ser utilizadas en múltiples partes de tu aplicación.

function showAlert(message, type) {
    // Aquí puedes agregar código para mostrar una alerta en tu aplicación.
    // message es el texto que quieres mostrar y type es, por ejemplo, 'error' o 'success'
  }
  
  function handleApiError(error) {
    // Esta función puede manejar errores que vienen de tus llamadas API
    showAlert(error.message, 'error');
  }
  
  // Aquí puedes agregar más funciones que creas que serán útiles en diferentes partes de tu aplicación.
  
  // Eventos globales, como un evento que se ejecuta cuando la página se carga.
  
  window.onload = function() {
    // Aquí puedes agregar código que quieres que se ejecute cuando la página se cargue.
    // Por ejemplo, puedes querer cargar algunos datos iniciales de tu API.
  }
  
  // También puedes querer agregar un evento global de manejo de errores.
  
  window.onerror = function(error) {
    // Aquí puedes agregar código para manejar cualquier error no capturado en tu aplicación.
    handleApiError(error);
  }
  
$(document).ready(function() {
    $("form").on("submit", function(e) {
      // Inicializar una bandera de error a false
      var error = false;
  
      // Limpiar cualquier error de la validación anterior
      $(".error").remove();
  
      // Validar el correo electrónico
      var email = $("#email").val();
      if (!validateEmail(email)) {
        $("#email").after('<div class="error">Por favor, introduce un correo electrónico válido</div>');
        error = true;
      }
  
      // Validar la contraseña
      var password = $("#password").val();
      if (password.length < 8) {
        $("#password").after('<div class="error">La contraseña debe tener al menos 8 caracteres</div>');
        error = true;
      }
  
      // Si hay algún error, prevenir el envío del formulario
      if (error) {
        e.preventDefault();
      }
    });
  
    // Función para validar el correo electrónico
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  });
  

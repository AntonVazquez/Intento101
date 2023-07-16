$(document).ready(function() {
    // Cuando se envíe el formulario
    $("form").on("submit", function(e) {
      // Inicia una bandera de error en false
      var error = false;
  
      // Limpia cualquier error de la validación anterior
      $(".error").remove();
  
      // Valida los campos (esto se puede personalizar según tus necesidades)
      var username = $("#username").val();
      if (username.length === 0) {
        $("#username").after('<div class="error">El nombre de usuario es requerido.</div>');
        error = true;
      }
  
      var email = $("#email").val();
      if (email.length === 0) {
        $("#email").after('<div class="error">El email es requerido.</div>');
        error = true;
      } else if (!email.includes('@')) {
        $("#email").after('<div class="error">El email no es válido.</div>');
        error = true;
      }
  
      var password = $("#password").val();
      if (password.length === 0) {
        $("#password").after('<div class="error">La contraseña es requerida.</div>');
        error = true;
      }
  
      var passwordConfirm = $("#passwordConfirm").val();
      if (passwordConfirm.length === 0) {
        $("#passwordConfirm").after('<div class="error">La confirmación de la contraseña es requerida.</div>');
        error = true;
      } else if (passwordConfirm !== password) {
        $("#passwordConfirm").after('<div class="error">Las contraseñas no coinciden.</div>');
        error = true;
      }
  
      // Si hay algún error, previene el envío del formulario
      if (error) {
        e.preventDefault();
      }
    });
  });
  
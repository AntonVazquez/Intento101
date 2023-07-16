$(document).ready(function() {
  // Esto se ejecuta cuando la página ha terminado de cargar

  // Funciones de ayuda globales
  function showError(message) {
    // Muestra un mensaje de error al usuario
    alert("Error: " + message);
  }

  function showSuccess(message) {
    // Muestra un mensaje de éxito al usuario
    alert("Éxito: " + message);
  }

  // Configuración global de la biblioteca
  $.ajaxSetup({
    error: function(jqXHR, textStatus, errorThrown) {
      // Si ocurre un error en una solicitud AJAX, muestra un mensaje de error
      showError(errorThrown);
    },
    beforeSend: function(xhr, settings) {
      // Esto se ejecuta antes de que se envíe una solicitud AJAX
      // Podrías usarlo para, por ejemplo, mostrar una animación de carga
    },
    complete: function(xhr, textStatus) {
      // Esto se ejecuta cuando una solicitud AJAX ha terminado
      // Podrías usarlo para, por ejemplo, ocultar la animación de carga
    }
  });

  // Código común a todas las páginas
  $(".navbar .nav-link").on("click", function() {
    // Cuando el usuario hace clic en un enlace en la barra de navegación,
    // destaca el enlace actualmente activo
    $(".navbar .nav-link").removeClass("active");
    $(this).addClass("active");
  });
});

  
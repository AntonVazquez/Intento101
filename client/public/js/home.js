$(document).ready(function() {
    // Manejar los clics en los enlaces de "Guardar" para recetas y menús
    $(".save-link").click(function(event) {
      event.preventDefault();
  
      var type = $(this).data("type");
      var id = $(this).data("id");
  
      $.post("/" + type + "/save/" + id)
        .done(function(data) {
          if (data.status === "success") {
            // Actualizar el enlace a "Quitar" si la operación fue exitosa
            $("#" + type + "-save-link-" + id).replaceWith('<a href="/' + type + '/unsave/' + id + '" class="card-link unsave-link" data-type="' + type + '" data-id="' + id + '">Quitar de mis ' + type + 's</a>');
          }
        });
    });
  
    // Manejar los clics en los enlaces de "Quitar" para recetas y menús
    $(".unsave-link").click(function(event) {
      event.preventDefault();
  
      var type = $(this).data("type");
      var id = $(this).data("id");
  
      $.post("/" + type + "/unsave/" + id)
        .done(function(data) {
          if (data.status === "success") {
            // Actualizar el enlace a "Guardar" si la operación fue exitosa
            $("#" + type + "-unsave-link-" + id).replaceWith('<a href="/' + type + '/save/' + id + '" class="card-link save-link" data-type="' + type + '" data-id="' + id + '">Guardar ' + type + '</a>');
          }
        });
    });
  });
  

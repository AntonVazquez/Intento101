$(document).ready(function() {
    // Maneja los clics en los botones de gestión
    $(".manage-btn").click(function() {
      var action = $(this).data("action");
      var id = $(this).data("id");
      var type = $(this).data("type");
  
      // Envía una solicitud AJAX para gestionar el recurso
      $.post("/admin/" + type + "/manage", { action: action, id: id })
        .done(function(data) {
          // Actualiza la vista de acuerdo con la respuesta
          if (data.status === "success") {
            switch (action) {
              case "activate":
                $("#" + type + "-" + id + " .status").text("Activado");
                break;
              case "deactivate":
                $("#" + type + "-" + id + " .status").text("Desactivado");
                break;
              case "delete":
                $("#" + type + "-" + id).remove();
                break;
            }
          }
        });
    });
    
    // Cargar dinámicamente los usuarios, recetas y menús en el panel de control del administrador
    $("#control-panel-link").click(function() {
      // Obtener usuarios
      $.get("/admin/users")
        .done(function(data) {
          // Procesar y mostrar los datos de los usuarios
        });
      
      // Obtener recetas
      $.get("/admin/recipes")
        .done(function(data) {
          // Procesar y mostrar los datos de las recetas
        });
  
      // Obtener menús
      $.get("/admin/menus")
        .done(function(data) {
          // Procesar y mostrar los datos de los menús
        });
    });
  });
  
  
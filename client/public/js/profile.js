$(document).ready(function() {
    // Manejar los clics en los enlaces para guardar y desguardar recetas
    $(".save-recipe-link").click(function(event) {
      event.preventDefault();
  
      var recipeId = $(this).data("recipe-id");
  
      $.post("/recipes/save/" + recipeId)
        .done(function(data) {
          if (data.status === "success") {
            // Actualizar el enlace para reflejar que la receta está guardada
            $(event.target).text("Quitar de mis recetas").attr("href", "/recipes/unsave/" + recipeId);
          } else {
            // Mostrar un mensaje de error si no se pudo guardar la receta
            alert("Error al guardar la receta. Por favor, inténtalo de nuevo más tarde.");
          }
        });
    });
  
    // Similar a guardar recetas, también manejamos los clics para guardar y desguardar menús
    $(".save-menu-link").click(function(event) {
      event.preventDefault();
  
      var menuId = $(this).data("menu-id");
  
      $.post("/menus/save/" + menuId)
        .done(function(data) {
          if (data.status === "success") {
            // Actualizar el enlace para reflejar que el menú está guardado
            $(event.target).text("Quitar de mis menús").attr("href", "/menus/unsave/" + menuId);
          } else {
            // Mostrar un mensaje de error si no se pudo guardar el menú
            alert("Error al guardar el menú. Por favor, inténtalo de nuevo más tarde.");
          }
        });
    });
  });
  

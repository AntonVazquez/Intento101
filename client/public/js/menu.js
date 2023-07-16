$(document).ready(function() {
    // Manejar los clics en el botón de "Comparar precios"
    $("#compare-prices-button").click(function(event) {
      event.preventDefault();
  
      var menuId = $(this).data("menu-id");
  
      $.get("/menus/" + menuId + "/comparePrices")
        .done(function(data) {
          if (data.status === "success") {
            // Mostrar los precios comparados en una nueva ventana o modal
            window.open("/menus/" + menuId + "/prices");
          } else {
            // Mostrar un mensaje de error si la comparación de precios falló
            alert("La comparación de precios falló. Por favor, inténtalo de nuevo más tarde.");
          }
        });
    });
  });

$(document).ready(function() {
    var $recipeCards = $(".recipe-list .card");
    var $menuCards = $(".menu-list .card");
  
    // Cuando se cambia el valor del selector, se filtran los resultados de la búsqueda.
    $("#filter-type").change(function() {
      var selectedType = $(this).val();
  
      // Mostrar todas las tarjetas si el tipo seleccionado es 'all'
      if (selectedType === "all") {
        $recipeCards.show();
        $menuCards.show();
      } 
      // Mostrar sólo las tarjetas de recetas si el tipo seleccionado es 'recipes'
      else if (selectedType === "recipes") {
        $recipeCards.show();
        $menuCards.hide();
      } 
      // Mostrar sólo las tarjetas de menús si el tipo seleccionado es 'menus'
      else if (selectedType === "menus") {
        $recipeCards.hide();
        $menuCards.show();
      }
    });
  });
  

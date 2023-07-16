$(document).ready(function() {
    var ingredientCount = 1; // Iniciamos el contador en 1 ya que ya hay un ingrediente en el formulario
  
    // Cuando se presione el botón "Añadir ingrediente"
    $("#addIngredient").on("click", function(e) {
      e.preventDefault(); // Evitar que se envíe el formulario
  
      // Clonar el primer grupo de ingredientes
      var newIngredientGroup = $(".ingredient-group:first").clone();
  
      // Limpiar los valores de los campos
      newIngredientGroup.find("input").val("");
  
      // Añadir el nuevo grupo de ingredientes al final
      $("#recipeIngredients").append(newIngredientGroup);
  
      // Incrementar el contador de ingredientes
      ingredientCount++;
    });
  
    // Cuando se envíe el formulario
    $("form").on("submit", function(e) {
      // Inicializar una bandera de error a false
      var error = false;
  
      // Limpiar cualquier error de la validación anterior
      $(".error").remove();
  
      // Validar los campos (esto se puede personalizar según tus necesidades)
      var recipeName = $("#recipeName").val();
      if (recipeName.length === 0) {
        $("#recipeName").after('<div class="error">El nombre de la receta es requerido.</div>');
        error = true;
      }
  
      var recipeDescription = $("#recipeDescription").val();
      if (recipeDescription.length === 0) {
        $("#recipeDescription").after('<div class="error">La descripción de la receta es requerida.</div>');
        error = true;
      }
  
      var recipeInstructions = $("#recipeInstructions").val();
      if (recipeInstructions.length === 0) {
        $("#recipeInstructions").after('<div class="error">Las instrucciones de la receta son requeridas.</div>');
        error = true;
      }
  
      var recipeCategory = $("#recipeCategory").val();
      if (recipeCategory === "") {
        $("#recipeCategory").after('<div class="error">La categoría de la receta es requerida.</div>');
        error = true;
      }
  
      // Si hay algún error, prevenir el envío del formulario
      if (error) {
        e.preventDefault();
      }
    });
  });
  
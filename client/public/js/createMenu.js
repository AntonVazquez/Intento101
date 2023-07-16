$(document).ready(function() {
    var recipeCount = 1; // Inicia el contador en 1 ya que ya hay una receta en el formulario
  
    // Cuando se presione el botón "Añadir receta"
    $("#addRecipe").on("click", function(e) {
      e.preventDefault(); // Evita que se envíe el formulario
  
      // Crea un nuevo campo de entrada para la receta
      var newInput = $("<input>").attr({
        "class": "form-control",
        "type": "text",
        "name": "menuRecipes[]",
        "placeholder": "ID de la receta",
        "required": true
      });
  
      // Añade el nuevo campo de entrada al final
      $("#menuRecipes").append(newInput);
  
      // Incrementa el contador de recetas
      recipeCount++;
    });
  
    // Cuando se envíe el formulario
    $("form").on("submit", function(e) {
      // Inicia una bandera de error en false
      var error = false;
  
      // Limpia cualquier error de la validación anterior
      $(".error").remove();
  
      // Valida los campos (esto se puede personalizar según tus necesidades)
      var menuName = $("#menuName").val();
      if (menuName.length === 0) {
        $("#menuName").after('<div class="error">El nombre del menú es requerido.</div>');
        error = true;
      }
  
      var menuDescription = $("#menuDescription").val();
      if (menuDescription.length === 0) {
        $("#menuDescription").after('<div class="error">La descripción del menú es requerida.</div>');
        error = true;
      }
  
      var menuType = $("#menuType").val();
      if (menuType === "") {
        $("#menuType").after('<div class="error">El tipo de menú es requerido.</div>');
        error = true;
      }
  
      // Si hay algún error, previene el envío del formulario
      if (error) {
        e.preventDefault();
      }
    });
  });
  
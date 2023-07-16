$(document).ready(function() {
    // Asignar un controlador de eventos click a todos los enlaces de "Guardar receta"
    $(".card-link.save-recipe").on("click", function(e) {
        e.preventDefault();  // Prevenir la acción por defecto del enlace (navegar a la URL)

        // Obtener la URL del enlace
        var url = $(this).attr("href");

        // Enviar una petición AJAX a la URL
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                // En caso de éxito, cambiar el enlace a "Quitar de mis recetas"
                $(e.target).attr("href", "/recipes/unsave/" + data.recipeId);
                $(e.target).text("Quitar de mis recetas");
            }
        });
    });

    // Similar para los enlaces de "Quitar de mis recetas"
    $(".card-link.unsave-recipe").on("click", function(e) {
        e.preventDefault();

        var url = $(this).attr("href");

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                $(e.target).attr("href", "/recipes/save/" + data.recipeId);
                $(e.target).text("Guardar receta");
            }
        });
    });
});

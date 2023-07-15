/* recipe.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al hacer clic en el botón de guardar receta
    $('.recipe-save-button').on('click', function(e) {
        e.preventDefault();

        // Aquí puedes llamar a la API para guardar la receta, por ejemplo:
        // $.post('/api/saveRecipe', { recipeId: $(this).data('id') })
        //   .done(function() { alert('Receta guardada con éxito.'); })
        //   .fail(function() { alert('Error al guardar la receta.'); });
    });
});

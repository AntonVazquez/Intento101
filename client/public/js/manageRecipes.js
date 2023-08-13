$(document).ready(function() {
    $('.delete-recipe').on('click', function() {
      const recipeId = $(this).data('id');
      const actionUrl = `/admin/recipes/${recipeId}`;
  
      $.ajax({
        url: actionUrl,
        type: 'DELETE',
        success: function() {
          window.location.href = '/admin/manageRecipes';
        },
        error: function(error) {
          console.error('Error al eliminar receta:', error);
        }
      });
    });
});

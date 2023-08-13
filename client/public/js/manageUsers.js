$(document).ready(function() {
    $('.delete-user').on('click', function() {
      const userId = $(this).data('id');
      const actionUrl = `/admin/users/${userId}`;
  
      $.ajax({
        url: actionUrl,
        type: 'DELETE',
        success: function() {
          // Redirigir o actualizar la página después de la eliminación exitosa
          window.location.href = '/admin/users';
        },
        error: function(error) {
          console.error('Error al eliminar usuario:', error);
        }
      });
    });
  });
  

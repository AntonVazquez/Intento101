$(document).ready(function() {
    $('.delete-menu').on('click', function() {
      const menuId = $(this).data('id');
      const actionUrl = `/admin/menus/${menuId}`;
  
      $.ajax({
        url: actionUrl,
        type: 'DELETE',
        success: function() {
          // Redirigir o actualizar la página después de la eliminación exitosa
          window.location.href = '/admin/manageMenus';
        },
        error: function(error) {
          console.error('Error al eliminar menú:', error);
        }
      });
    });
  });
  
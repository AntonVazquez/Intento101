/* admin.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al hacer clic en el botón de eliminar usuario
    $('.admin-dashboard .btn-delete').on('click', function(e) {
        e.preventDefault();

        // Aquí puedes llamar a la API para eliminar el usuario, por ejemplo:
        // $.post('/api/admin/deleteUser', { userId: $(this).data('user-id') })
        //   .done(function() { location.reload(); })
        //   .fail(function() { alert('Error al eliminar el usuario.'); });
    });
});

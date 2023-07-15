/* profile.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al hacer clic en el botón de edición del perfil
    $('.profile-edit-button').on('click', function(e) {
        e.preventDefault();

        // Redirigir al usuario a la página de edición del perfil
        window.location.href = '/profile/edit';
    });
});

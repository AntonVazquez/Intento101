/* home.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al hacer clic en una tarjeta de receta
    $('.recipe-card').on('click', function() {
        let recipeId = $(this).data('id');
        // Redirigir al usuario a la página de detalles de la receta
        window.location.href = '/recipe/' + recipeId;
    });

    // Evento al hacer clic en una tarjeta de menú
    $('.menu-card').on('click', function() {
        let menuId = $(this).data('id');
        // Redirigir al usuario a la página de detalles del menú
        window.location.href = '/menu/' + menuId;
    });
});

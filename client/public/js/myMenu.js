$(document).ready(function() {
    // Asignar un controlador de eventos click a todos los enlaces de "Guardar menú"
    $(".card-link.save-menu").on("click", function(e) {
        e.preventDefault();  // Prevenir la acción por defecto del enlace (navegar a la URL)

        // Obtener la URL del enlace
        var url = $(this).attr("href");

        // Enviar una petición AJAX a la URL
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                // En caso de éxito, cambiar el enlace a "Quitar de mis menús"
                $(e.target).attr("href", "/menus/unsave/" + data.menuId);
                $(e.target).text("Quitar de mis menús");
            }
        });
    });

    // Similar para los enlaces de "Quitar de mis menús"
    $(".card-link.unsave-menu").on("click", function(e) {
        e.preventDefault();

        var url = $(this).attr("href");

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data) {
                $(e.target).attr("href", "/menus/save/" + data.menuId);
                $(e.target).text("Guardar menú");
            }
        });
    });
});

$(document).ready(function() {
    // Enviar una petición AJAX al servidor para obtener precios de los ingredientes
    function getIngredientPrices(type, id) {
        $.ajax({
            url: "/" + type + "/" + id + "/comparePrices",
            type: "GET",
            success: function(data) {
                // En caso de éxito, actualizar el DOM con los precios recibidos
                for (var i = 0; i < data.length; i++) {
                    var ingredientPrices = data[i];
                    updateIngredientPriceRow(ingredientPrices);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    // Actualizar una fila de precios de ingredientes en el DOM
    function updateIngredientPriceRow(ingredientPrices) {
        var $row = $(".ingredient-price-row:contains('" + ingredientPrices.ingredient + "')");
        var $supermarkets = $row.find(".supermarkets");

        for (var i = 0; i < ingredientPrices.supermarketPrices.length; i++) {
            var supermarketPrice = ingredientPrices.supermarketPrices[i];
            $supermarkets.append("<div class='supermarket-price'><p>" + supermarketPrice.supermarket + ": $" + supermarketPrice.price.toFixed(2) + "</p></div>");
        }
    }

    // Obtener los IDs de las recetas y los menús del DOM
    // Asumimos que cada elemento DOM con clase 'item' tiene un atributo 'data-id' y 'data-type'
    $(".item").each(function() {
        var id = $(this).data('id');
        var type = $(this).data('type'); // 'recipes' o 'menus'

        // Solicitar los precios de los ingredientes del servidor
        getIngredientPrices(type, id);
    });
});


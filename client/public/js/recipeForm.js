// Función para buscar ingredientes
function fetchIngredients() {
    var input = document.getElementById('ingredientInput');
    var list = document.getElementById('ingredientList');

    // Limpiar la lista existente
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Si el usuario ha introducido al menos 2 caracteres, busca los ingredientes
    if (input.value.length >= 2) {
        fetch('/ingredient/search?name=' + input.value)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(ingredients => {
                ingredients.forEach(ingredient => {
                    // Crear un nuevo elemento de lista para cada ingrediente
                    var listItem = document.createElement('div');
                    listItem.textContent = ingredient.name;
                    listItem.setAttribute('data-id', ingredient._id);
                    listItem.onclick = function() {
                        // Cuando el usuario hace clic en un ingrediente, lo pone en el campo de entrada y limpia la lista
                        input.value = ingredient.name;
                        while (list.firstChild) {
                            list.removeChild(list.firstChild);
                        }
                        // Añade el ingrediente seleccionado a la lista de ingredientes seleccionados
                        var selectedIngredients = document.getElementById('selectedIngredients');
                        var selectedListItem = document.createElement('li');
                        
                        // Añade un campo de entrada para la cantidad del ingrediente
                        var quantityInput = document.createElement('input');
                        quantityInput.setAttribute('type', 'number');
                        quantityInput.setAttribute('placeholder', 'Cantidad');
                        quantityInput.style.marginLeft = '10px';
                        quantityInput.required = true;  // Asegura que el usuario debe ingresar una cantidad

                        // Añade el nombre del ingrediente y el campo de cantidad al elemento de la lista
                        selectedListItem.textContent = ingredient.name;
                        selectedListItem.appendChild(quantityInput);
                        selectedListItem.setAttribute('data-id', ingredient._id);

                        selectedIngredients.appendChild(selectedListItem);
                    };
                    list.appendChild(listItem);
                });
                // Si hay ingredientes sugeridos, mostrar la lista
                if (ingredients.length > 0) {
                    list.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                list.style.display = 'none';
            });
    } else {
        list.style.display = 'none'; // Ocultar la lista si el usuario ha introducido menos de 2 caracteres
    }
}

// Escuchar el evento submit del formulario
document.querySelector('form').addEventListener('submit', event => {
    // Aquí podrías hacer cualquier validación adicional necesaria
    // Si todo es válido, no necesitas hacer nada más aquí
    // Si algo no es válido, debes llamar a event.preventDefault() para evitar que se envíe el formulario
});

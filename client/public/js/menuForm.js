// Función para buscar recetas
function fetchRecipes() {
    var input = document.getElementById('recipeInput');
    var list = document.getElementById('recipeList');

    // Limpiar la lista existente
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Si el usuario ha introducido al menos 2 caracteres, busca las recetas
    if (input.value.length >= 2) {
        fetch('/recipes/search?title=' + input.value)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(Recipes => {
                Recipes.forEach(Recipe => {
                    // Crear un nuevo elemento de lista para cada receta
                    var listItem = document.createElement('div');
                    listItem.textContent = Recipe.title;
                    listItem.setAttribute('data-id', Recipe._id);
                    listItem.onclick = function() {
                        // Cuando el usuario hace clic en una receta, la pone en el campo de entrada y limpia la lista
                        input.value = Recipe.title;
                        while (list.firstChild) {
                            list.removeChild(list.firstChild);
                        }
                        // Añade la receta seleccionada a la lista de recetas seleccionadas
                        var selectedRecipes = document.getElementById('selectedRecipes');
                        var selectedListItem = document.createElement('li');
                        selectedListItem.textContent = Recipe.title;
                        selectedListItem.setAttribute('data-id', Recipe._id);
                        selectedRecipes.appendChild(selectedListItem);
                    };
                    list.appendChild(listItem);
                });
                // Si hay recetas sugeridas, mostrar la lista
                if (Recipes.length > 0) {
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

// Así es como puedes enviar el formulario a tu servidor.
// Listen for the form's submit event
document.querySelector('form').addEventListener('submit', event => {
    // Collect the list of selected recipes
    var selectedRecipes = document.getElementById('selectedRecipes').children;

    // For each selected recipe, add a hidden input field to the form with the recipe id
    for (var i = 0; i < selectedRecipes.length; i++) {
        var recipe = selectedRecipes[i];

        // Collect the id of the recipe
        var recipeId = recipe.getAttribute('data-id'); // Get the ID of the recipe

        // Create hidden input field for the id
        var idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'recipes[' + i + ']';
        idInput.value = recipeId;

        // Add the hidden input fields to the form
        event.target.appendChild(idInput);
    }

    // Here you could do any additional validation that is needed
    // If everything is valid, you don't need to do anything else here
    // If something is not valid, you should call event.preventDefault() to prevent the form from being submitted
});



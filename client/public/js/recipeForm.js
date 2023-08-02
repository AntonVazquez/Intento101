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
            .then(response => response.json())
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
            .catch(error => console.error('Error:', error));
    } else {
        list.style.display = 'none'; // Ocultar la lista si el usuario ha introducido menos de 2 caracteres
    }
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Aquí recopilamos todos los valores de los campos del formulario
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let instructions = document.querySelector('#instructions').value;
    let difficulty = document.querySelector('#difficulty').value;
    let preparationTime = document.querySelector('#preparationTime').value;
    let typeOfFood = document.querySelector('#typeOfFood').value;
    let image = document.querySelector('#image').files[0];
    let ingredients = [...document.querySelectorAll('#selectedIngredients li')].map(li => {
      return {
        ingredient: li.getAttribute('data-id'), // Cambiar li.firstChild.textContent por li.getAttribute('data-id')
        amount: li.querySelector('input').value
      };
    });

    // Aquí creamos un nuevo objeto FormData y agregamos todos los valores
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructions', instructions);
    formData.append('difficulty', difficulty);
    formData.append('preparationTime', preparationTime);
    formData.append('typeOfFood', typeOfFood);
    formData.append('image', image);
    formData.append('ingredients', JSON.stringify(ingredients));

    // Luego, hacemos una solicitud POST a tu endpoint de creación de recetas
    fetch('/recipes/crearp', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
        // Aquí está la nueva lógica de redireccionamiento
        if (data.id) {
            // Redirigir al usuario a la página de la receta recién creada
            window.location.href = '/recipes/' + data.id;
        } else {
            console.error('No se pudo obtener el ID de la receta del servidor.');
        }
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error:', error);
      });
});



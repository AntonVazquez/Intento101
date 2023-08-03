document.getElementById('addRecipe').addEventListener('click', function() {
    var input = document.createElement('input');
    input.classList.add('form-control');
    input.type = 'text';
    input.name = 'menuRecipes[]';
    input.placeholder = 'ID de la receta';
    input.required = true;

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar receta';
    removeButton.type = 'button';
    removeButton.classList.add('remove-recipe');
    removeButton.addEventListener('click', function() {
        this.parentNode.remove();
    });

    var inputGroup = document.createElement('div');
    inputGroup.classList.add('recipe-input-group');
    inputGroup.appendChild(input);
    inputGroup.appendChild(removeButton);

    document.getElementById('menuRecipes').appendChild(inputGroup);
});

document.querySelectorAll('.remove-recipe').forEach(function(button) {
    button.addEventListener('click', function() {
        this.parentNode.remove();
    });
});
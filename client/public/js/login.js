/* login.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al enviar el formulario de inicio de sesión
    $('.login-form').on('submit', function(e) {
        e.preventDefault();

        // Recoger los valores de los campos de usuario y contraseña
        let username = $('#username').val();
        let password = $('#password').val();

        // Validar que ambos campos no estén vacíos
        if(username === '' || password === '') {
            alert('Por favor, introduce tu nombre de usuario y contraseña.');
            return;
        }

        // Enviar la solicitud de inicio de sesión al servidor
        $.ajax({
            url: '/login',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if(response.status === 'ok') {
                    // Redirigir al usuario a la página de inicio
                    window.location.href = '/';
                } else {
                    // Mostrar un mensaje de error
                    alert('Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.');
                }
            }
        });
    });
});

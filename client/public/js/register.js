/* register.js */

// Imaginando que usamos jQuery

$(document).ready(function() {
    // Evento al enviar el formulario de registro
    $('.register-form').on('submit', function(e) {
        e.preventDefault();

        // Recoger los valores de los campos de registro
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirm_password = $('#confirm_password').val();

        // Validar que ninguno de los campos esté vacío
        if(username === '' || email === '' || password === '' || confirm_password === '') {
            alert('Por favor, llena todos los campos.');
            return;
        }

        // Verificar que las contraseñas coincidan
        if(password !== confirm_password) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        // Enviar la solicitud de registro al servidor
        $.ajax({
            url: '/register',
            method: 'POST',
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function(response) {
                if(response.status === 'ok') {
                    // Redirigir al usuario a la página de inicio de sesión
                    window.location.href = '/login';
                } else {
                    // Mostrar un mensaje de error
                    alert('Hubo un error durante el registro. Por favor, inténtalo de nuevo.');
                }
            }
        });
    });
});

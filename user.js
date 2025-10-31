document.addEventListener('DOMContentLoaded', function() {
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const loginFormDiv = document.getElementById('login-form');
    const registerFormDiv = document.getElementById('register-form');

    if (showLoginBtn && showRegisterBtn && loginFormDiv && registerFormDiv) {
        showLoginBtn.addEventListener('click', () => {
            loginFormDiv.style.display = 'block';
            registerFormDiv.style.display = 'none';
        });

        showRegisterBtn.addEventListener('click', () => {
            loginFormDiv.style.display = 'none';
            registerFormDiv.style.display = 'block';
        });
    }

    const registerForm = document.querySelector('#register-form form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullname = document.getElementById('register-fullname').value;
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const address = document.getElementById('register-address').value;

            if (password.length < 5) {
                alert('La contraseña debe tener al menos 5 caracteres.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username)) {
                alert('El nombre de usuario ya existe.');
                return;
            }

            users.push({ fullname, username, password, email, phone, address });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
            loginFormDiv.style.display = 'block';
            registerFormDiv.style.display = 'none';
            document.getElementById('login-username').value = username;
        });
    }

    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Inicio de sesión exitoso.');
                window.location.href = 'index.html'; // Redirect to home page after login
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        });
    }

    // Logic for cliente.html
    if (window.location.pathname.split('/').pop() === 'cliente.html') {
        const userInfoDiv = document.getElementById('user-info');
        const logoutButton = document.getElementById('logout-button');

        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            userInfoDiv.innerHTML = `
                <p><strong>Nombre Completo:</strong> ${loggedInUser.fullname}</p>
                <p><strong>Nombre de Usuario:</strong> ${loggedInUser.username}</p>
                <p><strong>Correo Electrónico:</strong> ${loggedInUser.email}</p>
                <p><strong>Número de Teléfono:</strong> ${loggedInUser.phone || 'No especificado'}</p>
                <p><strong>Dirección:</strong> ${loggedInUser.address || 'No especificado'}</p>
            `;
            logoutButton.style.display = 'block';
        } else {
            userInfoDiv.innerHTML = '<p>No hay usuario logueado. Por favor, <a href="usuario.html">inicia sesión</a> o <a href="usuario.html">crea una cuenta</a>.</p>';
            logoutButton.style.display = 'none';
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                alert('Sesión cerrada exitosamente.');
                window.location.href = 'usuario.html';
            });
        }
    }
});
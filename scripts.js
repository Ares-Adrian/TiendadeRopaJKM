    document.addEventListener('DOMContentLoaded', () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser && window.location.pathname.split('/').pop() === 'personaliza.html') {
            alert('Debes iniciar sesión o crear una cuenta para personalizar tu prenda.');
            window.location.href = 'usuario.html';
        }

        // Handle pre-selection of garment on personaliza.html
        if (window.location.pathname.split('/').pop() === 'personaliza.html') {
            const urlParams = new URLSearchParams(window.location.search);
            const prendaParam = urlParams.get('prenda');
            if (prendaParam) {
                const prendaSelect = document.getElementById('prenda');
                if (prendaSelect) {
                    // Check if the option exists before setting the value
                    const optionExists = Array.from(prendaSelect.options).some(option => option.value === prendaParam);
                    if (optionExists) {
                        prendaSelect.value = prendaParam;
                        showOptions(); // Trigger showOptions to display relevant customization fields
                    }
                }
            }
        }


    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const page = window.location.pathname.split('/').pop();
            if (page === 'cliente.html') {
                window.location.href = 'confirmacion.html';
            } else if (page === 'contacto.html') {
                alert('Mensaje enviado. Gracias por contactarnos.');
                form.reset();
            } else if (page === 'personaliza.html') {
                const cantidadInput = document.getElementById('cantidad-input');
                if (cantidadInput) {
                    const cantidad = parseInt(cantidadInput.value, 10);
                    if (isNaN(cantidad) || cantidad < 1 || cantidad > 30) {
                        alert('La cantidad debe ser un número entre 1 y 30.');
                        return;
                    }
                }
                alert('Producto añadido al carrito');
            }
        });
    });

    const cartButtons = document.querySelectorAll('.producto button');
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productDiv = event.target.closest('.producto');
            let productName = '';
            if (productDiv) {
                const h3 = productDiv.querySelector('h3');
                const h4 = productDiv.querySelector('h4');
                const h5 = productDiv.querySelector('h5');
                if (h3) {
                    productName = h3.textContent.trim();
                } else if (h4) {
                    productName = h4.textContent.trim();
                } else if (h5) {
                    productName = h5.textContent.trim();
                }
            }
            if (productName) {
                window.location.href = `personaliza.html?prenda=${encodeURIComponent(productName)}`;
            } else {
                alert('No se pudo identificar el producto.');
            }
        });
    });
});

function showOptions() {
    const prenda = document.getElementById('prenda').value;
    document.getElementById('colores-comun').style.display = 'none';
    document.getElementById('tallas').style.display = 'none';
    document.getElementById('telas').style.display = 'none';
    document.getElementById('personalizacion').style.display = 'none';
    document.getElementById('cantidad').style.display = 'none';

    if (prenda) {
        document.getElementById('cantidad').style.display = 'block';
        if (prenda === 'Polera deportiva Premium' || prenda === 'Shorts Deportivos Premium' || prenda === 'Chaqueta Deportiva Premium') {
            document.getElementById('colores-comun').style.display = 'block';
            document.getElementById('tallas').style.display = 'block';
            document.getElementById('telas').style.display = 'block';
            document.getElementById('personalizacion').style.display = 'block';
        } else if (prenda === 'Pelota de futbol' || prenda === 'Canillera deportiva Premium') {
            document.getElementById('colores-comun').style.display = 'block';
            document.getElementById('personalizacion').style.display = 'block';
        }
    }
}
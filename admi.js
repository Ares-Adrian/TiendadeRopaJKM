document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carrito-items')) {
        displayCartItems();
    }

    const personalizaForm = document.querySelector('#personaliza form');
    if (personalizaForm) {
        personalizaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addToCart();
            window.location.href = 'carrito.html';
        });
    }
});

function addToCart() {
    const prenda = document.getElementById('prenda').value;
    const color = document.getElementById('color-comun').value;
    const talla = document.getElementById('talla').value;
    const tela = document.getElementById('tela').value;
    const cantidad = document.getElementById('cantidad-input').value;
    const personalizacion = document.getElementById('texto-personalizacion').value;

    const item = {
        prenda,
        color,
        talla,
        tela,
        cantidad,
        personalizacion
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('carrito-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No hay items en el carrito.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('producto');
        itemElement.innerHTML = `
            <h3>${item.prenda}</h3>
            <p>Color: ${item.color}</p>
            <p>Talla: ${item.talla}</p>
            <p>Tela: ${item.tela}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Personalización: ${item.personalizacion}</p>
            <button class="remove-item-btn" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            removeItemFromCart(index);
        });
    });
}

function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Re-render the cart
}

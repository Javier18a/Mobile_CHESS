// Smooth scroll para enlaces internos
document.querySelectorAll('nav ul li a[href^="#"], nav ul li a:not([href^="http"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter'));
        this.classList.add('active-filter');
    });
});

// Filtro por categoría
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        document.querySelectorAll('.items-store .item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Filtro por input (buscador)
document.getElementById('search-input').addEventListener('input', function() {
    const value = this.value.toLowerCase();
    document.querySelectorAll('.items-store .item').forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (name.includes(value)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});


const searchInput = document.getElementById('search-input');
const suggestions = document.getElementById('suggestions');
const items = Array.from(document.querySelectorAll('.items-store .item'));

searchInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    // Filtrar productos
    items.forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = name.includes(value) ? '' : 'none';
    });

    // Sugerencias
    if (value.length === 0) {
        suggestions.innerHTML = '';
        suggestions.classList.remove('active');
        return;
    }
    const matches = items
        .map(item => item.querySelector('h3').textContent)
        .filter(name => name.toLowerCase().includes(value));
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(name => `<div>${name}</div>`).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.innerHTML = '<div>No hay coincidencias</div>';
        suggestions.classList.add('active');
    }
});

// Al hacer clic en una sugerencia, poner el texto en el input
suggestions.addEventListener('click', function(e) {
    if (e.target.tagName === 'DIV') {
        searchInput.value = e.target.textContent;
        suggestions.classList.remove('active');
        // Opcional: filtrar productos exactamente por ese nombre
        items.forEach(item => {
            const name = item.querySelector('h3').textContent;
            item.style.display = name === e.target.textContent ? '' : 'none';
        });
    }
});

// Ocultar sugerencias si se hace clic fuera
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Modal de información de producto
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCapacidad = document.getElementById('modal-capacidad');
    const modalRam = document.getElementById('modal-ram');
    const modalPantalla = document.getElementById('modal-pantalla');
    const modalPrecio = document.getElementById('modal-precio');
    const closeModal = document.querySelector('.close-modal');

    // Mostrar información del producto en el modal
    document.querySelectorAll('.btn-item').forEach(btn => {
        btn.addEventListener('click', function() {
            // Obtener los datos del producto desde los atributos data-*
            document.getElementById('modal-title').textContent = this.getAttribute('data-title');
            document.getElementById('modal-img').src = this.getAttribute('data-img');
            document.getElementById('modal-capacidad').textContent = this.getAttribute('data-capacidad');
            document.getElementById('modal-ram').textContent = this.getAttribute('data-ram');
            document.getElementById('modal-pantalla').textContent = this.getAttribute('data-pantalla');
            document.getElementById('modal-precio').textContent = this.getAttribute('data-precio');

            // Mostrar el modal
            document.getElementById('product-modal').style.display = 'flex';
        });
    });

    // Cerrar el modal al hacer clic en la X o fuera del contenido
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('product-modal').style.display = 'none';
        });
    });
    document.getElementById('product-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});






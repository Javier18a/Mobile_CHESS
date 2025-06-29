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
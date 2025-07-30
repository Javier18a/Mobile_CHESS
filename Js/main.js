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
function activarModales() {
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCapacidad = document.getElementById('modal-capacidad');
  const modalRam = document.getElementById('modal-ram');
  const modalPantalla = document.getElementById('modal-pantalla');
  const modalPrecio = document.getElementById('modal-precio');
  const closeModal = document.querySelector('.close-modal');

  document.querySelectorAll('.btn-item').forEach(btn => {
    btn.addEventListener('click', function() {
      modalTitle.textContent = this.getAttribute('data-title');
      modalImg.src = this.getAttribute('data-img');
      modalCapacidad.textContent = this.getAttribute('data-capacidad');
      modalRam.textContent = this.getAttribute('data-ram');
      modalPantalla.textContent = this.getAttribute('data-pantalla');
      modalPrecio.textContent = this.getAttribute('data-precio');
      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
}

function cargarComponente(id, ruta, callback) {
  fetch(ruta)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback(); // Ejecutar función luego de cargar
    });
}
// Cargar productos y luego activar los modales
cargarComponente("items-iphones", "includes/IPhones.html", activarModales);
cargarComponente("items-samsung", "includes/Samsung.html", activarModales);
cargarComponente("items-accesorios", "includes/Accesorios.html", activarModales);
cargarComponente("items-xiaomi", "includes/Xiaomi.html", activarModales);
cargarComponente("items-honor", "includes/Honor.html", activarModales);
cargarComponente("items-tv", "includes/TV.html", activarModales);
cargarComponente("items-infinix", "includes/Infinix.html", activarModales);
cargarComponente("items-tecno", "includes/Tecno.html", activarModales);


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


// Código para el botón de menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
});
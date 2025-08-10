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
    btn.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        document.querySelectorAll('.items-store').forEach(container => {
            let items = container.querySelectorAll('.item');
            let visibleCount = 0;

            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            container.style.display = visibleCount > 0 ? 'flex' : 'none';
        });

        // Vuelve a activar los modales en los productos visibles
        activarModales();
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


function activarModales() {
  // Modal general productos
  const productosGalery = document.querySelector('.productos-galery');
  const modal = document.getElementById('product-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCapacidad = document.getElementById('modal-capacidad');
  const modalRam = document.getElementById('modal-ram');
  const modalPantalla = document.getElementById('modal-pantalla');
  const modalPrecio = document.getElementById('modal-precio');

  // Modal TV
  const tvModal = document.getElementById('tv-modal');
  const tvModalImg = document.getElementById('tv-modal-img');
  const tvModalTitle = document.getElementById('tv-modal-title');
  const tvModalSO = document.getElementById('tv-modal-so');
  const tvModalResolucion = document.getElementById('tv-modal-resolucion');
  const tvModalConectividad = document.getElementById('tv-modal-conectividad');
  const tvModalFunciones = document.getElementById('tv-modal-funciones');
  const tvModalPantalla = document.getElementById('tv-modal-pantalla');
  const tvModalPrecio = document.getElementById('modal-precio');

  const productosContenedor = document.querySelector('.productos-galery');

  productosContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-item')) {
      // Modal producto general
      const btn = e.target;
      modalTitle.textContent = btn.dataset.title;
      modalImg.src = btn.dataset.img;
      modalCapacidad.textContent = btn.dataset.capacidad;
      modalRam.textContent = btn.dataset.ram;
      modalPantalla.textContent = btn.dataset.pantalla;
      modalPrecio.textContent = btn.dataset.precio;
      modal.style.display = 'flex';
    }

    if (e.target.classList.contains('btn-item-tv')) {
      // Modal TV
      const btn = e.target;
      tvModalTitle.textContent = btn.dataset.title;
      tvModalImg.src = btn.dataset.img;
      tvModalSO.textContent = btn.dataset.so;
      tvModalResolucion.textContent = btn.dataset.resolucion;
      tvModalConectividad.textContent = btn.dataset.conectividad;
      tvModalFunciones.textContent = btn.dataset.funciones;
      tvModalPrecio.textContent = btn.dataset.precio; 
      tvModalPantalla.textContent = btn.dataset.pantalla;
      tvModal.style.display = 'flex';
    }
  });

  // Cerrar modal general
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Cerrar modal TV
  tvModal.querySelector('.close-modal-tv').addEventListener('click', () => {
    tvModal.style.display = 'none';
  });
  tvModal.addEventListener('click', (e) => {
    if (e.target === tvModal) tvModal.style.display = 'none';
  });
}

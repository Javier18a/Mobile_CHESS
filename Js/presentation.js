document.addEventListener('DOMContentLoaded', function() {
    // Array de textos e imágenes
    const slides = [
        { text: '¡Bienvenido a Chess Mobile!', img: 'img/phone1.png' },
        { text: 'Descubre los últimos modelos', img: 'img/phone2.png' },
        { text: 'Accesorios para tu celular', img: 'img/phone3.png' },
        { text: 'Ofertas exclusivas', img: 'img/phone4.png' }
    ];

    let current = 0;
    const textEl = document.getElementById('presentation-text');
    const imgEl = document.getElementById('presentation-img');

    function showSlide(index) {
        textEl.textContent = slides[index].text;
        imgEl.src = slides[index].img;
    }

    // Animación automática cada 3 segundos
    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 3000);

    // Mostrar el primero al cargar
    showSlide(current);
});
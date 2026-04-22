/* =============================================
   main.js — JS global Mama Mia
   Compartido por todas las páginas
   ============================================= */

// Nav: sombra al hacer scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
}

// Nav: marcar link activo según página actual
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
});

// Badge carrito global — visible en TODAS las páginas
function updateNavCartBadge() {
    const cart = JSON.parse(localStorage.getItem('mamamia_cart') || '[]');
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const badge = document.getElementById('navCartBadge');
    if (!badge) return;
    if (total > 0) {
        badge.textContent = total;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Ejecutar al cargar y escuchar cambios de localStorage (otras pestañas)
updateNavCartBadge();
window.addEventListener('storage', updateNavCartBadge);
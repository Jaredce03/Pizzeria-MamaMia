/* =============================================
   mipedido.js — Seguimiento del pedido
   ============================================= */

const ESTADOS = [
    { icon: '✅', title: 'Pedido confirmado', desc: 'Tu pago fue recibido y el pedido ingresó al sistema.' },
    { icon: '👨‍🍳', title: 'En preparación', desc: 'Nuestros pizzaiolos están preparando tu pedido.' },
    { icon: '🔥', title: 'En el horno', desc: 'Tu pizza está en nuestro horno de leña a 485°C.' },
    { icon: '🏪', title: 'Listo para recoger', desc: 'Tu pedido está listo en el local. Jr. Grau 245, Chosica.' },
    { icon: '🎉', title: '¡Entregado!', desc: '¡Gracias por tu visita! Esperamos verte pronto.' },
];

const pagoLabels = { yape: '📱 Pagado con Yape', plin: '💜 Pagado con Plin', tarjeta: '💳 Pagado con Tarjeta' };

const pizzaImgs = {
    margherita: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80',
    diavola: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80',
    verdure: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200&q=80',
    prosciutto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&q=80',
    quattro: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80',
    tartufo: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&q=80',
};
const defaultImg = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80';

function getImg(name) {
    const key = Object.keys(pizzaImgs).find(k => name.toLowerCase().includes(k));
    return key ? pizzaImgs[key] : defaultImg;
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function renderTracker(estado) {
    const container = document.getElementById('trackerSteps');
    const now = new Date();

    container.innerHTML = ESTADOS.map((e, i) => {
        let cls = 'step pending';
        if (i < estado) cls = 'step done';
        else if (i === estado) cls = 'step active';

        const timeStr = i <= estado
            ? new Date(now.getTime() - (estado - i) * 8 * 60000).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
            : '';

        const iconContent = i < estado ? '✓' : e.icon;

        return `
      <div class="${cls}">
        <div class="step-icon">${iconContent}</div>
        <div class="step-body">
          <p class="step-title">${e.title}</p>
          <p class="step-desc">${e.desc}</p>
          ${timeStr ? `<p class="step-time">${timeStr}</p>` : ''}
        </div>
      </div>`;
    }).join('');
}

function render() {
    const pedido = JSON.parse(localStorage.getItem('mamamia_pedido') || 'null');

    if (!pedido) {
        document.getElementById('noPedido').classList.remove('hidden');
        document.getElementById('pedidoWrap').classList.add('hidden');
        return;
    }

    document.getElementById('noPedido').classList.add('hidden');
    document.getElementById('pedidoWrap').classList.remove('hidden');

    // Header
    document.getElementById('pedidoNum').textContent = pedido.num;
    document.getElementById('pedidoPago').textContent = pagoLabels[pedido.pago] || '💳 Pago confirmado';

    // Tiempo estimado
    const tiempos = ['', '20–30 min aprox.', '15–20 min aprox.', '¡Listo para recoger!', ''];
    document.getElementById('tiempoEstimado').textContent = tiempos[pedido.estado] || '';

    // Tracker
    renderTracker(pedido.estado);

    // Cancelar solo si estado 0
    const btnCancelar = document.getElementById('btnCancelar');
    if (pedido.estado === 0) btnCancelar.classList.remove('hidden');
    else btnCancelar.classList.add('hidden');

    // Items resumen
    const itemsDiv = document.getElementById('pedidoItems');
    itemsDiv.innerHTML = (pedido.items || []).map(item => `
    <div class="pedido-item-row">
      <img class="pedido-item-img" src="${getImg(item.name)}" alt="${item.name}"/>
      <div class="pedido-item-info">
        <strong>${item.name}</strong>
        <span>${item.size || ''} × ${item.qty}</span>
      </div>
      <span class="pedido-item-price">S/ ${item.price.toFixed(2)}</span>
    </div>
  `).join('');

    document.getElementById('pSubtotal').textContent = `S/ ${pedido.total}`;
    document.getElementById('pTotal').textContent = `S/ ${pedido.total}`;

    // Contacto
    document.getElementById('pedidoContacto').innerHTML =
        `📞 <strong>${pedido.tel}</strong>`;

    // Notas
    const notasDiv = document.getElementById('pedidoNotas');
    if (pedido.notas) {
        notasDiv.innerHTML = `📝 ${pedido.notas}`;
        notasDiv.style.display = 'block';
    } else {
        notasDiv.style.display = 'none';
    }

    // Simular avance de estado automático (demo: cada 20s avanza un paso)
    if (pedido.estado < ESTADOS.length - 1) {
        setTimeout(() => {
            pedido.estado++;
            localStorage.setItem('mamamia_pedido', JSON.stringify(pedido));
            renderTracker(pedido.estado);
            document.getElementById('tiempoEstimado').textContent = tiempos[pedido.estado] || '';
            if (pedido.estado > 0) document.getElementById('btnCancelar').classList.add('hidden');
            if (pedido.estado === 3) showToast('🏪 ¡Tu pedido está listo para recoger!');
        }, 20000);
    }
}

function cancelarPedido() {
    if (!confirm('¿Seguro que quieres cancelar tu pedido? Si ya fue procesado el pago, contáctanos al +51 987 654 321.')) return;
    localStorage.removeItem('mamamia_pedido');
    showToast('❌ Pedido cancelado');
    setTimeout(() => location.reload(), 1500);
}

render();
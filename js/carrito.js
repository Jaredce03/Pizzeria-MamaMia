/* =============================================
   carrito.js
   ============================================= */

let cart = JSON.parse(localStorage.getItem('mamamia_cart') || '[]');
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

function render() {
    const list = document.getElementById('itemsList');
    const empty = document.getElementById('emptyCart');
    const actions = document.getElementById('carritoActions');
    const right = document.getElementById('carritoRight');
    const resumen = document.getElementById('resumenItems');
    const count = document.getElementById('carritoCount');
    const cartBadge = document.getElementById('cartCount');

    const total = cart.reduce((s, i) => s + i.price, 0);
    const items = cart.length;

    // Badge nav
    if (cartBadge) cartBadge.textContent = items;
    count.textContent = `${items} producto${items !== 1 ? 's' : ''} en tu pedido`;

    if (items === 0) {
        list.innerHTML = '';
        empty.classList.remove('hidden');
        actions.classList.add('hidden');
        right.classList.add('hidden');
        return;
    }

    empty.classList.add('hidden');
    actions.classList.remove('hidden');
    right.classList.remove('hidden');

    // Items list
    list.innerHTML = cart.map((item, i) => `
    <div class="item-card">
      <img class="item-img" src="${getImg(item.name)}" alt="${item.name}"/>
      <div class="item-info">
        <h4>${item.name}</h4>
        <p class="item-size">${capitalize(item.size)} (${sizeMap[item.size] || ''})</p>
        <div class="item-tags">
          ${(item.extras || []).map(e => `<span class="item-tag extra">+${e}</span>`).join('')}
          ${item.drink ? `<span class="item-tag drink">${item.drink}</span>` : ''}
        </div>
      </div>
      <div class="item-right">
        <button class="item-delete" onclick="deleteItem(${i})" title="Eliminar">🗑</button>
        <div class="qty-controls">
          <button class="qty-btn-c" onclick="changeQty(${i},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn-c plus" onclick="changeQty(${i},1)">+</button>
        </div>
        <span class="item-price">S/ ${item.price.toFixed(2)}</span>
      </div>
    </div>
  `).join('');

    // Resumen
    resumen.innerHTML = cart.map(item =>
        `<div class="resumen-item"><span>${item.name} x${item.qty}</span><span>S/ ${item.price.toFixed(2)}</span></div>`
    ).join('');

    document.getElementById('resSubtotal').textContent = `S/ ${total.toFixed(2)}`;
    document.getElementById('resTotal').textContent = `S/ ${total.toFixed(2)}`;
    document.getElementById('btnTotal').textContent = `S/ ${total.toFixed(2)}`;
}

const sizeMap = { personal: '25cm', mediana: '33cm', familiar: '42cm' };
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function deleteItem(i) {
    cart.splice(i, 1);
    save(); render();
}

function changeQty(i, delta) {
    if (cart[i].qty + delta < 1) return;
    // Recalcular precio unitario
    const unit = cart[i].price / cart[i].qty;
    cart[i].qty += delta;
    cart[i].price = parseFloat((unit * cart[i].qty).toFixed(2));
    save(); render();
}

function vaciarCarrito() {
    if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
    cart = []; save(); render();
}

function save() { localStorage.setItem('mamamia_cart', JSON.stringify(cart)); }

function selectPago(el) { /* visual handled by CSS :has */ }

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function confirmarPedido() {
    const tel = document.getElementById('telefono').value.trim();
    const err = document.getElementById('telErr');

    if (!tel) { err.textContent = 'El teléfono es requerido'; return; }
    err.textContent = '';

    if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }

    const pago = document.querySelector('input[name="pago"]:checked')?.value || 'yape';
    const notas = document.getElementById('notas').value.trim();
    const total = cart.reduce((s, i) => s + i.price, 0);
    const num = 'MM-' + Math.floor(100000 + Math.random() * 900000);

    const pedido = {
        num, pago, tel, notas,
        items: [...cart],
        total: total.toFixed(2),
        estado: 0, // 0=confirmado,1=preparando,2=listo,3=entregado
        creado: new Date().toISOString()
    };

    localStorage.setItem('mamamia_pedido', JSON.stringify(pedido));
    // Limpiar carrito
    cart = []; save();
    // Redirigir a confirmación
    location.href = 'mipedido.html';
}

render();
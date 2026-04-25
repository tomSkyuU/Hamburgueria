const menuData = {
  burgers: [
    {
      id: 1,
      name: "CLÁSSICO",
      desc: "Blend 180g, queijo cheddar, alface, tomate, cebola roxa e maionese artesanal.",
      price: 29.90,
      emoji: "🍔",
      badge: null
    },
    {
      id: 2,
      name: "BRASA SMASH",
      desc: "Double smash 2x90g, queijo americano, pickles, cebola caramelizada e molho secreto.",
      price: 38.90,
      emoji: "🔥",
      badge: "FAVORITO"
    },
    {
      id: 3,
      name: "BACON KING",
      desc: "Blend 200g, bacon artesanal crocante, cheddar derretido, barbecue e cebola crispy.",
      price: 42.90,
      emoji: "🥓",
      badge: null
    },
    {
      id: 4,
      name: "MUSHROOM",
      desc: "Blend 180g, mix de cogumelos salteados, queijo suíço, rúcula e aioli de alho negro.",
      price: 44.90,
      emoji: "🍄",
      badge: "NOVO"
    },
    {
      id: 5,
      name: "FRANGO CRISPY",
      desc: "Filé de frango empanado, queijo prato, alface, tomate e maionese de limão.",
      price: 34.90,
      emoji: "🐔",
      badge: null
    },
    {
      id: 6,
      name: "VEGGIE BURGER",
      desc: "Blend de grão-de-bico e beterraba, queijo vegano, guacamole e tomate seco.",
      price: 36.90,
      emoji: "🥦",
      badge: "VEGGIE"
    }
  ],
  combos: [
    {
      id: 7,
      name: "COMBO CLÁSSICO",
      desc: "Clássico + Fritas médias + Refrigerante 350ml. O combo perfeito.",
      price: 47.90,
      emoji: "🍟",
      badge: "-15%"
    },
    {
      id: 8,
      name: "COMBO BRASA",
      desc: "Brasa Smash + Onion Rings + Milk Shake 400ml. Para os corajosos.",
      price: 62.90,
      emoji: "💥",
      badge: "DESTAQUE"
    },
    {
      id: 9,
      name: "COMBO FAMÍLIA",
      desc: "2x Clássico + 2x Fritas grandes + 2x Refrigerante. Perfeito para dividir.",
      price: 98.90,
      emoji: "👨‍👩‍👧",
      badge: "FAMÍLIA"
    }
  ],
  sides: [
    {
      id: 10,
      name: "FRITAS CLÁSSICAS",
      desc: "Batata frita sequinha e crocante, temperada na hora.",
      price: 14.90,
      emoji: "🍟",
      badge: null
    },
    {
      id: 11,
      name: "ONION RINGS",
      desc: "Anéis de cebola empanados com panko, com molho ranch.",
      price: 18.90,
      emoji: "🧅",
      badge: null
    },
    {
      id: 12,
      name: "FRITAS CHEDDAR",
      desc: "Batata frita coberta com cheddar cremoso e bacon crocante.",
      price: 22.90,
      emoji: "🧀",
      badge: "TOP"
    },
    {
      id: 13,
      name: "MANDIOCA FRITA",
      desc: "Mandioca frita crocante por fora e cremosa por dentro.",
      price: 16.90,
      emoji: "🟡",
      badge: null
    }
  ],
  drinks: [
    {
      id: 14,
      name: "MILK SHAKE",
      desc: "Sabores: Chocolate, Morango, Baunilha ou Ovomaltine. 400ml.",
      price: 18.90,
      emoji: "🥤",
      badge: null
    },
    {
      id: 15,
      name: "REFRIGERANTE",
      desc: "Coca-Cola, Guaraná Antarctica ou Soda Limonada. 350ml.",
      price: 7.90,
      emoji: "🥃",
      badge: null
    },
    {
      id: 16,
      name: "SUCO NATURAL",
      desc: "Laranja, Maracujá ou Abacaxi com hortelã. 400ml.",
      price: 12.90,
      emoji: "🍊",
      badge: null
    },
    {
      id: 17,
      name: "ÁGUA",
      desc: "Mineral sem gás ou com gás. 500ml.",
      price: 4.90,
      emoji: "💧",
      badge: null
    }
  ]
};

let cart = [];
let activeCategory = "burgers";
let deliveryMode = "entrega";
let modalItem = null;
let modalQtyValue = 1;

const FRETE_BASE = 8.90;

function formatPrice(value) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

function renderMenu(category) {
  const grid = document.getElementById("menuGrid");
  const items = menuData[category];
  grid.innerHTML = "";

  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="card-img">
        <span>${item.emoji}</span>
        ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <span class="card-price">${formatPrice(item.price)}</span>
          <button class="card-add" data-id="${item.id}" aria-label="Adicionar ${item.name}">+</button>
        </div>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card-add")) {
        openModal(item);
      }
    });
    card.querySelector(".card-add").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(item, 1);
    });
    grid.appendChild(card);
  });
}

function openModal(item) {
  modalItem = item;
  modalQtyValue = 1;

  document.getElementById("modalImg").textContent = item.emoji;
  document.getElementById("modalName").textContent = item.name;
  document.getElementById("modalDesc").textContent = item.desc;
  document.getElementById("modalPrice").textContent = formatPrice(item.price);
  document.getElementById("modalQty").textContent = 1;
  document.getElementById("modalAddBtn").textContent = "Adicionar — " + formatPrice(item.price);

  document.getElementById("modalOverlay").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
  modalItem = null;
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});

document.getElementById("modalQtyMinus").addEventListener("click", () => {
  if (modalQtyValue > 1) {
    modalQtyValue--;
    document.getElementById("modalQty").textContent = modalQtyValue;
    document.getElementById("modalAddBtn").textContent = "Adicionar — " + formatPrice(modalItem.price * modalQtyValue);
  }
});

document.getElementById("modalQtyPlus").addEventListener("click", () => {
  modalQtyValue++;
  document.getElementById("modalQty").textContent = modalQtyValue;
  document.getElementById("modalAddBtn").textContent = "Adicionar — " + formatPrice(modalItem.price * modalQtyValue);
});

document.getElementById("modalAddBtn").addEventListener("click", () => {
  if (modalItem) {
    addToCart(modalItem, modalQtyValue);
    closeModal();
  }
});

function addToCart(item, qty) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...item, qty });
  }
  updateCart();
  showToast(`${item.emoji} ${item.name} adicionado!`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function updateCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");

  if (cart.length === 0) {
    emptyEl.style.display = "flex";
    itemsEl.innerHTML = "";
    itemsEl.appendChild(emptyEl);
    document.getElementById("cartFooter").style.display = "none";
  } else {
    emptyEl.style.display = "none";
    const existing = itemsEl.querySelector(".cart-empty");
    if (existing) existing.remove();

    const currentItems = itemsEl.querySelectorAll(".cart-item");
    currentItems.forEach(el => el.remove());

    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn-sm" data-action="minus" data-id="${item.id}">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn-sm" data-action="plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">✕</button>
      `;
      div.querySelector("[data-action='minus']").addEventListener("click", () => changeQty(item.id, -1));
      div.querySelector("[data-action='plus']").addEventListener("click", () => changeQty(item.id, 1));
      div.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(item.id));
      itemsEl.appendChild(div);
    });

    document.getElementById("cartFooter").style.display = "block";
  }

  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const frete = deliveryMode === "entrega" && cart.length > 0 ? FRETE_BASE : 0;
  const total = subtotal + frete;

  document.getElementById("subtotalVal").textContent = formatPrice(subtotal);
  document.getElementById("freteVal").textContent = frete > 0 ? formatPrice(frete) : "Grátis";
  document.getElementById("totalVal").textContent = formatPrice(total);

  const freteRow = document.getElementById("freteRow");
  freteRow.style.display = deliveryMode === "retirada" ? "none" : "flex";
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("btnEntrega").addEventListener("click", () => {
  deliveryMode = "entrega";
  document.getElementById("btnEntrega").classList.add("active");
  document.getElementById("btnRetirada").classList.remove("active");
  document.getElementById("deliveryInfo").classList.remove("hidden");
  document.getElementById("retiradaInfo").classList.add("hidden");
  updateTotals();
});

document.getElementById("btnRetirada").addEventListener("click", () => {
  deliveryMode = "retirada";
  document.getElementById("btnRetirada").classList.add("active");
  document.getElementById("btnEntrega").classList.remove("active");
  document.getElementById("retiradaInfo").classList.remove("hidden");
  document.getElementById("deliveryInfo").classList.add("hidden");
  updateTotals();
});

const cepInput = document.getElementById("cepInput");
cepInput.addEventListener("input", () => {
  let val = cepInput.value.replace(/\D/g, "");
  if (val.length > 5) val = val.slice(0, 5) + "-" + val.slice(5, 8);
  cepInput.value = val;

  if (val.length === 9) {
    const raw = val.replace("-", "");
    fetch(`https://viacep.com.br/ws/${raw}/json/`)
      .then(r => r.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById("enderecoInput").value = `${data.logradouro}, ${data.bairro}`;
        }
      })
      .catch(() => {});
  }
});

document.getElementById("pagamento").addEventListener("change", (e) => {
  document.getElementById("trocoGroup").style.display = e.target.value === "dinheiro" ? "block" : "none";
});

document.getElementById("btnFinalizar").addEventListener("click", finalizarPedido);

function finalizarPedido() {
  if (cart.length === 0) {
    showToast("⚠️ Adicione itens ao carrinho!");
    return;
  }

  const pagamento = document.getElementById("pagamento").value;
  if (!pagamento) {
    showToast("⚠️ Selecione a forma de pagamento!");
    return;
  }

  if (deliveryMode === "entrega") {
    const cep = document.getElementById("cepInput").value;
    const end = document.getElementById("enderecoInput").value;
    if (!cep || cep.length < 9) {
      showToast("⚠️ Informe o CEP completo!");
      return;
    }
    if (!end) {
      showToast("⚠️ Informe o endereço!");
      return;
    }
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const frete = deliveryMode === "entrega" ? FRETE_BASE : 0;
  const total = subtotal + frete;

  let msg = "🔥 *NOVO PEDIDO — BRASA BURGUER*\n\n";
  msg += `*Tipo:* ${deliveryMode === "entrega" ? "🛵 Entrega" : "🏪 Retirada"}\n`;

  if (deliveryMode === "entrega") {
    const cep = document.getElementById("cepInput").value;
    const end = document.getElementById("enderecoInput").value;
    const comp = document.getElementById("complementoInput").value;
    msg += `*Endereço:* ${end}${comp ? ", " + comp : ""} — CEP: ${cep}\n`;
  }

  msg += "\n*Itens:*\n";
  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name} — ${formatPrice(item.price * item.qty)}\n`;
  });

  msg += `\n*Subtotal:* ${formatPrice(subtotal)}`;
  if (deliveryMode === "entrega") msg += `\n*Frete:* ${formatPrice(frete)}`;
  msg += `\n*TOTAL: ${formatPrice(total)}*`;
  msg += `\n*Pagamento:* ${pagamento.toUpperCase()}`;

  const obs = document.getElementById("obsInput").value;
  if (obs) msg += `\n*Obs:* ${obs}`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/5551999998888?text=${encoded}`, "_blank");

  cart = [];
  updateCart();
  closeCart();
  showToast("✅ Pedido enviado via WhatsApp!");
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.cat;
    renderMenu(activeCategory);
  });
});

document.querySelectorAll(".nav a, .hero-cta").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
  } else {
    header.style.boxShadow = "none";
  }
});

renderMenu("burgers");
updateCart();
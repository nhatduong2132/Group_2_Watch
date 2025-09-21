// ================= CART.JS =================

// Biến cart toàn cục, đọc từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= UPDATE MINI CART ================= */
function updateCartUI() {
  const cartCountEl = document.querySelector(".cart-count");
  const cartTotalEl = document.querySelector(".cart-total");
  const cartDropdownEl = document.querySelector(".cart-items");

  let totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  let totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartTotalEl) cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;

  // subtotal trong dropdown
  const cartSubtotalEl = document.querySelector(".cart-subtotal strong");
  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${totalPrice.toFixed(2)}`;

  // render dropdown
  if (cartDropdownEl) {
    cartDropdownEl.innerHTML = "";
    cart.forEach((item, index) => {
      cartDropdownEl.innerHTML += `
        <li class="cart-item">
          <div class="item-thumb">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-info">
            <p class="item-name">${item.name}</p>
            <p class="item-qty">${item.qty} × $${item.price.toFixed(2)}</p>
          </div>
          <button class="remove" data-index="${index}">×</button>
        </li>
      `;
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= RENDER CART PAGE ================= */
function renderCartPage() {
  const cartTableBody = document.getElementById("cart-items");
  if (!cartTableBody) return; // nếu không phải cart.html thì bỏ qua

  // Luôn đọc lại từ localStorage
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartTableBody.innerHTML = "";

  cart.forEach((item, index) => {
    cartTableBody.innerHTML += `
      <tr>
        <td class="cart-thumbnail"><img src="${item.image}" alt="${item.name}"></td>
        <td class="cart-name">${item.name}</td>
        <td class="cart-price">$${item.price.toFixed(2)}</td>
        <td class="cart-quantity">
          <input type="number" value="${item.qty}" min="1" data-index="${index}">
        </td>
        <td class="cart-sub">$${(item.price * item.qty).toFixed(2)}</td>
        <td class="cart-remove"><button class="remove" data-index="${index}">×</button></td>
      </tr>
    `;
  });

  // update totals
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotalEl = document.querySelector(".totals-row .value");
  const totalEl = document.querySelector(".totals-row.total .value");
  if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

/* ================= ADD TO CART ================= */
function handleAddToCart(e, priceSelector) {
  e.preventDefault();
  const btn = e.target.closest(".btn-cart, .btn-add");
  if (!btn) return;

  const product = btn.closest(".product, .special-edition, .product-detail");
  if (!product) return;

  const priceEl = product.querySelector(priceSelector);
  if (!priceEl) return;

  const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, "")) || 0;
  const name =
    product.querySelector(".product-name, .product-info h3")?.textContent.trim() ||
    "No name";
  const image = product.querySelector("img")?.src || "";

  let qty = 1;
  const qtyInput = product.querySelector("input[type=number]");
  if (qtyInput) qty = parseInt(qtyInput.value, 10) || 1;

  // Nếu sp đã có thì tăng số lượng
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty, image });
  }

  updateCartUI();
  renderCartPage();
}

/* ================= SỰ KIỆN ================= */
document.addEventListener("DOMContentLoaded", function () {
  // Homepage
  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    productGrid.addEventListener("click", function (e) {
      if (e.target.closest(".btn-cart")) {
        handleAddToCart(e, ".product-price");
      }
    });
  }

  // Special edition
  const special = document.querySelector(".special-edition");
  if (special) {
    const specialBtn = special.querySelector(".btn-add");
    if (specialBtn) {
      specialBtn.addEventListener("click", function (e) {
        handleAddToCart(e, ".price");
      });
    }
  }

  // Product detail
  const detail = document.querySelector(".product-detail");
  if (detail) {
    const detailBtn = detail.querySelector(".btn-add");
    if (detailBtn) {
      detailBtn.addEventListener("click", function (e) {
        handleAddToCart(e, ".price, .product-price");
      });
    }
  }

  // Remove item (mini cart + cart page)
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      renderCartPage();
    }
  });

  // Update số lượng trong cart page
  document.addEventListener("change", function (e) {
    if (e.target.matches(".cart-quantity input")) {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value, 10) || 1;
      cart[index].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      renderCartPage();

      // bật nút Update Cart
      const updateBtn = document.querySelector(".btn1");
      if (updateBtn) updateBtn.classList.add("active");
    }
  });

  // Load khi mở trang
  updateCartUI();
  renderCartPage();
});

function addToCart(product, qty = 1) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      qty: qty,
      image: product.images?.[0] || product.imageFront || ""
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  renderCartPage();
}

document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // lưu toàn bộ cart

  const cartCountEl = document.querySelector(".cart-count");
  const cartTotalEl = document.querySelector(".cart-total");
  const cartDropdownEl = document.querySelector(".cart-items");

// ✅ Update UI header
function updateCartUI() {
  let totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  let totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartTotalEl) cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;

  // ✅ Update subtotal trong dropdown
  const cartSubtotalEl = document.querySelector(".cart-subtotal strong");
  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${totalPrice.toFixed(2)}`;

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

  localStorage.setItem("cart", JSON.stringify(cart)); // lưu lại
}


  // ✅ Thêm sản phẩm vào cart
  function handleAddToCart(e, priceSelector) {
    e.preventDefault();
    const btn = e.target.closest(".btn-cart, .btn-add");
    if (!btn) return;

    const product = btn.closest(".product, .special-edition, .product-detail");
    if (!product) return;

    const priceEl = product.querySelector(priceSelector);
    if (!priceEl) return;

    const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, "")) || 0;
    const name = product.querySelector(".product-name, .product-info h3")?.textContent.trim() || "No name";
    const image = product.querySelector("img")?.src || "";

    let qty = 1;
    const qtyInput = product.querySelector("input[type=number]");
    if (qtyInput) qty = parseInt(qtyInput.value, 10) || 1;

    // ✅ kiểm tra nếu sp đã có thì tăng số lượng
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty, image });
    }

    updateCartUI();
  }

  // ----------------- HOMEPAGE -----------------
  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    productGrid.addEventListener("click", function (e) {
      if (e.target.closest(".btn-cart")) {
        handleAddToCart(e, ".product-price");
      }
    });
  }

  // ----------------- SPECIAL EDITION -----------------
  const special = document.querySelector(".special-edition");
  if (special) {
    const specialBtn = special.querySelector(".btn-add");
    if (specialBtn) {
      specialBtn.addEventListener("click", function (e) {
        handleAddToCart(e, ".price");
      });
    }
  }

  // ----------------- PRODUCT DETAIL MAIN -----------------
  const detail = document.querySelector(".product-detail");
  if (detail) {
    const detailBtn = detail.querySelector(".btn-add");
    if (detailBtn) {
      detailBtn.addEventListener("click", function (e) {
        handleAddToCart(e, ".price, .product-price");
      });
    }
  }

  // ----------------- Xóa item -----------------
  if (cartDropdownEl) {
    cartDropdownEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCartUI();
      }
    });
  }

  // ✅ Load lại từ localStorage khi mở trang
  updateCartUI();
});

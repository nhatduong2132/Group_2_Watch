document.addEventListener("DOMContentLoaded", function () {
  const cartCountEl = document.querySelector(".cart-count");
  const cartTotalEl = document.querySelector(".cart-total");
  let cartCount = 0;
  let cartTotal = 0;

  // Hàm update UI
  function updateCartUI() {
    cartCountEl.textContent = cartCount;
    cartTotalEl.textContent = `$${cartTotal.toFixed(2)}`;
  }

  // 1️⃣ Featured Products (nút giỏ hàng trong overlay)
  const featuredAddBtns = document.querySelectorAll(".product .overlay-icons a:first-child");
  featuredAddBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); // ngăn nhảy #
      const product = btn.closest(".product");
      if (!product) return;

      const priceText = product.querySelector(".product-price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, "")); 

      cartCount++;
      cartTotal += price;
      updateCartUI();
    });
  });

  // 2️⃣ Special Edition (nút Add to Cart)
  const specialBtn = document.querySelector(".special-edition .btn-add");
  if (specialBtn) {
    specialBtn.addEventListener("click", function () {
      const qtyInput = document.querySelector(".special-edition input[type=number]");
      const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;

      const priceText = document.querySelector(".special-edition .price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

      cartCount += qty;
      cartTotal += price * qty;
      updateCartUI();
    });
  }
});

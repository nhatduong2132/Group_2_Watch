// product-detail.js
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;

  // Render thông tin chi tiết
  document.getElementById("mainImage").src = currentProduct.images[0];
  document.getElementById("detailName").textContent = currentProduct.name;
  document.getElementById("detailPrice").textContent = `$${currentProduct.price.toFixed(2)}`;
  document.getElementById("detailDesc").textContent = currentProduct.description;
  document.getElementById("detailCategory").textContent = currentProduct.category;
  document.getElementById("detailTags").textContent = currentProduct.tags.join(", ");
  document.getElementById("tabDesc").textContent = currentProduct.description;

  // Breadcrumb
  document.getElementById("categoryName").textContent = currentProduct.category;
  document.getElementById("productName").textContent = currentProduct.name;

  // Thumbnails
  const thumbs = document.getElementById("thumbs");
  thumbs.innerHTML = currentProduct.images
    .map(img => `<img src="${img}" class="thumb">`)
    .join("");
  thumbs.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
      document.getElementById("mainImage").src = img.src;
    });
  });

  // Nút Add to Cart
  const qtyInput = document.getElementById("qty");
  const addBtn = document.querySelector(".btn-add");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value) || 1;
      if (typeof addToCart === "function") {
        addToCart(currentProduct, qty);
      } else {
        alert("addToCart chưa được định nghĩa trong cart.js");
      }
    });
  }

  // Tabs switching
  document.querySelectorAll(".tabs li").forEach(tab => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tabs li").forEach(li => li.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(this.dataset.tab).classList.add("active");
    });
  });

  // Related products
  const relatedContainer = document.getElementById("relatedProducts");
  if (relatedContainer) {
    relatedContainer.innerHTML = "";
    const related = products.filter(p => p.id !== id && !p.special).slice(0, 3);
    related.forEach(product => {
      const productHTML = `
        <div class="product">
          <div class="product-img">
            <img src="${product.imageFront}" alt="${product.name}" class="img-front">
            <img src="${product.imageBack}" alt="${product.name}" class="img-back">
            <div class="overlay"></div>
            <div class="overlay-icons">
              <a href="#" class="btn-cart"><img src="images/featured/icons/cart.png" alt="Add to Cart"></a>
              <a href="#"><img src="images/featured/icons/heart.png" alt="Wishlist"></a>
              <a href="#"><img src="images/featured/icons/analysis.png" alt="Search"></a>
              <a href="product-detail.html?id=${product.id}">
                <img src="images/featured/icons/eyes.svg" alt="View">
              </a>
            </div>
          </div>
          <h3 class="product-name">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      `;
      relatedContainer.innerHTML += productHTML;
    });
  }
});

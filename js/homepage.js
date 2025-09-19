// homepage.js
document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("productGrid"); // ✅ dùng id thay vì class

  if (productGrid) {
    productGrid.innerHTML = "";

    products.forEach(product => {
      if (product.special) return; // bỏ qua special edition

      const productHTML = `
        <div class="product">
          <div class="product-img">
            <img src="${product.imageFront}" alt="${product.name}" class="img-front">
            <img src="${product.imageBack}" alt="${product.name}" class="img-back">
            <div class="overlay"></div>
            <div class="overlay-icons">
              <a href="#" class="btn-cart">
                <img src="images/featured/icons/cart.png" alt="Add to Cart">
              </a>
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
      productGrid.innerHTML += productHTML;
    });
  }
});

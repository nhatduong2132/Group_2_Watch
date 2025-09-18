document.addEventListener("DOMContentLoaded", () => {
  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slide-prev");
  const nextBtn = document.querySelector(".slide-next");
  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    const activeSlide = slides[index];
    // reset animation
    void activeSlide.offsetWidth;
    activeSlide.classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    current = (current === 0) ? slides.length - 1 : current - 1;
    showSlide(current);
  });

  nextBtn.addEventListener("click", () => {
    current = (current === slides.length - 1) ? 0 : current + 1;
    showSlide(current);
  });

  showSlide(current); // init hero slider



  /* ================= DIAL SLIDER ================= */
  const track = document.querySelector('.dial-track');
  const items = document.querySelectorAll('.dial-item');
  const dotsContainer = document.querySelector('.dial-dots');

  const visible = 6; // luôn hiển thị 6
  const totalItems = items.length;
  const totalDots = totalItems - visible + 1; // số dot = số lần trượt (7 item -> 2 dot)

  let index = 0;

  // tạo dots
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }

  function updateSlider() {
  const itemStyle = getComputedStyle(items[0]);
  const itemWidth = items[0].offsetWidth + parseInt(itemStyle.marginRight || 0);
  const offset = -(index * itemWidth);
  track.style.transform = `translateX(${offset}px)`;

  document.querySelectorAll('.dial-dots .dial-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  }
  updateSlider(); // init dial slider
  window.addEventListener('resize', updateSlider);
});

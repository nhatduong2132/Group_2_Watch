document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slide-prev");
  const nextBtn = document.querySelector(".slide-next");
  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    const activeSlide = slides[index];
    // reset animation (trick reflow)
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

  // init
  showSlide(current);
});

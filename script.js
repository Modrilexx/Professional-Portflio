const deck = document.getElementById("deck");
const panels = document.querySelectorAll(".panel");
const counter = document.getElementById("counter");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const horizontalSection = document.getElementById("horizontalSection");

let currentIndex = 0;
const totalSlides = panels.length;

function updateSlider() {
  deck.style.transform = `translateX(-${currentIndex * 100}vw)`;
  counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalSlides - 1;
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
  updateSlider();
}

function nextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    goToSlide(Number(dot.dataset.index));
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Mouse wheel controls for desktop
let wheelLock = false;

horizontalSection.addEventListener("wheel", (e) => {
  const atTopSection = window.scrollY < horizontalSection.offsetHeight;

  if (!atTopSection) return;

  if (wheelLock) {
    e.preventDefault();
    return;
  }

  if (Math.abs(e.deltaY) < 20) return;

  if (e.deltaY > 0 && currentIndex < totalSlides - 1) {
    e.preventDefault();
    nextSlide();
    wheelLock = true;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    e.preventDefault();
    prevSlide();
    wheelLock = true;
  }

  setTimeout(() => {
    wheelLock = false;
  }, 650);
}, { passive: false });

updateSlider();
// Burger menu functionality
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const burgerMenu = document.getElementById("burgerMenu");

  navMenu.classList.toggle("active");
  burgerMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  const navMenu = document.getElementById("navMenu");
  const burgerMenu = document.getElementById("burgerMenu");

  navMenu.classList.remove("active");
  burgerMenu.classList.remove("active");
  document.body.style.overflow = "";
}

// Video modal functionality
function openVideoModal(videoSrc) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoSource = modalVideo.querySelector("source");

  videoSource.src = videoSrc;
  modalVideo.load();
  modal.classList.add("active");

  // Автоматически воспроизводим видео
  modalVideo.play();
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modal.classList.remove("active");
}

// Закрытие модального окна при клике вне видео
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Закрытие по клавише Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeVideoModal();
    }
  });
});

// Equipment slider
let currentEquipment = 0;
const equipmentTrack = document.querySelector(".equipment-track");
const equipmentDots = document.querySelectorAll(".equipment .slider-dot");

function showEquipment(index) {
  if (equipmentDots.length > 0) {
    equipmentDots[currentEquipment].classList.remove("active");
    currentEquipment = index;
    equipmentDots[currentEquipment].classList.add("active");

    const translateX = -index * 100;
    if (equipmentTrack) {
      equipmentTrack.style.transform = `translateX(${translateX}%)`;
    }
  }
}

// Auto-advance equipment slider
setInterval(() => {
  const nextSlide = (currentEquipment + 1) % 4;
  showEquipment(nextSlide);
}, 5000);

// Interactive demo
let currentDemo = 0;
const demoButtons = document.querySelectorAll(".demo-button");
const demoVideos = document.querySelectorAll(".demo-video");

function showDemo(index) {
  if (demoButtons.length > 0 && demoVideos.length > 0) {
    demoButtons[currentDemo].classList.remove("active");
    demoVideos[currentDemo].classList.remove("active");

    // Pause current video
    if (demoVideos[currentDemo].pause) {
      demoVideos[currentDemo].pause();
    }

    currentDemo = index;

    demoButtons[currentDemo].classList.add("active");
    demoVideos[currentDemo].classList.add("active");

    // Play new video
    if (demoVideos[currentDemo].play) {
      demoVideos[currentDemo].play();
    }
  }
}

// Calculator with Kyrgyz Som
// function calculatePrice() {
//   const material = document.getElementById("material");
//   const size = document.getElementById("size");
//   const quantity = document.getElementById("quantity");
//   const complexity = document.getElementById("complexity");
//   const priceElement = document.getElementById("price");

//   if (!material || !size || !quantity || !complexity || !priceElement) {
//     return;
//   }

//   const materialValue = material.value;
//   const sizeValue = size.value;
//   const quantityValue = parseInt(quantity.value) || 1;
//   const complexityValue = complexity.value;

//   // Base prices in Kyrgyz Som (KGS)
//   const materialPrices = {
//     metal: 70,
//     plastic: 52,
//     glass: 78,
//     textile: 61,
//     leather: 87,
//   };

//   // Size multipliers
//   const sizeMultipliers = {
//     small: 1,
//     medium: 2.2,
//     large: 4.5,
//     xlarge: 8,
//   };

//   // Complexity multipliers
//   const complexityMultipliers = {
//     simple: 0.8,
//     medium: 1,
//     complex: 1.4,
//   };

//   // Volume discounts
//   let volumeDiscount = 1;
//   if (quantityValue >= 1000) volumeDiscount = 0.65;
//   else if (quantityValue >= 500) volumeDiscount = 0.75;
//   else if (quantityValue >= 200) volumeDiscount = 0.85;
//   else if (quantityValue >= 100) volumeDiscount = 0.9;
//   else if (quantityValue >= 50) volumeDiscount = 0.95;

//   const basePrice = materialPrices[materialValue];
//   const sizeMultiplier = sizeMultipliers[sizeValue];
//   const complexityMultiplier = complexityMultipliers[complexityValue];

//   const totalPrice = Math.round(
//     basePrice *
//       sizeMultiplier *
//       complexityMultiplier *
//       quantityValue *
//       volumeDiscount
//   );

//   const formattedPrice = totalPrice.toLocaleString("ru-RU") + " сом";
//   priceElement.textContent = formattedPrice;
// }

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Portfolio filter functionality
function filterPortfolio(category) {
  const items = document.querySelectorAll(".portfolio-item");
  const buttons = document.querySelectorAll(".filter-btn");

  // Update active button
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Filter items with animation
  items.forEach((item) => {
    const itemCategory = item.dataset.category;
    if (category === "all" || itemCategory === category) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

// Открытие изображений портфолио в полный экран
document.querySelectorAll(".portfolio-zoom").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();

    const portfolioItem = this.closest(".portfolio-item");
    const img = portfolioItem.querySelector(".portfolio-img");
    const title = portfolioItem.querySelector(".portfolio-info h3").textContent;
    const description =
      portfolioItem.querySelector(".portfolio-info p").textContent;

    openImageModal(img.src, title, description);
  });
});

function openImageModal(imgSrc, title, description) {
  // Создаем модальное окно
  const modal = document.createElement("div");
  modal.className = "portfolio-modal";
  modal.innerHTML = `
        <div class="portfolio-modal-content" onclick="event.stopPropagation()">
            <button class="video-modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
            <img src="${imgSrc}" alt="${title}" style="max-width: 90%; max-height: 80vh; border-radius: 8px;">
            <div style="text-align: center; color: white; margin-top: 20px;">
                <h3 style="margin-bottom: 10px;     color: black;">${title}</h3>
                <p style="color: #ccc;">${description}</p>
            </div>
        </div>
    `;

  // Закрытие по клику на фон
  modal.addEventListener("click", function () {
    this.remove();
  });

  // Закрытие по ESC
  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      modal.remove();
      document.removeEventListener("keydown", escHandler);
    }
  });

  document.body.appendChild(modal);
}

// Initialize calculator on page load
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("price")) {
    calculatePrice();
  }
});

// Hero video controls
document.addEventListener("DOMContentLoaded", function () {
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.playbackRate = 0.8;
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Intersection Observer для анимации услуг
const specObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const specObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, specObserverOptions);

// Apply animation to sections when they come into view
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(
    ".tech-process, .specifications, .portfolio, .equipment, .calculator, .contact"
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(section);
  });

  // Наблюдаем за блоками услуг
  const specGrids = document.querySelectorAll(".spec-grid[data-animation]");
  specGrids.forEach((grid) => {
    specObserver.observe(grid);
  });
});

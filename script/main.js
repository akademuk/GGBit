// Burger
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  const toggleMenu = (action, targetId = null) => {
    const isActive = action === "open";

    burger.classList.toggle("active", isActive);
    menu.classList.toggle("active", isActive);
    overlay.classList.toggle("active", isActive);

    if (isActive) {
      const scrollY = window.scrollY;
      body.dataset.scrollY = scrollY;
      body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        width: 100%;
        overflow: hidden;
      `;
    } else {
      setTimeout(() => {
        body.style.cssText = "";
        window.scrollTo(0, parseInt(body.dataset.scrollY || "0"));
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }
  };

  burger.addEventListener("click", () => {
    toggleMenu(burger.classList.contains("active") ? "close" : "open");
  });

  overlay.addEventListener("click", () => toggleMenu("close"));

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const targetId = event.target.getAttribute("href").slice(1);
      toggleMenu("close", targetId);
    }
  });
});

// Slider Categories
document.addEventListener("DOMContentLoaded", function () {
  const articles = document.querySelectorAll('.news__article-content');
  let swiper = new Swiper(".news__swiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    navigation: {
      nextEl: '.news__button-next',
      prevEl: '.news__button-prev',
    },
    pagination: {
      el: '.news__pagination',
      clickable: true,
    },
    on: {
      slideChange: resetAllArticles,
      touchMove: resetAllArticles,
    },
  });

  articles.forEach(article => {
    const link = article.querySelector('.news__article-link');

    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (article.classList.contains('expanded')) {
        article.classList.remove('expanded');
      } else {
        resetAllArticles();
        article.classList.add('expanded');
      }
    });
  });

  function resetAllArticles() {
    articles.forEach(article => {
      article.classList.remove('expanded');
    });
  }
});

// Paralax
const parallaxImages = document.querySelectorAll('.hero__image');
const handleMouseMove = (e) => {
  if (window.innerWidth <= 1280) return;

  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  parallaxImages.forEach((image, index) => {
    const speed = (index + 1) * 10;
    const offsetX = mouseX * speed;
    const offsetY = mouseY * speed;

    image.style.transform = `translate(${offsetX}px, ${-offsetY}px)`;
  });
};
document.addEventListener('mousemove', handleMouseMove);

window.addEventListener('resize', () => {
  if (window.innerWidth <= 1280) {
    parallaxImages.forEach((image) => {
      image.style.transform = '';
    });
  }
});

// Validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.hero__form');
  const inputBox = document.querySelector('.hero__form-box');
  const input = inputBox.querySelector('input');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    inputBox.classList.remove('success', 'error');

    if (emailRegex.test(input.value.trim())) {
      inputBox.classList.add('success');
      console.log('Form submitted successfully');
    } else {
      inputBox.classList.add('error');
    }
  });

  input.addEventListener('input', () => {
    inputBox.classList.remove('success', 'error');

    if (emailRegex.test(input.value.trim())) {
      inputBox.classList.add('success');
    } else if (input.value.trim() !== '') {
      inputBox.classList.add('error');
    }
  });
});


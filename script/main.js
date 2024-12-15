document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSwiperSlider();
  initNewsArticles();
  initParallaxEffect();
  initFormValidation();
});

function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  const animationDuration = 400;

  const openMenu = () => {
    const scrollY = window.scrollY;
    body.dataset.scrollY = scrollY;
    burger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  const closeMenu = (targetId = null) => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    requestAnimationFrame(() => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, parseInt(body.dataset.scrollY || "0"));

      if (targetId) {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, animationDuration);
      }
    });
  };

  burger.addEventListener("click", () => {
    burger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const targetId = event.target.getAttribute("href").slice(1);
      closeMenu(targetId);
    }
  });
}

function initSwiperSlider() {
  new Swiper(".news__swiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    navigation: {
      nextEl: ".news__button-next",
      prevEl: ".news__button-prev",
    },
    pagination: {
      el: ".news__pagination",
      clickable: true,
    },
    on: {
      slideChange: () => document.dispatchEvent(new Event("swiperSlideChange")),
      touchMove: () => document.dispatchEvent(new Event("swiperSlideChange")),
    },
  });
}

function initNewsArticles() {
  const articles = document.querySelectorAll(".news__article-content");

  const resetAllArticles = () => {
    articles.forEach((article) => article.classList.remove("expanded"));
  };

  articles.forEach((article) => {
    const link = article.querySelector(".news__article-link");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      article.classList.contains("expanded") ? resetAllArticles() : (resetAllArticles(), article.classList.add("expanded"));
    });
  });

  document.addEventListener("swiperSlideChange", resetAllArticles);
}

function initParallaxEffect() {
  const parallaxImages = document.querySelectorAll(".hero__image");

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

  document.addEventListener("mousemove", handleMouseMove);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1280) {
      parallaxImages.forEach((image) => (image.style.transform = ""));
    }
  });
}

function initFormValidation() {
  const form = document.querySelector(".hero__form");
  const inputBox = document.querySelector(".hero__form-box");
  const input = inputBox.querySelector("input");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = () => {
    inputBox.classList.remove("success", "error");
    if (emailRegex.test(input.value.trim())) {
      inputBox.classList.add("success");
    } else if (input.value.trim() !== "") {
      inputBox.classList.add("error");
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInput();
  });

  input.addEventListener("input", validateInput);
}


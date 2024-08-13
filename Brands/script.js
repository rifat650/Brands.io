let menuBtn = document.getElementById("menu-btn");
let nav = document.getElementById("navbar");
let menuOff = true;
menuBtn.addEventListener("click", () => {
    if (menuOff) {
        nav.style.width = "320px";
        menuOff = false;
    } else {
        nav.style.width = "";
        menuOff = true;
    }
});

let crossIcon = document.getElementById("cross-icon");
crossIcon.addEventListener("click", () => {
    nav.style.width = "";
    menuOff = true;
})
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
        nav.style.width = "";
        menuOff = true;
    }
});


const swiper = new Swiper('.slider-warper', {
loop:true,
grabCursor:true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable:true,
        dynamicBullets:true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        620: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    }
});

const items = document.querySelectorAll(".num");

const updateCount = (el) => {
  const value = parseInt(el.dataset.value.replace(/[,|%]/g, ''));
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increment;
    if (initialValue > value) {
      el.innerText = el.dataset.value;
      clearInterval(increaseCount);
      return;
    }
    el.innerText = `${initialValue.toLocaleString()}${el.dataset.value.includes('%') ? '%' : ''}`;
  }, 1);
};

const observerOptions = {
  root: null, 
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const item = entry.target;
      item.dataset.value = item.innerText;
      updateCount(item);
      observer.unobserve(item); 
    }
  });
}, observerOptions);

items.forEach(item => {
  observer.observe(item);
});

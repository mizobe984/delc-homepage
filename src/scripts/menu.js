const main = document.querySelectorAll(".pulldown-menu");
const item = Array.from(main);

document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});

document.addEventListener('astro:page-load', () => {
  item.forEach(function (element) {

    element.addEventListener("click", function() {
      const detail = element.querySelector(".links-detail");
      const alignJustify_icon = element.querySelector(".alignJustify-icon");
      const x_icon = element.querySelector(".x-icon");
      if (detail) {
        if (window.innerWidth <= 919) {
          detail.classList.toggle("open-links-detail");
          alignJustify_icon.classList.toggle("open-icon");
          x_icon.classList.toggle("close-icon");
        }
      }
    }, false);

    element.addEventListener("mouseover", function() {
      const detail = element.querySelector(".links-detail");
      if (detail) {
        if (window.innerWidth >= 920) {
          detail.classList.add("open");
        }
      }
    }, false);
    
    element.addEventListener("mouseout", function() {
      const detail = element.querySelector(".links-detail");
      if (detail) {
        if (window.innerWidth >= 920) {
          detail.classList.remove("open");
        }
      }
    }, false);

  });
});

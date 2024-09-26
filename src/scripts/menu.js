const main = document.querySelectorAll(".pulldown-menu");
const item = Array.from(main);

document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});

document.addEventListener('astro:page-load', () => {
  item.forEach(function (element) {
    element.addEventListener("mouseover", function() {
      const detail = element.querySelector(".links-detail");
      if (detail) {
        detail.classList.add("open");
      }
    }, false);
    
    element.addEventListener("mouseout", function() {
      const detail = element.querySelector(".links-detail");
      if (detail) {
        detail.classList.remove("open");
      }
    }, false);
  });
});

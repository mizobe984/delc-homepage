document.addEventListener('astro:page-load', () => {
  const element = document.querySelector('.hamburger')
  const alignJustify_icon = element.querySelector(".alignJustify-icon");
  const x_icon = element.querySelector(".x-icon");
  element.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
    alignJustify_icon.classList.toggle("open-icon");
    x_icon.classList.toggle("close-icon");
  });
});

    /*SP処理*/
document.addEventListener('astro:page-load', () => {
  const main = document.querySelectorAll(".pulldown-menu");
  const item = Array.from(main);

  item.forEach(function (element) {
    
    /*PC処理*/
    element.addEventListener("mouseover", function() {
      const detail = element.querySelector(".links-detail");
      if (detail && window.innerWidth >= 920) {
        detail.classList.add("open");
        detail.classList.add("active");
      }
    }, false);
    
    element.addEventListener("mouseout", function() {
      const detail = element.querySelector(".links-detail");
      if (detail && window.innerWidth >= 920) {
        detail.classList.remove("open");
        detail.classList.remove("active");
      }
    }, false);

  });
});

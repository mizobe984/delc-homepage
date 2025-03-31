document.addEventListener('astro:page-load', () => {

  const element = document.querySelector('.hamburger');

  const toggle = (modalOverlay) => {
    document.querySelector('.nav-links').classList.toggle('expanded');

    const alignJustify_icon = element.querySelector(".alignJustify-icon");
    const x_icon = element.querySelector(".x-icon");
    alignJustify_icon.classList.toggle("open-icon");
    x_icon.classList.toggle("close-icon");

    if (alignJustify_icon.classList.contains("open-icon")) {
      modalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 450);
    }
  }

  // モーダル要素を取得
  let modalOverlay = document.querySelector('.modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    document.body.appendChild(modalOverlay);
  }

  element.addEventListener('click', () => toggle(modalOverlay));

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      toggle(modalOverlay)
    }
  });
});

/*SP処理*/
document.addEventListener('astro:page-load', () => {
  const main = document.querySelectorAll(".pulldown-menu");
  const item = Array.from(main);

  item.forEach(function (element) {

    /*PC処理*/
    element.addEventListener("mouseover", function () {
      const detail = element.querySelector(".links-detail");
      if (detail && window.innerWidth >= 920) {
        detail.classList.add("open");
        detail.classList.add("active");
      }
    }, false);

    element.addEventListener("mouseout", function () {
      const detail = element.querySelector(".links-detail");
      if (detail && window.innerWidth >= 920) {
        detail.classList.remove("open");
        detail.classList.remove("active");
      }
    }, false);

  });
});


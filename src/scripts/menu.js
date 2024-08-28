document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});

document.addEventListener('astro:page-load', () => {
  document.querySelector('.company-hamburger').addEventListener('mouseover', () => {
    document.querySelector('.company-links-detail').classList.toggle('expanded-grid');
  });
});

document.addEventListener('astro:page-load', () => {
  document.querySelector('.company-pulldown-menu').addEventListener('mouseleave', () => {
    document.querySelector('.company-links-detail').classList.toggle('expanded-grid');
  });
});


document.addEventListener('astro:page-load', () => {
  document.querySelector('.services-hamburger').addEventListener('mouseover', () => {
    document.querySelector('.services-links-detail').classList.toggle('expanded-grid');
  });
});

document.addEventListener('astro:page-load', () => {
  document.querySelector('.services-pulldown-menu').addEventListener('mouseleave', () => {
    document.querySelector('.services-links-detail').classList.toggle('expanded-grid');
  });
});
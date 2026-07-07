// ハンバーガーメニューの開閉(SP)
// 開閉アニメーションは CSS の transition に委ね、JS は is-open / expanded の付け外しのみ行う
document.addEventListener('astro:page-load', () => {
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  if (!hamburger || !navLinks) return

  let modalOverlay = document.querySelector('.modal-overlay')
  if (!modalOverlay) {
    modalOverlay = document.createElement('div')
    modalOverlay.classList.add('modal-overlay')
    document.body.appendChild(modalOverlay)
  }

  const toggle = () => {
    const isOpen = navLinks.classList.toggle('expanded')
    hamburger.classList.toggle('is-open', isOpen)
    modalOverlay.classList.toggle('is-open', isOpen)
    document.body.classList.toggle('scroll-lock', isOpen)
  }

  hamburger.addEventListener('click', toggle)

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      toggle()
    }
  })
})

// メニューを開いたままページ遷移してもスクロール固定が残らないようにする
document.addEventListener('astro:before-swap', () => {
  document.body.classList.remove('scroll-lock')
})

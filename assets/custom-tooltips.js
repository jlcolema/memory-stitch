function isMobile() {
  return window.innerWidth <= 768;
}

setInterval(() => {
  document.querySelectorAll('.name-input-tooltip-wrapper').forEach(tooltipWrapper => {
    if (tooltipWrapper.classList.contains('added-listeners')) return;
    tooltipWrapper.classList.add('added-listeners');
    const tooltipText = tooltipWrapper.closest('.project-name-wrapper').querySelector('.tooltip-text');
    const tooltipModal = tooltipWrapper.closest('.home_product_price').querySelector('.tooltip-modal');
    const overlay = tooltipWrapper.closest('.home_product_price').querySelector('.overlay');

    tooltipWrapper.addEventListener('mouseenter', () => {
      if (!isMobile()) {
        tooltipText.style.display = 'block';
      }
    });

    tooltipWrapper.addEventListener('mouseleave', () => {
      if (!isMobile()) {
        tooltipText.style.display = 'none';
      }
    });

    tooltipWrapper.addEventListener('click', () => {
      if (isMobile()) {
        tooltipModal.style.display = 'block';
        overlay.style.display = 'block';
      }
    });

    overlay.addEventListener('click', () => {
      tooltipModal.style.display = 'none';
      overlay.style.display = 'none';
    });
  });
}, 500)

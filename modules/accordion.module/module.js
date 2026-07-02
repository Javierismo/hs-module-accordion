const accordions = document.querySelectorAll('.ht-accordion');

const setItemState = (item, isOpen) => {
  const trigger = item.querySelector('.ht-accordion__trigger');
  const panel = item.querySelector('.ht-accordion__panel');

  if (!trigger || !panel) {
    return;
  }

  item.classList.toggle('is-open', isOpen);
  trigger.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    panel.removeAttribute('hidden');
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  } else {
    panel.style.maxHeight = '0px';
    panel.setAttribute('hidden', 'hidden');
  }
};

accordions.forEach((accordion) => {
  const allowMultiple = accordion.dataset.allowMultiple === 'true';
  const items = accordion.querySelectorAll('.ht-accordion__item');

  items.forEach((item) => {
    const trigger = item.querySelector('.ht-accordion__trigger');

    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('is-open');

      if (!allowMultiple) {
        items.forEach((otherItem) => {
          if (otherItem !== item) {
            setItemState(otherItem, false);
          }
        });
      }

      setItemState(item, !isCurrentlyOpen);
    });

    setItemState(item, item.classList.contains('is-open'));
  });

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (item.classList.contains('is-open')) {
        const panel = item.querySelector('.ht-accordion__panel');
        if (panel) {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      }
    });
  });
});

/**
 * HubSpot Accordion Module
 * Author: Javier Fuentes
 * Repository: https://github.com/Javierismo/hs-module-accordion
 * License: MIT
 */

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
		// Reveal panel and lock current content height for smooth transition.
		panel.removeAttribute('hidden');
		panel.style.maxHeight = `${panel.scrollHeight}px`;
	} else {
		// Collapse panel and hide it from assistive tech navigation.
		panel.style.maxHeight = '0px';
		panel.setAttribute('hidden', 'hidden');
	}
};

accordions.forEach((accordion) => {
	
	// When false, opening one item closes the rest.
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
		
		// Recalculate expanded heights after viewport/content reflow.
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

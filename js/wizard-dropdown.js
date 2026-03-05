(function () {

  function wizardSelect(container, options = {}) {

    const defaults = {
      select: '#sectionSelect',
      sectionClass: '.SelectItem',
      prevBtn: '#prevBtn',
      nextBtn: '#nextBtn',
      invisibleClass: 'invisible',
      hiddenSectionClass: 'd-none',
      swipeThreshold: 50
    };

    const settings = Object.assign({}, defaults, options);

    if (!container) {
      console.warn('wizardSelect: container not found');
      return;
    }

    const select = container.querySelector(settings.select);
    const sections = container.querySelectorAll(settings.sectionClass);
    const prevBtn = container.querySelector(settings.prevBtn);
    const nextBtn = container.querySelector(settings.nextBtn);

    if (!select || !sections.length || !prevBtn || !nextBtn) {
      console.warn('wizardSelect: missing required elements');
      return;
    }

    const order = Array.from(select.options).map(o => o.value);

    /* ======================
       CHOICES INIT
    ====================== */
    let choices = null;

    if (window.Choices && !select._choicesInstance) {
      choices = new Choices(select, {
        searchEnabled: true,
        shouldSort: false,
        itemSelectText: '',
        position: 'bottom',
        classNames: {
          containerOuter: 'choices wizard-choices'
        }
      });

      select._choicesInstance = choices;
    } else {
      choices = select._choicesInstance || null;
    }

    function syncChoices(value) {
      if (!choices) return;
      choices.removeActiveItems();
      choices.setChoiceByValue(value);
    }

    function showSection(value) {
      sections.forEach(section => {
        section.classList.toggle(
          settings.hiddenSectionClass,
          section.dataset.section !== value
        );
      });

      const index = order.indexOf(value);

      prevBtn.classList.toggle(settings.invisibleClass, index === 0);
      nextBtn.classList.toggle(
        settings.invisibleClass,
        index === order.length - 1
      );
    }

    /* ======================
       SELECT CHANGE
    ====================== */
    select.addEventListener('change', () => {
      showSection(select.value);
    });

    /* ======================
       BUTTON NAVIGATION
    ====================== */
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const i = order.indexOf(select.value);

      if (i < order.length - 1) {
        const nextValue = order[i + 1];
        select.value = nextValue;
        syncChoices(nextValue);
        showSection(nextValue);
      }
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const i = order.indexOf(select.value);

      if (i > 0) {
        const prevValue = order[i - 1];
        select.value = prevValue;
        syncChoices(prevValue);
        showSection(prevValue);
      }
    });

    /* ======================
       SWIPE SUPPORT
    ====================== */
    let startX = 0;
    let endX = 0;

    container.addEventListener('touchstart', (e) => {
      if (e.target.closest('input, textarea, select')) return;
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (e.target.closest('input, textarea, select')) return;
      endX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const distance = endX - startX;

      if (Math.abs(distance) < settings.swipeThreshold) return;

      const index = order.indexOf(select.value);

      if (distance < 0 && index < order.length - 1) {
        const nextValue = order[index + 1];
        select.value = nextValue;
        syncChoices(nextValue);
        showSection(nextValue);
      }

      if (distance > 0 && index > 0) {
        const prevValue = order[index - 1];
        select.value = prevValue;
        syncChoices(prevValue);
        showSection(prevValue);
      }
    }

    /* ======================
       INIT
    ====================== */
    syncChoices(select.value);
    showSection(select.value);
  }

  /* ======================
     AUTO INIT HELPERS
  ====================== */

  // Single instance
  window.wizardSelect = wizardSelect;

  // Optional auto-init via attribute
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-wizard-select]')
      .forEach(el => wizardSelect(el));
  });

})();

document.addEventListener('DOMContentLoaded', () => {

	const wizards =
		document.querySelectorAll('[data-wizard-select]');

	if (!wizards.length) return;

	wizards.forEach((wizard, index) => {

		const wizardKey =
			wizard.dataset.wizardSelect;

		const triggers =
			document.querySelectorAll(
				`[data-trigger="${wizardKey}"]`
			);

		const prevBtn =
			wizard.querySelector('[data-wizard-prev]');

		const nextBtn =
			wizard.querySelector('[data-wizard-next]');

		const select =
			wizard.querySelector('.wizard-select');

		const sections =
			wizard.querySelectorAll('.content-section');

		if (!select) return;

		/* =========================
			 CREATE OFFCANVAS
		========================= */

		const canvas = document.createElement('div');
		canvas.className =
			'offcanvas offcanvas-end text-bg-dark wizard-picker';

		canvas.innerHTML = `
      <div class="offcanvas-header justify-content-between align-items-center">
        <h5 class="fspx-16 lhpx-16 fw-600 m-0">SELECT STEP</h5>
        <button class="btn p-0 m-0 hpx-24 wpx-24" data-bs-dismiss="offcanvas">
				<span class="material-symbols-outlined text-white fspx-24 lhpx-24 hpx-24 wpx-24">cancel</span>
				</button>
      </div>
      <div class="offcanvas-body">
        <div class="wizard-search-wrap">
          <input type="text" class="form-control wizard-search rounded-1" placeholder="Search...">
        </div>
        <div class="wizard-options"></div>
      </div>
    `;

		document.body.appendChild(canvas);

		const bsCanvas = new bootstrap.Offcanvas(canvas);
		const optionsWrap = canvas.querySelector('.wizard-options');
		const searchInput = canvas.querySelector('.wizard-search');

		/* =========================
			 STEP INDEX
		========================= */

		function getIndex() {
			return select.selectedIndex;
		}

		function setIndex(i) {
			select.selectedIndex = i;
			updateUI();
		}

		function maxIndex() {
			return select.options.length - 1;
		}

		/* =========================
			 UPDATE UI
		========================= */

		function updateUI() {

			const label =
				select.options[getIndex()].text;

			wizard
				.querySelectorAll('.wizard-trigger')
				.forEach(t => t.textContent = label);

			switchSections(select.value);

			/* =========================
				 HIDE / SHOW NAV BUTTONS
			========================= */

			if (prevBtn) {
				prevBtn.style.visibility =
					getIndex() === 0
						? 'hidden'
						: 'visible';
			}

			if (nextBtn) {
				nextBtn.style.visibility =
					getIndex() === maxIndex()
						? 'hidden'
						: 'visible';
			}

		}

		/* =========================
			 SWITCH SECTIONS (ANIMATED)
		========================= */

		function switchSections(value) {

			const current =
				wizard.querySelector(
					'.content-section:not(.d-none)'
				);

			const next =
				wizard.querySelector(
					`.content-section[data-section="${value}"]`
				);

			if (!next || current === next) return;

			wizard.classList.add('wizard-animating');

			/* EXIT CURRENT */

			current.classList.remove('section-enter');
			current.classList.add('section-exit');

			setTimeout(() => {

				current.classList.remove('section-exit');
				current.classList.add('d-none');

				/* ENTER NEXT */

				next.classList.remove('d-none');
				next.classList.add('section-enter');

				setTimeout(() => {

					next.classList.remove('section-enter');
					wizard.classList.remove('wizard-animating');

				}, 260);

			}, 260);

		}

		/* =========================
			 PREV / NEXT
		========================= */

		if (prevBtn) {
			prevBtn.addEventListener('click', () => {
				if (getIndex() > 0) {
					setIndex(getIndex() - 1);
				}
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', () => {
				if (getIndex() < maxIndex()) {
					setIndex(getIndex() + 1);
				}
			});
		}

		/* =========================
			 OPEN OFFCANVAS
		========================= */

		triggers.forEach(trigger => {

			trigger.addEventListener('click', e => {

				e.preventDefault();

				buildOptions();
				searchInput.value = '';
				bsCanvas.show();

			});

		});

		/* =========================
			 BUILD OPTIONS
		========================= */

		function buildOptions() {

			optionsWrap.innerHTML = '';

			[...select.options].forEach((opt, i) => {

				const item = document.createElement('div');
				item.className = 'wizard-option';
				item.textContent = opt.text;

				if (opt.selected) {
					item.classList.add('active');
				}

				item.onclick = () => {
					setIndex(i);
					bsCanvas.hide();
				};

				optionsWrap.appendChild(item);

			});

		}

		/* =========================
			 SEARCH
		========================= */

		searchInput.addEventListener('input', e => {

			const term =
				e.target.value.toLowerCase();

			optionsWrap
				.querySelectorAll('.wizard-option')
				.forEach(opt => {

					opt.style.display =
						opt.textContent
							.toLowerCase()
							.includes(term)
							? ''
							: 'none';

				});

		});

		/* INIT */

		updateUI();

	});

});
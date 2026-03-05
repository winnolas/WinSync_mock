/* ===================================
 Check for browser OS
 ====================================== */

var isMobile = false,
	isiPhoneiPad = false,
	isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	isiPhoneiPad = true;
}

// Log browser detection variables to console
// console.log('Browser Detection Test:');
// console.log('isMobile:', isMobile);
// console.log('isiPhoneiPad:', isiPhoneiPad);
// console.log('isSafari:', isSafari);
// console.log('User Agent:', navigator.userAgent);

/* ===================================
 Import Bootstrap Script
 ====================================== */
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// PopOver
document.querySelectorAll('[data-bs-toggle="popover"]')
	.forEach(popover => {
		new bootstrap.Popover(popover)
	})

const app = document.getElementById("app");

// Remove any text nodes containing BOM characters or their HTML entity representation
[...app.childNodes].forEach((node) => {
	if (
		node.nodeType === Node.TEXT_NODE &&
		(node.nodeValue.includes("\uFEFF") ||
			node.nodeValue.includes("&#xFEFF;"))
	) {
		app.removeChild(node);
	}
});

// 
// Toggle Visibility
// 
function initToggleVisibility() {
  const toggles = document.querySelectorAll('.toggle-visibility');

  toggles.forEach(checkbox => {
    const targetSelector = checkbox.getAttribute('data-toggle-target');
    const target = document.querySelector(targetSelector);

    if (!target) return;

    // Use custom class instead of Bootstrap d-none
    target.classList.toggle('hidden', !checkbox.checked);

    checkbox.addEventListener('change', () => {
      target.classList.toggle('hidden', !checkbox.checked);
    });
  });
}

document.addEventListener('DOMContentLoaded', initToggleVisibility);

// 
// Range Slider Counter
// 
document.addEventListener("DOMContentLoaded", function () {
	const slider = document.getElementById("dosage-input");
	const output = document.getElementById("dosage-output");

	if (slider && output) {
		// Initialize value
		output.textContent = slider.value;

		// Update value on input
		slider.addEventListener("input", () => {
			output.textContent = slider.value;
		});
	}
});


// 
// 
// 
document.addEventListener("DOMContentLoaded", () => {
  // Select all textareas with class "auto-grow"
  const textareas = document.querySelectorAll(".auto-grow");
  autosize(textareas); // apply autosize.js
});


// import { initChoicesWizard }
//   from './wizard-ddsearch.js';

// /* =========================
//    INIT WHEN NEEDED
// ========================= */

// document.addEventListener(
//   'DOMContentLoaded',
//   () => {

//     initChoicesWizard({
//       select: '#sectionSelect',
//       sectionClass: '.content-section'
//     });

//   }
// );


// import { initWizardOffcanvas }
//   from './wizard-offcanvas.js';

// document.addEventListener(
//   'DOMContentLoaded',
//   () => {

//     initWizardOffcanvas();

//   }
// );

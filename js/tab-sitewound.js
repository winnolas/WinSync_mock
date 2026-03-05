function initResponsiveTabs(container) {

  const tabsWrapper = container.querySelector(".rt-tabs");
  const moreTab = container.querySelector(".rt-more");
  const moreMenu = moreTab.querySelector(".dropdown-menu");

  const dropdownWidth = moreTab.offsetWidth || 80;

  const tabs = [
    ...tabsWrapper.querySelectorAll(".nav-item:not(.rt-more)")
  ];

  // Reset
  tabs.forEach(tab => {
    tab.style.display = "block";
    tabsWrapper.insertBefore(tab, moreTab);
  });

  moreMenu.innerHTML = "";
  moreTab.classList.add("d-none");

  if (tabsWrapper.scrollWidth <= tabsWrapper.clientWidth) {
    return;
  }

  moreTab.classList.remove("d-none");

  let availableWidth =
    tabsWrapper.clientWidth - dropdownWidth;

  let usedWidth = 0;

  tabs.forEach(tab => {
    usedWidth += tab.offsetWidth;

    if (usedWidth > availableWidth) {

      const link = tab.querySelector(".nav-link");

      const li = document.createElement("li");
      const a = document.createElement("a");

      a.className = "dropdown-item";
      a.href = link.getAttribute("href");
      a.dataset.bsToggle = "tab";
      a.innerText = link.innerText;

      li.appendChild(a);
      moreMenu.appendChild(li);

      tab.style.display = "none";
    }
  });
}

function runResponsiveTabs() {
  document
    .querySelectorAll(".responsive-tabs")
    .forEach(container => {
      initResponsiveTabs(container);
    });
}

window.addEventListener("load", () => {
  setTimeout(runResponsiveTabs, 50);
});

window.addEventListener("resize", runResponsiveTabs);
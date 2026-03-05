(function ($) {
  $.fn.adaptiveTabs = function () {
      return this.each(function () {
          var $tabsNav = $(this).find('.tabs-nav');
          var $tabsContent = $(this).find('.tabs-content');
          var $moreDropdown = $tabsNav.find('.more-dropdown');
          var $moreBtn = $tabsNav.find('.more-btn').parent();
          var isInitialized = false;

          function updateMoreActiveState() {
              var hasActiveTab = $moreDropdown.find('.tab.active').length > 0;
              $moreBtn.toggleClass('active', hasActiveTab);
          }

          function updateTabs() {
              var navWidth = $tabsNav.width();
              var totalWidth = $moreBtn.outerWidth(true);

              $moreDropdown.children().each(function () {
                  $(this).insertBefore($moreBtn);
              });
              $moreBtn.hide();

              // Calculate the width of all tabs including the active tab
              $tabsNav.children('.tab:not(.tab-more)').each(function () {
                  var $tab = $(this);
                  totalWidth += $tab.outerWidth(true);

                  if (totalWidth > navWidth) {
                      $tab.appendTo($moreDropdown);
                      $moreBtn.show();
                  }
              });

              // Adjust compact mode based on viewport
              if (window.innerWidth <= 1024) {
                  $tabsNav.addClass('compact');
              } else {
                  $tabsNav.removeClass('compact');
              }

              updateMoreActiveState();
          }

          function activateTab(tabId) {
              // Make sure widths are recalculated when activating a tab
              $tabsNav.find('.tab').removeClass('active');
              $tabsNav.find(`[data-tab="${tabId}"]`).addClass('active');

              $tabsContent.find('.tab-content').removeClass('active');
              $tabsContent.find(`#${tabId}`).addClass('active');

              var $innerTabs = $tabsContent.find(`#${tabId}`).find('.tabs-nav');
              if ($innerTabs.length) {
                  $innerTabs.each(function () {
                      $(this).adaptiveTabs();
                  });
              }

              // Recalculate the tabs after the content has been activated
              updateTabs();
          }

          // Event to switch tabs
          $tabsNav.on('click', '.tab:not(.tab-more)', function () {
              var tabId = $(this).data('tab');
              activateTab(tabId);
          });

          // Event to toggle the "more" dropdown
          $tabsNav.on('click', '.more-btn', function (e) {
              e.preventDefault();
              $moreDropdown.toggleClass('show');
          });

          // Close the dropdown if clicking outside
          $(document).on('click', function (e) {
              if (!$(e.target).closest('.tab-more').length && !$(e.target).closest('.tabs-container').length) {
                  $moreDropdown.removeClass('show');
                  updateTabs(); // Trigger tab recalculation when clicking outside
              }
          });

          function initializeTabs() {
              if (isInitialized) return;

              updateTabs();

              var $activeTab = $tabsNav.find('.tab.active');
              if (!$activeTab.length) {
                  $activeTab = $tabsNav.find('.tab:first');
                  $activeTab.addClass('active');
              }

              activateTab($activeTab.data('tab'));
              isInitialized = true;
          }

          var resizeTimer;
          $(window).on('resize', function () {
              clearTimeout(resizeTimer);
              resizeTimer = setTimeout(updateTabs, 50);
          });

          // Make sure to initialize tabs even on smaller screens initially
          $(function () {
              // Check if the initial window width is <= 1024px and handle it
              if (window.innerWidth <= 1024) {
                  $tabsNav.addClass('compact');
              } else {
                  $tabsNav.removeClass('compact');
              }

              // Initialize tabs if visible
              if ($tabsNav.is(':visible')) {
                  initializeTabs();
              } else {
                  var checkVisibility = setInterval(function () {
                      if ($tabsNav.is(':visible')) {
                          initializeTabs();
                          clearInterval(checkVisibility);
                      }
                  }, 100);

                  setTimeout(function () {
                      clearInterval(checkVisibility);
                  }, 1000);
              }
          });

          updateTabs();

          // Watch for any changes within .tabs-container to update the tabs
          $(this).on('DOMSubtreeModified', function () {
              updateTabs(); // Recalculate tabs if any content changes inside the container
          });
      });
  };
})(jQuery);

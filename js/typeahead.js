/* ===================================
 Jquery
 ====================================== */

$(function () {
  const people = [
    "John Doe", "Jane Smith", "Michael Brown", "Emily Johnson", "David Wilson",
    "Olivia Davis", "Daniel Lee", "Sophia Martinez", "James Anderson", "Isabella Clark",
    "William Harris", "Mia Lewis", "Alexander Young", "Charlotte Walker", "Ethan Hall",
    "Amelia Allen", "Liam Wright", "Harper Scott", "Mason Adams", "Evelyn Nelson",
    "Logan Hill", "Abigail Green", "Lucas Baker", "Chloe King", "Benjamin Turner",
    "Avery Campbell", "Elijah Phillips", "Ella Mitchell", "Sebastian Rivera", "Aria Parker"
  ];

  const peopleEngine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: people
  });

  const $input = $('#search-patient-top');
  const $clearBtn = $('#clear-search-btn');

  $input.typeahead(
    {
      hint: true,
      highlight: true,
      minLength: 0
    },
    {
      name: 'people',
      display: item => item,
      source: function (query, syncResults) {
        if (!query) {
          syncResults(people);
        } else {
          const matches = people.filter(name =>
            name.toLowerCase().includes(query.toLowerCase())
          );
          syncResults(matches);
        }
      },
      limit: 100
    }
  );

  $input.on('focus click', function () {
    $(this).trigger('input');
  });

  $input.on('input', function () {
    $clearBtn.toggle(!!$(this).val());
  });

  $input.on('typeahead:select typeahead:autocomplete', function () {
    $clearBtn.show();
  });

  $clearBtn.on('click', function () {
    $input.typeahead('val', '');
    $clearBtn.hide();
    $input.focus();
  });
});
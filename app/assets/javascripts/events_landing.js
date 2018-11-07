
searchGen = document.querySelector(".search-gen");
searchLoc = document.querySelector(".search-loc");


$(document).ready(function () {

    $(".search-toggle").bootstrapToggle({
      on: '<i class="fas fa-info"></i>',
      off: '<i class="fas fa-map-marker-alt"></i>',
      size: 'large',
      onstyle: 'danger',
      offstyle: 'danger'
    });

    $('.search-toggle').change(function() {
      toggleSearchBars();
    })
});


function toggleSearchBars() {

    if (searchLoc.classList.contains("d-none")) {
        document.getElementById("q").value = null;
        searchGen.classList.add("d-none");
        searchLoc.classList.remove("d-none");
    } else {
        document.getElementById("p").value = null;
        searchLoc.classList.add("d-none");
        searchGen.classList.remove("d-none");
    };
};


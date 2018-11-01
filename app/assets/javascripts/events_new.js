
console.log("New event form custom scripts running")
var addressInput = document.getElementById('addressInput');
var postcodeInput = document.getElementById('postcodeInput');
var latHide = document.getElementById('latitudeHidden');
var longHide = document.getElementById('longitudeHidden');
var options = {
  // types: ['establishment'],
  componentRestrictions: {country: 'sg'}
};

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(addressInput, options);

    google.maps.event.addDomListener(addressInput, 'keydown', function(e) { // disables 'Enter' key submitting f when suggestions are open
        if (e.keyCode == 13 && $('.pac-container:visible').length) {
            e.preventDefault();
        }
    });

    autocomplete.addListener('place_changed', fillInAddress);
};

function fillInAddress() {
    var place = autocomplete.getPlace();
    for (var i = 0; i < place.address_components.length; i++) {
  for (var j = 0; j < place.address_components[i].types.length; j++) {
    if (place.address_components[i].types[j] == "postal_code") {
              postcodeInput.value = place.address_components[i].long_name;
    };
  };
};
addressInput.value = place.name;
    latHide.value = place.geometry.location.lat();
    longHide.value = place.geometry.location.lng();
};



$('#truckModal1').on('show.bs.modal', function() {

    flatpickr('#flatpickr-input', {
        // plugins: [new rangePlugin({ input: "#flatpickr-input2"})],
        static: true,
        inline: true,
        showMonths: 2,
        mode: "range",
        minDate: "today",
        maxDate: new Date().fp_incr(100),
        dateFormat: "l, J M y",
        // disable: disabledDates,
        onValueUpdate: function(selectedDates) {

        //     rentalDuration = parseInt( (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24 ) ) + 1;

        //     if (rentalDuration > 0) {
        //         rentalForm.style.display = "block";

        //         fieldRentalDuration.textContent = `$${rentalRate} x ${rentalDuration} day(s)`;
        //         fieldRentalSubTotal.textContent = `$${(rentalRate * rentalDuration).toFixed(2)}`;
        //         fieldRentalFee.textContent = `$${(0.1 * rentalRate * rentalDuration).toFixed(2)}`;
        //         fieldRentalGrandTotal.textContent = `S$${(1.1 * rentalRate * rentalDuration).toFixed(2)}`;
        //         confirmationModalGrandTotal.textContent = `S$${(1.1 * rentalRate * rentalDuration).toFixed(2)}`;
        //     };
        }
    });
});











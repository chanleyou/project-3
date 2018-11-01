console.log("New event form custom scripts running");

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




var modalTitle = document.querySelector("#truckModal .modal-title");
var truckID = document.querySelector("#event_truck_id");
var eventStartDateShow = document.querySelector("#eventStartDateShow");
var eventEndDateShow = document.querySelector("#eventEndDateShow");
var eventStartDateHidden = document.querySelector("#eventStartDateHidden");
var eventEndDateHidden = document.querySelector("#eventEndDateHidden");

var disabledDates
var rentalDuration
var basicDates = [];
var kitchenDates = [];
var freezerDates = [];

for (i = 0; i < gon.eventsBasicTruck.length; i++) {

    basicDates.push({

        from: `${gon.eventsBasicTruck[i].start_date}`,
        to: `${gon.eventsBasicTruck[i].end_date}`
    });
};

for (i = 0; i < gon.eventsKitchenTruck.length; i++) {

    kitchenDates.push({

        from: `${gon.eventsKitchenTruck[i].start_date}`,
        to: `${gon.eventsKitchenTruck[i].end_date}`
    });
};

for (i = 0; i < gon.eventsFreezerTruck.length; i++) {

    freezerDates.push({

        from: `${gon.eventsFreezerTruck[i].start_date}`,
        to: `${gon.eventsFreezerTruck[i].end_date}`
    });
};


$('#truckModal').on('show.bs.modal', function(e) {

    if ($(e.relatedTarget)[0].id === "modal-truck-basic") {
        disabledDates = basicDates;
        truckID.value = 1 // gon.eventsBasicTruck[0].truck_id;
    } else if ($(e.relatedTarget)[0].id === "modal-truck-kitchen") {
        disabledDates = kitchenDates;
        truckID.value = 4 // gon.eventsKitchenTruck[0].truck_id;
    } else if ($(e.relatedTarget)[0].id === "modal-truck-freezer") {
        disabledDates = freezerDates;
        truckID.value = 7 // gon.eventsFreezerTruck[0].truck_id;
    };

    flatpickr('#flatpickr-input', {
        // plugins: [new rangePlugin({ input: "#flatpickr-input2"})],
        static: true,
        inline: true,
        showMonths: 2,
        mode: "range",
        minDate: "today",
        maxDate: new Date().fp_incr(700),
        dateFormat: "Y-m-d",
        disable: disabledDates,
        onValueUpdate: function(selectedDates) {

            rentalDuration = parseInt( (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24 ) ) + 1;

            if (rentalDuration > 0) {
                eventStartDateHidden.value = selectedDates[0];
                eventEndDateHidden.value = selectedDates[1];
                eventStartDateShow.innerHTML = flatpickr.formatDate(selectedDates[0], "l, J M, Y");
                eventEndDateShow.innerHTML = flatpickr.formatDate(selectedDates[1], "l, J M, Y");
            };
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











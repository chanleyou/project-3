
console.log("New event form Googlemaps Autocomplete script running...")
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


eventDeck = document.querySelector(".card-deck")
eventCards = document.querySelectorAll(".eventcard");
// searchTog = document.querySelector(".search-toggle");
searchGen = document.querySelector(".search-gen");
searchLoc = document.querySelector(".search-loc");


$(document).ready(function () {

    $(".eventcard").click(function(){
        window.location = $(this).find("a:first").attr("href");
        return false;
    });

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


window.onload = function() {
    if (gon.params.p && gon.params.p.length > 0) {
        $('.search-toggle').bootstrapToggle('off');
    };
};


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


function sortCards(cards) {
    var eventCardsArr = [].slice.call(cards).sort(function (a, b) {
        a = a.querySelector("p.badge").textContent;
        b = b.querySelector("p.badge").textContent;
        if(a === "" || a === null) return 1;
        if(b === "" || b === null) return -1;
        if(a === b) return 0;
        return parseFloat(a) < parseFloat(b) ? -1 : 1;
    });
    eventCardsArr.forEach(function (div) {
        div.parentElement.appendChild(div);
    });
};


function initMap() {

    let position_search;
    let geocoder = new google.maps.Geocoder();
    let bounds = new google.maps.LatLngBounds();
    let map = new google.maps.Map(document.getElementById('map'), {

        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 11,
        // mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        clickableIcons: false,
        // streetViewControl: false
        styles: mapStyle_lostInTheDesert
    });

    if (gon.params.p) {

        geocoder.geocode({ 'address': `Singapore ${gon.params.p}`, componentRestrictions: {country: 'SG'} }, function(results, status) {

            if (status === 'OK') {

                position_search = results[0].geometry.location;

                let marker = new google.maps.Marker({
                    position: position_search,
                    map: map,
                    title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + position_search.lat() + "<br />Longitude: " + position_search.lng(),
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "white",
                        fillOpacity: 0.5,
                        strokeColor: "black",
                        strokeOpacity: 1.0,
                        strokeWeight: 1,
                        scale: 4
                    },
                });

                eventCircle = new google.maps.Circle({
                    strokeColor: '#2C2C2C',
                    strokeOpacity: 0.35,
                    strokeWeight: 1,
                    fillColor: '#2C2C2C',
                    fillOpacity: 0.35,
                    map: map,
                    center: position_search,
                    radius: 2500
                });

                addMarkers();
                sortCards(eventCards);

                map.fitBounds(eventCircle.getBounds());

            } else {

                console.log('Geocode was not successful for the following reason: ' + status);
            };
        });

    } else {

        addMarkers();
    };


    function addMarkers() {

        for (let i = 0; i < gon.events.length; i++) {

            if (gon.events[i].lat && gon.events[i].lng) {

                let eventCard = document.getElementById(gon.events[i].id);
                let dist;
                let infowindow;
                let position = new google.maps.LatLng(parseFloat(gon.events[i].lat), parseFloat(gon.events[i].lng));
                let marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    animation: google.maps.Animation.DROP
                });

                if (gon.params.p) {

                    dist = `${(google.maps.geometry.spherical.computeDistanceBetween(position, position_search) / 1000).toFixed(2)}km`;
                    infowindow = new google.maps.InfoWindow({
                        content: `<div class="info-window-content">
                        <a href="/events/${gon.events[i].id}">
                            <strong>${gon.events[i].title}</strong>
                        </a>
                        <br>${gon.events[i].description}
                        <br>${moment(gon.events[i].start_date).format('ddd, Do MMM')} - ${moment(gon.events[i].end_date).format('ddd, Do MMM')}
                        <br>${moment(gon.events[i].start_time).format('h:mm a')} to ${moment(gon.events[i].end_time).format('h:mm a')}
                        <br>${dist} away
                        </div>`
                    });

                    eventCard.querySelector("p.badge").textContent = dist;

                } else {

                    infowindow = new google.maps.InfoWindow({
                        content: `<div class="info-window-content">
                        <a href="/events/${gon.events[i].id}">
                            <strong>${gon.events[i].title}</strong>
                        </a>
                        <br>${gon.events[i].description}
                        <br>${moment(gon.events[i].start_date).format('ddd, Do MMM')} - ${moment(gon.events[i].end_date).format('ddd, Do MMM')}
                        <br>${moment(gon.events[i].start_time).format('h:mm a')} to ${moment(gon.events[i].end_time).format('h:mm a')}
                        </div>`
                    });
                };

                bounds.extend(position);
                map.fitBounds(bounds);

                google.maps.event.addListenerOnce(map, 'idle', function() { // Prevents map being too zoomed-in if only 1 search result
                  if (gon.events.length === 1) {
                    map.setZoom(16);
                  }
                });

                marker.addListener('click', function() {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    infowindow.open(map, this);
                });

                google.maps.event.addListener(map, "click", function(event) {
                    marker.setAnimation(-1);
                    infowindow.close();
                });

                google.maps.event.addListener(infowindow,'closeclick',function() {
                   marker.setAnimation(-1);
                });

                eventCard.addEventListener('mouseover', function() {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    infowindow.open(map, marker);
                });

                eventCard.addEventListener('mouseout', function() {
                    marker.setAnimation(-1);
                    infowindow.close();
                });
            };
        };
    };
};


mapStyle_lostInTheDesert = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "-37"
            },
            {
                "gamma": "4.16"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-8"
            },
            {
                "lightness": "-9"
            },
            {
                "color": "#000000"
            },
            {
                "gamma": "0.00"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    }
]


mapStyle_redAlert = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffdfa6"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b52127"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5531b"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#74001b"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#da3c3c"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#74001b"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#da3c3c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#990c19"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#74001b"
            },
            {
                "lightness": -8
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#6a0d10"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffdfa6"
            },
            {
                "weight": 0.4
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]




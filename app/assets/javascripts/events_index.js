console.log("initmap");

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
    });

    if (gon.search_post) {

        geocoder.geocode({ 'address': `Singapore ${gon.search_post}`, componentRestrictions: {country: 'SG'} }, function(results, status) {

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
                    radius: 1500
                });

                addMarkers();

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

                let dist;
                let infowindow;
                // let position = {lat: parseFloat(gon.events[i].lat), lng: parseFloat(gon.events[i].lng)};
                let position = new google.maps.LatLng(parseFloat(gon.events[i].lat), parseFloat(gon.events[i].lng));
                let marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    animation: google.maps.Animation.DROP
                });

                if (gon.search_post) {

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

                // marker.addListener('mouseout', function() {
                //     marker.setAnimation(-1);
                //     infowindow.close();
                // });

                // marker.addListener('click', function() {
                //         window.location.href = `/events/${gon.events[i].id}`;
                // });
            };
        };
    };
};


    // for (let i = 0; i < carlist.length; i++) {

    //     function showCars() {
    //         for (j=0; j < carlist.length; j++) {
    //             carlist[j].style.display = "block";
    //         };
    //     };

    //     function hideOtherCars() {
    //         for (j = 0; j < carlist.length; j++) {
    //             if (j != i) {
    //                 carlist[j].style.display = "none";
    //             };
    //         };
    //     };


    //     const address = `Singapore ${carlist[i].querySelector(".postcode").textContent}`;
    //     const contentString = carlist[i].querySelector(".car-info").innerHTML;
    //     const carImg = carlist[i].querySelector(".car-pic img");

    //     geocoder.geocode({ 'address': address, componentRestrictions: {country: 'SG'} }, function(results, status) {

    //         if (status === 'OK') {

    //             const position = results[0].geometry.location;
    //             bounds.extend(position);

    //             var infowindow = new google.maps.InfoWindow({
    //                 content: `<div class="info-window-content">${contentString}</div>`
    //             });

    //             var marker = new google.maps.Marker({
    //                 map: map,
    //                 position: position,
    //                 animation: google.maps.Animation.DROP
    //             });


    //             marker.addListener('mouseover', function() {
    //                 marker.setAnimation(google.maps.Animation.BOUNCE)
    //                 showCars();
    //                 hideOtherCars();
    //                 infowindow.open(map, this);
    //             });

    //             marker.addListener('mouseout', function() {
    //                 marker.setAnimation(-1);
    //                 infowindow.close();
    //                 showCars();
    //             });

    //             marker.addListener('click', function() {
    //                 window.location.href = `/cars/${carlist[i].id.substr(3)}`;
    //             });

    //             map.fitBounds(bounds);

    //             carImg.addEventListener('mouseover', function() {
    //                 map.panTo(position);
    //                 infowindow.open(map, marker);
    //             })

    //             carImg.addEventListener('mouseout', function() {
    //                 infowindow.close();
    //             });

    //             // marker.addListener('click', function() {
    //             //     google.maps.event.clearListeners(marker, 'mouseout');
    //             //     hideOtherCars();
    //             // });

    //             // infowindow.addListener('closeclick', function() {
    //             //     marker.addListener('mouseout', function() {
    //             //         infowindow.close();
    //             //     });
    //             //     showCars();
    //             // });

    //         } else {

    //             console.log('Geocode was not successful for the following reason: ' + status);
    //         };
    //     });
    // };

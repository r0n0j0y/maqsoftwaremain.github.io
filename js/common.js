Date.prototype.format = function () {
    "use strict";
    var arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        sValue = arrMonths[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear();
    return sValue;
};

function getParameterByName(name) {
    "use strict";
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(decodeURIComponent(location.href));
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function redirectPowerBI() {
    window.location.href = "/#expertise/powerbi"; // Redirecting to Power BI Expertise
}

function setTabNavLinkBehavior() {
    $("#tabs .nav-link").click(function () {
        $("#tabs .nav-link").removeClass('active');
    });
}

function closeMenuIfOpen() {
    $("a, a *, #body, #body *").click(function () {
        if ($(this).hasClass("menu-has-sub") || $(this).hasClass("fa-angle-down") || $(this).hasClass("fa-angle-up")) {
            return; // return in case of sub menu header click
        }
        if ($(".nav-bar-icon").length && $(".nav-bar-icon").hasClass("active")) {
            $(".nav-bar-icon").removeClass("active");
            if ($(".nav-menu").length && $(".nav-menu").hasClass("active")) {
                $(".nav-menu").removeClass("active");
            }
            if ($(".nav-menu .nav-menu-inner .menu-opened").length) {
                $(".nav-menu .nav-menu-inner .menu-opened").removeClass("menu-opened");
            }
            if ($(".nav-menu .nav-menu-inner .fa-angle-up").length) {
                $(".nav-menu .nav-menu-inner .fa-angle-up").each(function () {
                    $(this).removeClass("fa-angle-up").addClass("fa-angle-down");
                })
            }
            if ($(".nav-menu .nav-menu-inner .sub-dropdown").length) {
                $(".nav-menu .nav-menu-inner .sub-dropdown").each(function () {
                    if ($(this).css('display') == 'block') {
                        $(this).css('display', 'none');
                    }
                })
            }
        }
    });
}
function isCareersPage() {
    if ($('#careers').length) {
        return true;
    }
    return false;
}
// Close menu if open
// closeMenuIfOpen();

function updateTitle(viewName) {
    var sTitle = "MAQ Consulting | Data Management, Power BI, Artificial Intelligence";
    if (typeof viewName !== "undefined") {
        switch (viewName.toLowerCase()) {
            case "hiretalent":
                sTitle = "MAQ Consulting | Hire Talent";
                break;
            case "expertise":
                sTitle = "MAQ Consulting | Our Expertise";
                break;
            case "findwork":
                sTitle = "MAQ Consulting | Find Work";
                break;
            case "benefits":
                sTitle = "MAQ Consulting | Benefits";
                break;
            case "contacts":
                sTitle = "MAQ Consulting | Contacts";
                break;
        }
    }
    $("title").text(sTitle);
    if (typeof viewName === "undefined") {
        viewName = ""
    }
    //if (typeof (history.pushState) != "undefined") {
    //    var obj = { Title: sTitle, Url: "/" + viewName };
    //    history.pushState(obj, obj.Title, obj.Url);
    //} else {
    //    console.log("Browser does not support HTML5.");
    //}
}

var oArray = ["hiretalent", "expertise", "findwork", "benefits", "contacts"];
function navigate() {
    var sLoc = location.href, item;
    var iTopPosition, sScrollElement = "body,html", iFlag = 1;
    if (typeof sLoc !== "undefined" && sLoc !== "") {
        oArray.forEach(function (item) {
            if (sLoc.indexOf(item) !== -1) {
                iTopPosition = $("#" + item).offset().top;
                $(sScrollElement).animate({ scrollTop: iTopPosition }, 750);
                iFlag = 0;
            }
        });
        if (iFlag) {
            $(sScrollElement).animate({ scrollTop: 0 }, 750);
        }
    }
}

$(window).scroll(function () {
    scroll();
});
function scroll() {
    var iTopPosition;
    $(".nav-menu-inner a").removeClass("active");
    updateTitle();
    var sLoc = location.href, sNewLocation;
    oArray.forEach(function (item) {
        iTopPosition = $("#" + item).offset().top - $("#header").height();
        if ($(window).scrollTop() > iTopPosition) {
            $(".nav-menu-inner a").removeClass("active");
            $(".nav-menu-inner ." + item).addClass("active");
            //if (sLoc !== sLoc + item) {
            //    location.href = sLoc + "" + item;
            //}
            
            updateTitle(item);
            //location.href = "/#" + item;
        }
    });
}

var oMapData =
            {
                address: "15446 Bel-Red Road, Second Floor,\nRedmond, WA 98052",
                lat: 47.633087,
                long: -122.133202
            };
function initMap() {
    showMap(oMapData.lat, oMapData.long, oMapData.address);
}

function showMap(Latitude, Longitude, address) {

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var oLatLng = { lat: Latitude, lng: Longitude };
    var styledMapType = new google.maps.StyledMapType(
        [
  {
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#f5f5f5"
        }
      ]
  },
  {
      "elementType": "labels.icon",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
  },
  {
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#616161"
        }
      ]
  },
  {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
            "color": "#f5f5f5"
        }
      ]
  },
  {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#bdbdbd"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#eeeeee"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#757575"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#e5e5e5"
        }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#ffffff"
        }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#757575"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#dadada"
        }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#616161"
        }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#e5e5e5"
        }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#eeeeee"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
            "color": "#c9c9c9"
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#9e9e9e"
        }
      ]
  }
        ],
        { name: 'Styled Map' });

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: oLatLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    oMarker = new google.maps.Marker({
        position: oLatLng,
        map: map,
        title: 'MAQ Software\n' + address,
        animation: google.maps.Animation.DROP,
        icon: "/img/map-marker.png",
        //label: 'Hello World!',
        draggable: true
    });
    //var infowindow = new google.maps.InfoWindow({
    //    content: '<h5 Style="text-transform: none;">MAQ Software</h5>' + address
    //});
    //google.maps.event.addListener(oMarker, 'click', function () {
    //    infowindow.open(map, oMarker);
    //});
    //infowindow.open(map, oMarker);

    //google.maps.Marker.prototype.setLabel = function (label) {
    //    this.label = new MarkerLabel({
    //        map: this.map,
    //        marker: this,
    //        text: label
    //    });
    //    this.label.bindTo('position', this, 'position');
    //};

    //var MarkerLabel = function (options) {
    //    this.setValues(options);
    //    this.span = document.createElement('span');
    //    this.span.className = 'map-marker-label';
    //};

    //MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
    //    onAdd: function () {
    //        this.getPanes().overlayImage.appendChild(this.span);
    //        var self = this;
    //        this.listeners = [
    //        google.maps.event.addListener(this, 'position_changed', function () { self.draw(); })];
    //    },
    //    draw: function () {
    //        var text = String(this.get('text'));
    //        var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
    //        this.span.innerHTML = text;
    //        this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
    //        this.span.style.top = (position.y - markerSize.y + 40) + 'px';
    //    }
    //});
}

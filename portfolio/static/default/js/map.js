/*global $:false, google:false, TimelineLite:false, Power3:false */

/* Google Map Address > /add new address in the end of array/ */
var stationMapList = [
{"latlng":[41.38506,2.17340],name:"Barcelona", pin:'img/pin_2.png', id:'address0', tab:'tab1-button'},
{"latlng":[41.11902,1.24521],name:"Tarragona", pin:'img/pin.png', id:'address1', tab:'tab1-button'},
{"latlng":[40.41678,-3.70379],name:"Madrid", pin:'img/pin_2.png', id:'address2' ,tab:'tab1-button'},
{"latlng":[37.99233,-1.13046],name:"Murcia", pin:'img/pin.png', id:'address3' ,tab:'tab1-button'},
{"latlng":[39.46991,-0.37629],name:"Valencia", pin:'img/pin.png', id:'address4' ,tab:'tab1-button'},
{"latlng":[39.57119,2.64663],name:"Palma de Mallorca", pin:'img/pin_2.png', id:'address5' ,tab:'tab1-button'},
{"latlng":[37.88818,-4.77938],name:"Cordoba", pin:'img/pin_2.png', id:'address6' ,tab:'tab1-button'},
{"latlng":[36.72126,-4.42127],name:"Malaga", pin:'img/pin.png', id:'address7' ,tab:'tab1-button'},
{"latlng":[40.97010,-5.66354],name:"Salamanca", pin:'img/pin_2.png', id:'address8' ,tab:'tab1-button'},
{"latlng":[41.65225,-4.72453],name:"Valladolid", pin:'img/pin.png', id:'address9' ,tab:'tab1-button'},
{"latlng":[43.36191,-5.84939],name:"Oviedo", pin:'img/pin_2.png', id:'address10' ,tab:'tab1-button'},
{"latlng":[37.38810,-5.98233],name:"Sevilla", pin:'img/pin_2.png', id:'address11' ,tab:'tab1-button'},
{"latlng":[36.72126,-4.42127],name:"Málaga", pin:'img/pin.png', id:'address12' ,tab:'tab1-button'},
{"latlng":[41.21515,1.72745],name:"Vilanova i la Geltrú", pin:'img/pin_2.png', id:'address13' ,tab:'tab1-button'},
{"latlng":[42.01112,-4.53203],name:"Palencia ", pin:'img/pin_2.png', id:'address14' ,tab:'tab1-button'},
{"latlng":[42.59873,-5.56710],name:"León", pin:'img/pin.png', id:'address15' ,tab:'tab1-button'},
{"latlng":[41.64879,-0.88958],name:"Zaragoza", pin:'img/pin_2.png', id:'address16' ,tab:'tab1-button'},
{"latlng":[41.97221,2.81988],name:"Girona", pin:'img/pin.png', id:'address17' ,tab:'tab1-button'},
{"latlng":[38.54106,-0.12249],name:"Benidorm", pin:'img/pin_2.png', id:'address18' ,tab:'tab1-button'},
{"latlng":[38.90895,1.42812],name:"Ibiza", pin:'img/pin.png', id:'address19' ,tab:'tab1-button'}
];

var infoWnd, mapCanvas;

function initialize() {
	
	"use strict";
	
	var pinkParksStyles = [{ 
		featureType: 'all',
		stylers: [
			{ saturation: -100 },
			{ lightness: -25 }
		]
	}];
	
	var styledMap = new google.maps.StyledMapType(pinkParksStyles, {name: 'styled_map'});
	var mapOptions = {
		zoom: 17,
		minZoom: 3,
		center: new google.maps.LatLng(54.52596,15.25512),
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
		},
			panControl: false,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			scrollwheel: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			}
	};

	var mapDiv = document.getElementById('google-map');
	
	mapCanvas = new google.maps.Map(mapDiv, mapOptions);
	infoWnd = new google.maps.InfoWindow();

	var bounds = new google.maps.LatLngBounds();
	var stationMap, i, latlng; 
	
	for (i=0;i< stationMapList.length;i++) {
		
		stationMap = stationMapList[i];
		latlng = new google.maps.LatLng(stationMap.latlng[0], stationMap.latlng[1]);
		bounds.extend(latlng);
		
		var marker = createMarker(
			mapCanvas, latlng, stationMap.name, stationMap.pin, stationMap.id, stationMap.tab
		);

		createMarkerButton(marker);
	}
	
	$("#marker-list").mCustomScrollbar("update"); //update scrollbar according to newly appended content
	$("#marker-list").mCustomScrollbar("scrollTo","a:last",{scrollInertia:2500,scrollEasing:"easeInOutQuad"}); //scroll to appended content
	
	mapCanvas.fitBounds(bounds);
	mapCanvas.mapTypes.set('map_style', styledMap);
	mapCanvas.setMapTypeId('map_style');
}

/* end */

function createMarker(map, latlng, title, pin, id, tab) {
	
	"use strict";
	
	var marker = new google.maps.Marker({
		position : latlng,
		map : map,
		icon: pin,
		title : title
	});

	google.maps.event.addListener(marker, 'click', function() {
		
		mapCanvas.setZoom(17);
		mapCanvas.setCenter(marker.getPosition());

		$('#marker-list a').removeClass('active');
		$('#marker-list a:contains("' + title + '")').addClass("active");

		var tl = new TimelineLite();
		
		$('#contacts-container').addClass('outside');
		
		tl.to($('#address-cluod'), 0.3,{css: {right:-500}, ease:Power3.easeInOut, 
			onComplete: function() {
				
				tl.to($('#address-cluod'), 0.3,{css: {right:40}, ease:Power3.easeInOut});
			
				$('#address-cluod div').hide();
				$('#'+id).show();
				$('#'+tab).trigger('click');
				
			}
		});
	});
	
	return marker;
}



function createMarkerButton(marker) {
	
	"use strict";
	
	var a = document.createElement('a');
	var title = marker.getTitle();
	
	a.innerHTML = title;
	$("#marker-list .mCSB_container").append(a);

	google.maps.event.addDomListener(a, 'click', function(){
	google.maps.event.trigger(marker, 'click');

	});


}

google.maps.event.addDomListener(window, 'load', initialize);
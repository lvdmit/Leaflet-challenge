// function create (earthquakeCircles) {
// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  upto1: new L.LayerGroup(),
  upto2: new L.LayerGroup(),
  upto3: new L.LayerGroup(),
  upto4: new L.LayerGroup(),
  upto5: new L.LayerGroup(),
  more5: new L.LayerGroup(),
  markerColor: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [37.278518, -114.953091],
  zoom: 5,
  layers: [
    layers.upto1,
    layers.upto2,
    layers.upto3,
    layers.upto4,
    layers.upto5,
    layers.more5,
    layers.markerColor
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "0-1": layers.upto1,
  "1-2": layers.upto2,
  "2-3": layers.upto3,
  "3-4": layers.upto4,
  "4-5": layers.upto5,
  "5+": layers.more5
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5],
            labels=[]
            
// loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML += 
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};

legend.addTo(map);


function getColor(d) {
return d > 5 ? 'red' :
  d > 4  ? 'darkorange' :
  d > 3  ? 'gold' :
  d > 2  ? 'yellow' :
  d > 1   ? 'greenyellow' :
          'limegreen';
}


 
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  var colors = {
    "upto1":"limegreen",
    "upto2":"greenyellow",
    "upto3":"yellow",
    "upto4":"gold",
    "upto5":"darkorange",
    "more5":"red"
  }
  // var colorScale = ['limegreen', 'greenyellow','yellow', 'gold', 'orange', 'orangered']  
    
    for (var i = 0; i < data.features.length; i++) {

      var magnitude = data.features[i].properties.mag;
        console.log(magnitude)
      // var magnitude_rounded = Math.floor(magnitude);

      var markerColor;

        if (magnitude <= 1) {
          markerColor = "upto1";
        }
        
        else if (magnitude >= 1 && magnitude <= 2) {
          markerColor = "upto2";
        }
      
        else if (magnitude >= 2 && magnitude <= 3) {
          markerColor = "upto3";
        }
      
        else if (magnitude >= 3 && magnitude <= 4) {
          markerColor = "upto4";
        }
     
        else if (magnitude >= 4 && magnitude <= 5) {
          markerColor = "upto5";
        }
        else {
          markerColor = "more5";
        }

      
        new L.CircleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
          radius: magnitude*5, 
          color: 'grey',
          fillColor: colors[markerColor],
          // color: colorScale[magnitude_rounded],
          // fillColor:colorScale[magnitude_rounded], 
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
          clickable: true
        }).bindPopup(data.features[i].properties.place + "<br> Magnitude: " + data.features[i].properties.mag).addTo(layers[markerColor]);

    }

  });




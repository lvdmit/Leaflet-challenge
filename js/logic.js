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
  zoom: 2.5,
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


// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);


 
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  // var colors = {
  //   "upto1":"limegreen",
  //   "upto2":"greenyellow",
  //   "upto3":"yellow",
  //   "upto4":"gold",
  //   "upto5":"orange",
  //   "more5":"orangered"
  // }
  var colorScale = ['limegreen', 'greenyellow','yellow', 'gold', 'orange', 'orangered']  
    
    for (var i = 0; i < data.features.length; i++) {

      var magnitude = data.features[i].properties.mag;
        console.log(magnitude)
      var magnitude_rounded = Math.floor(magnitude);

      var markerColor;

        if (magnitude<1) {
          markerColor = "upto1";
          // markerColor = colors["upto1"];
          // markerColor = "limegreen";
          console.log(markerColor)
        }
        
        else if (1<magnitude<2) {
          markerColor = "upto2";
          // markerColor = colors.upto2;
          // markerColor = colors["upto2"];
          console.log(markerColor)
        }
      
        else if (2<magnitude<3) {
          markerColor = "upto3";
          // markerColor = colors["upto3"];
          console.log(markerColor)
        }
      
        else if (3<magnitude<4) {
          markerColor = "upto4";
          // markerColor = colors["upto4"];
          console.log(markerColor)
        }
     
        else if (4<magnitude<5) {
          markerColor = "upto5";
          // markerColor = colors["upto5"];
          console.log(markerColor)
        }
        else {
          markerColor = "more5";
          // markerColor = colors["more5"];
          console.log(markerColor)
        }

      
        new L.CircleMarker([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
          radius: data.features[i].properties.mag * 5, 
          // color: markerColor,
          // fillColor: markerColor,
          color: "limegreen",
          fillColor: "blue",
          // color: colorScale[magnitude_rounded],
          // fillColor:colorScale[magnitude_rounded], 
          weight: 1,
          opacity: 1,
          fillOpacity: 0.4,
          clickable: true
        }).bindPopup(data.features[i].properties.place + "<br> Magnitude: " + data.features[i].properties.mag).addTo(layers[markerColor]);

    }

  });




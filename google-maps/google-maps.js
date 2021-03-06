Locations = new Mongo.Collection("location");
  //console.dir(Locations.find().fetch());


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }


  });

  Template.body.helpers({
    exampleMapOptions2: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // We can use the `ready` callback to interact with the map API once the map is ready.
      GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        
        //for loop to create markers
        // var marker = new google.maps.Marker({
        //   position: map.options.center,
        //   map: map.instance
        // });



        var mapPoints = Locations.find();
        //  debugger;

        mapPoints.forEach(function (location) {
          console.log(location.Lat, location.Lon);
          // console.dir(location);
            var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.Lat, location.Lon),
            map: map.instance
          });
        });
      });

      // Map initialization options
      return {
        center: new google.maps.LatLng(49, -122.9631),
        zoom: 8
      };
    }
  }


});

  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Locations.find().count() == 0){
      Locations.insert({
        Lat: 49, 
        Lon: -122.1
      });

      Locations.insert({
        Lat: 49, 
        Lon: -122.2
      });

      Locations.insert({
        Lat: 48, 
        Lon: -122.3
      });

      Locations.insert({
        Lat: 48, 
        Lon: -122.4
      });
    }

    // var url = "ftp://webftp.vancouver.ca/OpenData/json/drinking_fountains.json";
    // var results = HTTP.get(url,{},{});

    // var results = Assets.getText("results.json");

    // //console.dir(results);
    // var ejsonObj = EJSON.parse(results);
    // debugger;

    // var feature = console.dir(ejsonObj.features);
    // var geometry = feature.geometry;
    


  });

}



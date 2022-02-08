import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { config } from '../default';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  title = 'MapsApp';

  ngOnInit() {
    let loader = new Loader({
      apiKey: config.api
    });

    loader.load().then(() => {

      // Map Option
      var options = {
        center: {lat: 28.6129, lng:77.2295},
        zoom: 15
      };

      // New Map
      var map = new google.maps.Map(document.getElementById('map')!,options);

      // Add Marker
      function addMarker(location:any) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
      }

      var coords: string[] = [];

      // Listen for click on map location
      google.maps.event.addListener(map, "click", (event:any) => {
        addMarker(event.latLng);

        coords.push(event.latLng.toJSON());

        const bermudaTriangle = new google.maps.Polygon({
          paths: coords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });

        bermudaTriangle.setMap(map);
      })
    });
  }

}

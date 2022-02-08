import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";

import { MapsAPILoader , MouseEvent } from '@agm/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  public addressString : any

  @ViewChild('search',{static:true}) searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // const mapProperties = {
    //   center: new google.maps.LatLng(-25.363882,131.044922),
    //   zoom: 15,
    // };
    // this.map = new google.maps.Map(
    //   this.mapElement.nativeElement,
    //   mapProperties
    // );
    // const marker = new google.maps.Marker({
    //   // The below line is equivalent to writing:
    //   // position: new google.maps.LatLng(-34.397, 150.644)
    //   position: { lat: -25.363882, lng: 131.044922 },
    //   map: this.map,
    // });

    // marker.setMap(this.map);
    // this.addressString = `${this.data.addressLine1}, ${this.data.city}, ${this.data.state} ${this.data.zipCode}`
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    //   this.geoCoder.geocode({ 'address': this.addressString }, result => {
    //     console.log(result,"resulttttt");
    //     this.latitude = result[0].geometry.location.lat();
    //     this.longitude = result[0].geometry.location.lng();
    //     this.zoom = 50;
        
    //  })

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 18;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 18;
          this.addressString = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


}

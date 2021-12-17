import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {


  @Output() locationChange = new EventEmitter<[number, number]>();

  title:string = 'Interactive Map';

  constructor() { }

  ngOnInit(): void {
    this.initMap()
  }

  initMap() {

    //create new map with initial values
    const myLatlng = { lat: 29.67, lng: -95.25 };
    const map = new google.maps.Map(document.getElementById("map")!, {
      zoom: 4,
      center: myLatlng,
    });
  
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to view data for a new location.",
      position: myLatlng,
    });
    infoWindow.open(map);
  
    // Handle location change
    map.addListener("click", (mapsMouseEvent) => {

      // Close the current InfoWindow.
      infoWindow.close();
  
      // Create a new InfoWindow and display with new location
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });   
      infoWindow.setContent(
        `Showing rain and pollution data for 
        latitude: ${mapsMouseEvent.latLng.lat().toFixed(2)} and 
        longtitude: ${mapsMouseEvent.latLng.lng().toFixed(2)}.`
      );
      infoWindow.open(map);

      //share location change with parent
      this.locationChange.emit([mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng()])
    });
  }

}

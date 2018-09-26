import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import {FormControl} from '@angular/forms';
import { default as UserDetails } from '../../Resources/UserDetails';
import * as _ from 'lodash';
import { GoogleMapsAPIWrapper, InfoWindowManager, AgmInfoWindow, AgmMarker, MarkerManager, AgmMap, MapsAPILoader, LatLngLiteral } from '@agm/core';
import { AgmMarkerCluster, ClusterManager } from '@agm/js-marker-clusterer';
import {AppSettingsService} from '../../common/app-service.service'
import { Subscription } from 'rxjs';
export interface Coordinates {
  lat: number;
  lng: number;
  type: string;
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [GoogleMapsAPIWrapper,  InfoWindowManager, AgmInfoWindow, MarkerManager, AgmMarker, AgmMarkerCluster, ClusterManager]
})
export class MapComponent implements OnInit {

  coordinates: Coordinates[] = UserDetails;
  googleMapsAPIWrapper: GoogleMapsAPIWrapper;
  filterData:any;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  mapElement: HTMLElement;
  centreBounds: any = null;
  calculatedZoomLevel: number = 2;
  mapData: any;
  _clusterManager: ClusterManager;
  _infoWindowManager: InfoWindowManager;
  @ViewChild('infoWindowContent') infoWindowContent: ElementRef;
  observableSubscriptions: Subscription[] = [];
  constructor( googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private appSettingsService:AppSettingsService,    private ngZone: NgZone,private _elem: ElementRef ) {
      this.googleMapsAPIWrapper = googleMapsAPIWrapper;
      this.mapData = this.googleMapsAPIWrapper.getNativeMap();
      this._clusterManager = new ClusterManager(this.googleMapsAPIWrapper, this.ngZone);
      this._infoWindowManager = new InfoWindowManager(this.googleMapsAPIWrapper, this.ngZone, this._clusterManager);
  }

  ngOnInit() {
    this.mapElement = document.getElementById("map-container");
    this.createMap();
    this.appSettingsService.countryData.subscribe((res:any)=>{
      if(res)
        this.recenter(res);
      //  this.coordinates = this.coordinates.filter(x=>x.type == 1);
    });
  }
  
  createMap(){
    this.googleMapsAPIWrapper.createMap(this.mapElement, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false,
      
    }).then(()=>{
      this.createMarkers(this.coordinates);
      this.HandleMapEvents();
    });
  }
  private recenter(latlng:LatLngLiteral){
    this.googleMapsAPIWrapper.setCenter(latlng);
    this.googleMapsAPIWrapper.setZoom(4);
  }
  private createMarkers(coordinates: Coordinates[]) {
    for (var i = 0; i < coordinates.length; i++) {
        //Create Markers
        let agmMarker: AgmMarker = new AgmMarker(this._clusterManager);
        agmMarker.clickable = true;
        agmMarker.latitude = coordinates[i].lat;
        agmMarker.longitude = coordinates[i].lng;
        agmMarker.openInfoWindow = true;
        //Add markers to the cluster manager
        this._clusterManager.addMarker(agmMarker);
        // Create info window
            let agmInfoWindow = new AgmInfoWindow(this._infoWindowManager, this._elem);
            agmInfoWindow.hostMarker = agmMarker;
            agmInfoWindow.latitude = agmMarker.latitude;
            agmInfoWindow.longitude = agmMarker.longitude;
            agmInfoWindow.maxWidth = 300;
            agmInfoWindow.content = this.infoWindowContent.nativeElement;
            //Add info window to the info window manager
        this._infoWindowManager.addInfoWindow(agmInfoWindow);
        //Marker click event
        this._clusterManager.createEventObservable<void>('click', agmMarker).subscribe((agmMark: any) => {
            this.closeInfoWindow();
            this.filterData = this.coordinates.filter(x => x.lat == agmMarker.latitude && x.lng == agmMarker.longitude);
            this.mapData.lastOpen = agmInfoWindow;
            agmInfoWindow.open();
        });
        this.initCluster();
    }
   
}
private initCluster() {
  this._clusterManager.init({
      averageCenter: true,
      imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      maxZoom: 10
  });
}
private closeInfoWindow() {
  if (this.mapData.lastOpen)
      this.mapData.lastOpen.close();
}

private HandleMapEvents() {
  const s = this.googleMapsAPIWrapper.subscribeToMapEvent<void>('click').subscribe((map) => {
      this.closeInfoWindow();
  });
  const z = this.googleMapsAPIWrapper.subscribeToMapEvent<void>('zoom_changed').subscribe((map) => {
      this.closeInfoWindow();
  });
  this.observableSubscriptions.push(s);
  this.observableSubscriptions.push(z);
}
}

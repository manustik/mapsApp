import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  standalone: false,
  
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  public map? = Map;
  
  
  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement ) throw "Map Div nor found";
    if ( !this.lngLat ) throw "LngLat can't be null"

    const map = new Map({
      container: this.divMap?.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, 
      interactive: false,
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )
  }
  
}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  standalone: false,
  
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef

  ngAfterViewInit(): void {

    // console.log(this.divMap)
    if ( !this.divMap ) return;

    const map = new Map({
      container: this.divMap?.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-350.5, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });
  }

}

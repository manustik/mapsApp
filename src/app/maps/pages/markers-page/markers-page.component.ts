import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { json } from 'express';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  standalone: false,
  
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.180436887681992, 41.3802306048336);

  ngAfterViewInit(): void {
    if ( !this.divMap ) return;

    this.map = new Map({
      container: this.divMap?.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, 
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Manu Valle'

    // const marker = new Marker({
    //   element: markerHtml,
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );

  }

  createMarker() {
    if ( !this.map )  return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)); // Crea color aleatorio
    const lngLat = this.map?.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ){
    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

      this.markers.push({ color, marker });
      this.saveToLocalStorage();

      marker.on('dragend', () => {
        this.saveToLocalStorage();
      })
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    // console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers:PlainMarker[] = JSON.parse( plainMarkersString );
    // console.log(plainMarkersString)

    plainMarkers.forEach( ({ color, lngLat}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );
      
      this.addMarker(coords, color);
    })
  }

}


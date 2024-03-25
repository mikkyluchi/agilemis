import { Component, Input, OnInit } from '@angular/core';
// declare var L: any;
import * as L from 'leaflet';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mapData: any;
  mymap
  map: any;
  addLegend: any;
  shape: any;

  constructor(private crud: CrudService) { }

  ngOnInit(): void {
    this.getShape()
    this.initMap()
  }

  initMap() {

    this.map = L.map('map', {
      center: [8.6753, 9.0820],
      zoom: 6.3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 5,
    });

    this.mapData.forEach(e => {
      try {
        let popTable = `<div class='map-details'><div class='card'>
          <div class='card-header'>Project Summary</div>
          <div class='card-content'>
            <ul class='list-group'>
              <li class='list-group-item'>Title: ${e.title}</li>
              <li class='list-group-item'>Location: ${e.location}</li>
              <li class='list-group-item'>Longitude: ${e.longitude}</li>
              <li class='list-group-item'>Latitude: ${e.latitude}</li>
              <li class='list-group-item'><a href="/view-project/${e.id}"><em>more...</em></a></li>
            </ul>
          </div>
        </div></div>`
        new L.Marker([e?.latitude, e?.longitude], 1000).addTo(this.map)
          .bindPopup(popTable, { maxWidth: 520 })
      } catch (error) {
      }
    })


    tiles.addTo(this.map);
    this.addLegend
    // this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    // this.map.dragging.disable();
    // this.map.boxZoom.disable();
    // this.map.keyboard.disable();

    setTimeout(() => {
      this.setShape();
    }, 2000);
  }

  getShape() {
    this.crud.getInternalData('/assets/Boundary_VaccStates_Export.json').subscribe(res => this.shape = res)
  }

  setShape() {
    var shpfile = L.geoJSON(this.shape, {
      style: function (feature) {
        return {
          color: "green",
          weight: 2,
          fill: true,
          fillColor: "#00000",
          // opacity: 1,
          clickable: true
        };
      },
    });

    shpfile.addTo(this.map);
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Hospital } from '../../interfaces/hospital';
import leaflet from 'leaflet';
/**
 * Generated class for the HospitalDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-detail-modal',
  templateUrl: 'hospital-detail-modal.html',
})
export class HospitalDetailModalPage {
  @ViewChild('map') mapContainer: ElementRef;
  // map: any;
  map: leaflet.Map;
  center: leaflet.PointTuple;
  hospital: Hospital;


  constructor( 
              private navParams: NavParams, 
              private view: ViewController
              ) {
                this.hospital = this.navParams.get('hospital');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalDetailModalPage');
    console.log(this.navParams.get('hospital'));
    // this.hospital = this.navParams.get('hospital');
    console.log(this.hospital);
    this.center = [this.hospital.latitude,this.hospital.longitude];
    this.loadmap();
  }

  backList(){
    this.view.dismiss();
  }

  loadmap() {
    this.map = leaflet.map('map', {
      center: this.center,
      zoom: 16
    });

    var position = leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © ionic LeafLet',
      maxZoom: 15
    }).addTo(this.map);


    var marker = new leaflet.Marker(this.center);
    this.map.addLayer(marker);
 
    marker.bindPopup("<p>Tashi Delek.<p>Delhi</p>");
  }


  // this.map = leaflet.map("map").fitWorld();
  // leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //   maxZoom: 18
  // }).addTo(this.map);
  // this.map.locate({
  //   setView: true,
  //   maxZoom: 15,
  //   center: [-27.341013,-55.860095]
  // }).on('locationfound', (e) => {
  //   let markerGroup = leaflet.featureGroup();
  //   let marker: any = leaflet.marker([-27.341013,-55.860095]).on('click', () => {
  //     alert('Marker clicked');
  //   })
  //   markerGroup.addLayer(marker);
  //   this.map.addLayer(markerGroup);
  //   }).on('locationerror', (err) => {
  //     alert(err.message);
  // })
}

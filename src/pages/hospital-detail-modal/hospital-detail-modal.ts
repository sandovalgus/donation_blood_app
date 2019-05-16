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


 
}

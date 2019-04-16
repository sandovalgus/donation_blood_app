import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from "leaflet";
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../interfaces/hospital';

/**
 * Generated class for the HospitalMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-maps',
  templateUrl: 'hospital-maps.html',
})
export class HospitalMapsPage {

  propertyList = [];
  center: L.PointTuple;
  map;
  hospitals: Hospital[];

  constructor(
                public navCtrl: NavController, 
                public hospitalService: HospitalService,
                public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.preparateMap();
    this.hospitalService.getHospitals().subscribe(res =>{
      this.hospitals= res;
      console.log(this.hospitals);
      this.leafletMap();
    },
    (err) => {console.log(err)})
  
  }

  preparateMap(){
    this.map = L.map('map').setView([-27.341013,-55.860095], 16);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  leafletMap(){
    console.log("property" + this.hospitals);
    for (let property of this.hospitals) {
      console.log(property);
      L.marker([property.latitude, property.longitude]).addTo(this.map)
      .bindPopup(property.name)
      .openPopup();
    }
  }

}
  



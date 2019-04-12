import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Hospital } from '../../interfaces/hospital';

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

  hospital: Hospital;
  constructor( 
              private navParams: NavParams, 
              private view: ViewController
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalDetailModalPage');
    console.log(this.navParams.get('hospital'));
    this.hospital = this.navParams.get('hospital');
    console.log(this.hospital);
  }

  closeModal(){
    this.view.dismiss();
  }

}

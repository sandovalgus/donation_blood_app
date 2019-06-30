import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HospitalListsPage } from '../hospital-lists/hospital-lists';
import { HospitalMapsPage } from '../hospital-maps/hospital-maps';

/**
 * Generated class for the HospitalTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-tabs',
  templateUrl: 'hospital-tabs.html'
})
export class HospitalTabsPage {

  hospitalListsRoot = HospitalListsPage
  hospitalMapsRoot = HospitalMapsPage


  constructor(public navCtrl: NavController) {}

}

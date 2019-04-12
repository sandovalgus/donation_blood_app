import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  hospitalListsRoot = 'HospitalListsPage'
  hospitalMapsRoot = 'HospitalMapsPage'


  constructor(public navCtrl: NavController) {}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
filter:any ={
  "blood": 'all',
  "hospital": 'all',
};
hospitals:any[];

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public hospitalService: HospitalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
      this.hospitalService.getHospitals().subscribe({
        next: hospital=>{

          this.hospitals = hospital;
          console.log(this.hospitals);

        },
        error: err=>{
          console.log(err);

        }
    });

  }

  searchCampaign(){
    let data = this.filter;
    console.log(data);
    if(data.hospital != 'all'){

      data.hospital = this.filter.hospital.id;
    }
    console.log(data);
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
  }


}

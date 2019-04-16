import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, LoadingController} from 'ionic-angular';

import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../interfaces/hospital';
import { Observable } from 'rxjs';
import { HospitalDetailModalPage } from '../hospital-detail-modal/hospital-detail-modal';


@IonicPage()
@Component({
  selector: 'page-hospital-lists',
  templateUrl: 'hospital-lists.html',
})
export class HospitalListsPage   {

  hospitals: Hospital[];
  loader:any;
 
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public hospitalService: HospitalService,
              public modalController: ModalController,
              public loadingCtrl: LoadingController) {

                
                
              }
              ionViewWillEnter() {
                this.presentLoading();
                // this.hospitalService.getHospitals().subscribe(res =>{
                //   this.hospitals= res;
                //   console.log(this.hospitals);
                //   this.loader.dismiss();
                 
                // })


                this.hospitalService.getHospitals().subscribe({
                  next: value=>{
                    this.hospitals = value;
                    this.loader.dismiss();
                  },
                  error: err=>{
                    console.log(err);
                    this.loader.dismiss();
                  }
               })
              
            }

              // ionViewDidLoad() {
              // }
            
    
            
              openModalHospital(hospital){
                // const modalHospital = this.modalController.create('HospitalDetailModalPage', {hospital: hospital});
                // modalHospital.present();
                this.navCtrl.push(HospitalDetailModalPage,  {hospital: hospital});
              }

              presentLoading() {
                this.loader = this.loadingCtrl.create({
                 content: "Cargando..."
               });
               this.loader.present();
              }
             

}

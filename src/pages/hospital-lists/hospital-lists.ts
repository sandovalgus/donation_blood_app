import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from '../../interfaces/hospital';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
/**
 * Generated class for the HospitalListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospital-lists',
  templateUrl: 'hospital-lists.html',
})
export class HospitalListsPage {

  hospitals: Hospital[];
 
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public hospitalService: HospitalService,
              public modalController: ModalController) {

                
              }


              ionViewDidLoad() {
                console.log('ionViewDidLoad HospitalListsPage');
              }
            
              ngOnInit() {
                  this.hospitalService.getHospitals().subscribe(res =>{
                    this.hospitals= res;
                    console.log(this.hospitals);
                  });
              }
            
              openModalHospital(hospital){
                const modalHospital = this.modalController.create('HospitalDetailModalPage', {hospital: hospital});
                modalHospital.present();
              }

}

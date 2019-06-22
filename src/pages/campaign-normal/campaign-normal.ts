import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, DateTime } from 'ionic-angular';
import leaflet from 'leaflet';

import { CampaignService } from '../../services/campaign.service';
import { HospitalService } from '../../services/hospital.service';
import {DonationProcessService} from '../../services/donation-process.service';

import { DonationProcess } from '../../interfaces/donationProcess';
import { Campaign } from '../../interfaces/campaign';
import { Hospital } from '../../interfaces/hospital';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LocalstorageService } from '../../services/localstorage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@IonicPage()
@Component({
  selector: 'page-campaign-normal',
  templateUrl: 'campaign-normal.html',
})
export class CampaignNormalPage {
  @ViewChild('map') mapContainer: ElementRef;
campana_id:string;
campana:Campaign;
map: leaflet.Map;
center: leaflet.PointTuple;
hospital: Hospital;
user: any;
loader:any;
statusPage:boolean = false;
donation: DonationProcess;
  donationLast: DonationProcess ;
isValid:boolean= false;
authSubscription: Subscription;
hospitalSubscription: Subscription;
donationSubscription: Subscription;
campaignSubscription: Subscription;
msg:string= '';

constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public hospitalService: HospitalService,
  public loadingCtrl: LoadingController,
  public campaignService: CampaignService,
  public donationServ:DonationProcessService,
  public authService: AuthService,
  public toastCtrl: ToastController,
  public storage:LocalstorageService

  ) {
    console.log('view campaign normal');
    }

  loadmap() {
    if(this.map) {
      this.map.remove();
    }
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

  ionViewDidEnter() {
    this.presentLoading();
    this.statusPage= false;
    this.campana_id = this.navParams.get('campaign_id');

    console.log(this.campana_id);
    this.campaignSubscription= this.campaignService.getCampaign(this.campana_id).subscribe(camp =>{

                    this.campana = camp;
                    if (this.campana){

                    this.hospitalSubscription =  this.hospitalService.getHospital(this.campana.hospital_fk).subscribe(resp =>{
                        this.hospital = resp;
                        this.center = [this.hospital.latitude,this.hospital.longitude];
                        this.statusPage = true;
                        this.loadmap();
                        this.loader.dismiss();
                       });
                       this.storage.getStorageUid().then((uid)=>{
                        //   si uid es vacio, no debe consultar, y la opcion de DONAR debe estar desabilitado
                         //  uid get
                         console.log('el uid recuperado de localstorage es ', uid);
                        //  recupero su ultima donacion si e sque tiene
                        if(uid != ''){
                          this.donationSubscription =  this.donationServ.donationProcessWhereUserId(uid).subscribe((donationsStatus)=>{
                              console.log('donation status');
                              console.log(donationsStatus.length);
                              if(donationsStatus.length == 0){
                                  this.isValid = true;
                              }else{
                                console.log('else');
                                console.log(donationsStatus);
                                this.verifyValidDonation(donationsStatus[0].check, donationsStatus[0].date);

                              }
                          })

                        }else{
                          //  debe loguearse
                          this.msg= 'Por favor inicie sesión para donar' ;
                          this.isValid = false;
                        }

                       })
                       .catch((error)=>{
                         console.log('error recuperando uid localstorage', error);
                      });


                     }
     })

  }
//
  verifyValidDonation(check:boolean, date){
      if(check){

        let a = new Date(date.seconds * 1000);
        let year = a.getFullYear();
        let month = a.getMonth()+1; //getMonth devuelve el mes empezando por 0
        let day = a.getDate(); //getMonth devuelve el mes empezando por 0
        console.log('Fecha de su ultima donacion transformada ', year +'/'+ month +'/'+ day);
        let firebaseData = year +'/'+ month +'/'+ day;
        let today = new Date();
        let year1 = today.getFullYear();
        let month1 = today.getMonth()+1; //getMonth devuelve el mes empezando por 0
        let day1 = today.getDate(); //getMonth devuelve el mes empezando por 0
        let diaActual =  year1 +'/'+ month1 +'/'+ day1;

        console.log('Fecha actual ', year1 +'/'+ month1 +'/'+ day1);
        let fecha1 = new Date(firebaseData);
        let fecha2 =  new Date(diaActual);

        let diferencia =  fecha2.getTime() - fecha1.getTime();
        console.log(Math.round(diferencia/ (1000*60*60*24)))
        let diferenciaReal =Math.round(diferencia/ (1000*60*60*24));
        if (diferenciaReal >=90){
        // puede donar
        this.isValid = true;
        }else{
          // no puede donar por que aun no paso el tiempo necesario
          console.log('no puede donar por que aun no paso el tiempo necesario');
          this.msg= 'Aun debe esperar '+ (90 - diferenciaReal) + ' dias para volver a donar.' ;
          this.isValid = false;
        }

      }else{
        //  tiene una donacion pendiente, debe donar o cancelarla
        this.isValid = false;
        this.msg ='Tiene una donacion pendiente, debe ir a donar o cancelarla.';
        console.log('tiene una donacion pendiente, debe donar o cancelarla');
      }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
     content: "Cargando..."
   });
   this.loader.present();
 }

 actionDonar(){
   this.donation = {
     'user_id':'',
     'campaign_id': this.campana_id,
     'check': false,
     'date': new Date(),
   };
   this.authSubscription = this.authService.getStatus().subscribe(data =>{
     this.donation.user_id = data.uid;
     console.log('info donacion');
     console.log(this.donation);
     this.donationServ.addDonationProcess(this.donation).then((success)=>{
       console.log(success);
       this.toastAlerts('Su intención de donar a '+ this.campana.patient + ' ha sido creado.');
      },
      (error)=>{
        console.log('error ' + error);
      })
   })
 }

 toastAlerts(message){
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

  ngOnDestroy() {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
    if(this.donationSubscription){
      this.donationSubscription.unsubscribe();
    }
    if(this.hospitalSubscription){
      this.hospitalSubscription.unsubscribe();
    }
    if(this.campaignSubscription){
      this.campaignSubscription.unsubscribe();
    }
  }
}

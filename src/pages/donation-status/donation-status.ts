import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Hospital } from '../../interfaces/hospital';
import leaflet from 'leaflet';

import { CampaignService } from '../../services/campaign.service';
import { HospitalService } from '../../services/hospital.service';
import { DonationProcessService } from '../../services/donation-process.service';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalstorageService } from '../../services/localstorage.service';
import { Subscription } from 'rxjs';
@IonicPage()
@Component({
  selector: 'page-donation-status',
  templateUrl: 'donation-status.html',
})
export class DonationStatusPage {
  @ViewChild('map') mapContainer: ElementRef;
dataDonation:any;
donationProcess_id:any;
L: leaflet;
map: leaflet.Map;
center: leaflet.PointTuple;
hospital: Hospital;
loader:any;
myPosition: any= {
    'latitude':'',
    'longitude':'',
  };
  diagnosticoGPS: boolean= false;
  msg:string= '';
  isValid:boolean= false;
  donationSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public hospitalService: HospitalService,
    public loadingCtrl: LoadingController,
    public campaignService: CampaignService,
    public donationServ:DonationProcessService,
    public toastCtrl: ToastController,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public storage:LocalstorageService) {
  }

  ionViewDidLoad() {
    this.presentLoading();
    this.dataDonation =  this.navParams.get('dataDonation');
    this.donationProcess_id =  this.navParams.get('donationProcess_id');
    this.hospitalService.getHospital(this.dataDonation.campaign.hospital_fk).subscribe(resp =>{
      this.hospital = resp;
      this.center = [this.hospital.latitude,this.hospital.longitude];
      this.loadmap();
      this.loader.dismiss();
      // ---
      this.storage.getStorageUid().then((uid)=>{
        if(uid != ''){

          this.donationSubscription =  this.donationServ.getDonationProcess(this.donationProcess_id).subscribe((donationsStatus)=>{
              console.log('donation status');
              console.log(donationsStatus);
              if(donationsStatus.check){
                // ya dono
                this.isValid = true;
                this.msg= 'Donación ya realizada';
              }else{
                // aun no dono
                this.msg= 'Donación pendiente';
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
      // ---

     });
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


verifyDonation(){
this.diagnosticgps();

  if(this.diagnosticoGPS){
    //  GPS ACTIVADO
      this.geolocation.getCurrentPosition().then((data) => {
          // posicion actal
          const distance = this.calculateDistantePoints(data.coords.longitude, this.hospital.longitude, data.coords.latitude , this.hospital.latitude);
          // console.log(' Distancia es ...'+ this.calculateDistantePoints(data.coords.longitude, this.hospital.longitude, data.coords.latitude , this.hospital.latitude));
          if (parseFloat(distance) <= 100){
            // esta en el rango del hospital, validar donacion
            this.updateStatusDonation();

          }else{
            // no esta en el rango del hospital
            let msg ='Debe estar a menos de 100 metros de distancia del Centro de Salud para validar la donacion';
            this.showAlert(msg);
          }
      }).catch((error) => {
        console.log('Error getting location', error);
      });

    }else{
      let msg ='Por favor active su GPS para verificar que se encuentra en el Centro de Salud.';
      this.showAlert(msg);
  }


}

calculateDistantePoints(lon1, lon2, lat1, lat2){
  // var R = 6371; // Radius of the earth in km
  var R = 6371e3; // Radius of the earth in metres
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d.toFixed(2);
}

diagnosticgps(){
  this.diagnostic.isGpsLocationEnabled().then((status)=>{
    console.log(status);
    this.diagnosticoGPS= status;
  }).catch(e =>{
    console.log(e);
  })
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}

updateStatusDonation(){
  this.dataDonation.donationProcess.check = true;
  this.donationServ.updateDonation(this.dataDonation.donationProcess,this.donationProcess_id ).then((success)=>{
    this.dataDonation.campaign.donor_received +=1;
    this.campaignService.updateCampaign(this.dataDonation.campaign, this.dataDonation.donationProcess.campaign_id ).then((success =>{
      //  donacion verificada
      this.toastAlerts('Felicidades, donacion verificada !');
    }))
    .catch((e)=>{ console.log(e);})
  })
  .catch(e => {console.log(e);})
}


showAlert(message) {
  const alert = this.alertCtrl.create({
    title: 'Atención',
    subTitle: message,
    buttons: ['OK']
  });
  alert.present();
}

presentLoading() {
  this.loader = this.loadingCtrl.create({
   content: "Cargando..."
 });
 this.loader.present();
}

toastAlerts(message){
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

deleteProcessDonation(){
  this.donationServ.deleteDonationProcess(this.donationProcess_id).then(success=>{
    console.log(success);
    this.navCtrl.pop();
  }).catch(err => {
    console.log(err);
  });
}

alertMensage() {
  const confirm = this.alertCtrl.create({
    title: '¿Está seguro que no desea donar?',
    message: 'Si no desea donar presione Aceptar.',
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: () => {
          console.log('Agree clicked');
          this.deleteProcessDonation();
        }
      }
    ]
  });
  confirm.present();
}

}

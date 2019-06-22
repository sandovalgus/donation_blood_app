import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Hospital } from '../../interfaces/hospital';
import leaflet from 'leaflet';
import { HospitalService } from '../../services/hospital.service';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';


@IonicPage()
@Component({
  selector: 'page-campaign-detail',
  templateUrl: 'campaign-detail.html',
})
export class CampaignDetailPage {
  @ViewChild('map') mapContainer: ElementRef;
campana_id:string;
campana:Campaign;
map: leaflet.Map;
center: leaflet.PointTuple;
hospital: Hospital;
user: any;
loader:any;
statusPage:boolean = false;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public hospitalService: HospitalService,
              public loadingCtrl: LoadingController,
              public campaignService: CampaignService

              ) {  }

  ionViewDidLoad() {

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

  goEditCampaign(){
    this.navCtrl.push('CampaignNewPage',
      {
        campaign: this.campana,
        status: 'editing',
      }
        );
  }

  ionViewDidEnter() {
    this.presentLoading();

    this.statusPage= false;
    // console.log('1 - Toc, Toc!!! ¿Puedo pasar? Se lanza antes de que la vista pueda entrar.');
    this.campana_id = this.navParams.get('campaign_id');

    console.log(this.campana_id);
     this.campaignService.getCampaign(this.campana_id).subscribe(camp =>{

                    this.campana = camp;
                    if (this.campana){

                      this.hospitalService.getHospital(this.campana.hospital_fk).subscribe(resp =>{
                        this.hospital = resp;
                        this.center = [this.hospital.latitude,this.hospital.longitude];
                        this.statusPage = true;
                        this.loadmap();
                        this.loader.dismiss();
                       });
                     }
     })

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
     content: "Cargando..."
   });
   this.loader.present();
 }

 goToListCampaign(){
console.log('Back list');
  this.navCtrl.setRoot("CampaignsListMyPage");
 }



}

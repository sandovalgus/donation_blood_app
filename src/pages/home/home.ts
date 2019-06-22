import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform , ModalController} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
// import { HospitalService } from '../../services/hospital.service';
import { AuthService } from '../../services/auth.service';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { UserService } from '../../services/user.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FilterPage } from '../filter/filter';
import { CampaignNormalPage } from '../campaign-normal/campaign-normal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  campaigns: Campaign[];
  loader:any;
  user: any;
  limit:number=5;
  filter={
    "blood": 'all',
    "hospital": 'all'
  };



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public campaignService: CampaignService,
    public authService: AuthService,
    public userService: UserService,
    private socialSharing: SocialSharing,
    public platform: Platform,
    public modalCtrl: ModalController) {



  }

  ngOnInit(){
    // this.campaignService.startAt.asObservable();
    // this.campaignService.endAt.asObservable();
  }

  goProfile(){
    console.log('go profile ...');
    this.navCtrl.push(ProfilePage);
    }


    ionViewDidLoad() {
        this.loadAllCampaigns();

    }

    loadAllCampaigns(){
      this.campaignService.getCampaignsLimits(this.limit).subscribe({
        next: value=>{
          this.campaigns= value;
        },
        error: err=>{
          console.log(err);
        }
      })
    }


  share(data){
    console.log('share');
    let message:string='Se necesita donantes de sangre ';
    message = message.concat(data.bloode_type);
    message = message.concat(' para *');
    message = message.concat(data.patient);
    message = message.concat('*. En el Hospital ');
    message = message.concat(data.hospital_name);
    message = message.concat('.');


    this.platform.ready().then(() => {

        this.socialSharing.share(message)
        .then(()=>{

        }).catch(()=>{

        })

    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.campaignService.getCampaignsLimits(this.limit+5).subscribe({
        next: value=>{
          this.campaigns= value;
        },
        error: err=>{
          console.log(err);
        }
      })
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  goViewFilter() {
    let profileModal = this.modalCtrl.create(FilterPage);
    profileModal.onDidDismiss(data => {
      console.log(data);

        this.campaignService.filterSearchCampaign(data.blood, data.hospital).subscribe(result =>{
          console.log(result);
          this.campaigns = result;
        })


    });
    profileModal.present();
  }

  cleanFilter(){
        this.limit=5;
        this.loadAllCampaigns();
  }

  goCampaignDetails(id){
    console.log('ID ----- ', id);
    this.navCtrl.push(CampaignNormalPage, {campaign_id: id});
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { AuthService } from '../../services/auth.service';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { UserService } from '../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-campaigns-list-my',
  templateUrl: 'campaigns-list-my.html',
})
export class CampaignsListMyPage {

  campaigns: Campaign[];
  loader:any;
  user: any;


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public campaignService: CampaignService,
              public authService: AuthService,
              public userService: UserService
              ) {
  }

  ionViewDidLoad() {
    this.authService.getStatus().subscribe(data =>{
      console.log('authService uid');
      console.log(data.uid);
          this.campaignService.campaignWhereId(data.uid).subscribe({
            next: value=>{
              this.campaigns = value;
              console.log('Mis campanas ?');
              console.log(this.campaigns);
              // this.loader.dismiss();
            },
            error: err=>{
              console.log(err);
              // this.loader.dismiss();
            }
         })

    });

  }

  goCampaignDetails(id){
    console.log('ID ----- ', id);
    this.navCtrl.push('CampaignDetailPage', {campaign_id: id});
  }


  newCampaign(){
    this.navCtrl.push('CampaignNewPage',
    {
      status: 'creating',
    }
      );
  }

}

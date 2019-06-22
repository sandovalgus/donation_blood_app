import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { ProfileEditPage } from '../profile-edit/profile-edit';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DonationProcessService } from '../../services/donation-process.service';
import { Subscription } from 'rxjs';
import { DonationStatusPage } from '../donation-status/donation-status';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  loader:any;
  donationMy : any[];
  clientesSubscription: Subscription;
  authSubscription: Subscription;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public donationServ:DonationProcessService,) {

}


ionViewDidLoad() {

  this.presentLoading();
  this.authSubscription = this.authService.getStatus().subscribe(data =>{
    this.userService.getuser(data.uid).subscribe(resp =>{
      this.user = resp;
      console.log(this.user);
      this.getsDonations();
      this.loader.dismiss();
    })

  });

}

presentLoading() {
   this.loader = this.loadingCtrl.create({
    content: "Cargando..."
  });
  this.loader.present();
}

editProfile(){
  this.navCtrl.push(ProfileEditPage, {
    user: this.user
  });
}

getsDonations(){
  this.clientesSubscription= this.donationServ.getsMyDonations(this.user.id).subscribe(result =>{
      console.log(result);
      this.donationMy = result;
    })
  }

  ngOnDestroy() {
    if(this.clientesSubscription){
      this.clientesSubscription.unsubscribe();
    }
    this.authSubscription.unsubscribe();

  }

  goToDonationVerify(donationData){
    this.navCtrl.push(DonationStatusPage, {
      dataDonation: donationData,
      donationProcess_id: donationData.donationProcess_id,
    });
  }
}

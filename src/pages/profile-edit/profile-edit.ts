import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';



@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  useredit: User;
  loader:any;


    constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public userService: UserService,
                public loadingCtrl: LoadingController) {
    }

    ionViewWillLoad(){
      this.useredit =  this.navParams.get('user');
      console.log(this.useredit);
    }

    updateUser(){
      console.log(this.useredit);
      this.presentLoading();
      this.userService.updateUser(this.useredit).then((success)=>{
        this.loader.dismiss();
        this.navCtrl.pop();

      })
      .catch((error)=>{
        console.log(error);
        this.loader.dismiss();

      })
    }

    presentLoading() {
      this.loader = this.loadingCtrl.create({
       content: "Guardando..."
     });
     this.loader.present();
   }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ProfileEditPage } from '../profile-edit/profile-edit';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  loader:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController) {

}


ionViewDidLoad() {
  this.presentLoading();
  console.log('ionViewDidLoad ProfilePage');
  this.authService.getStatus().subscribe(data =>{
    console.log(data.uid);

    this.userService.getuser(data.uid).subscribe(resp =>{
      this.user = resp;
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

}

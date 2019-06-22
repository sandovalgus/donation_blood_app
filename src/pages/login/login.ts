import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {User} from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HomePage } from '../home/home';

import { LocalstorageService } from '../../services/localstorage.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: string;
  password2: string;
  email: string;
  nick:string;
  operation: string = 'login';

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public authService:AuthService,
                public userService: UserService,
                private toastCtrl: ToastController,
                public storage:LocalstorageService) {

                }

 loginWithEmail(){
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if ( emailRegex.test(this.email)){
        this.authService.loginWithEmail(this.email, this.password).then((result)=>{
          console.log('login ...');
          console.log(result);
          this.authService.getStatus().subscribe(data =>{
            console.log('get status ..');
            console.log(data.uid);
            this.storage.setStorageUid(data.uid);

          });
          this.navCtrl.setRoot(HomePage);

        }).catch((error)=>{
          console.log(error);
          let message = error.message;
          this.toastAlerts(message);
        });

    }else {
      this.toastAlerts('El formato del email ingresado es invalido.');
    }


  }

  registerWithEmail(){
    if(this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.signInWithEmail(this.email, this.password).then((result)=>{
      console.log(result);
      const user: User = {
        nick: this.nick,
        email: this.email,
        id: result.user.uid,
        active: true
      };
      this.userService.addUser(user).then((data)=>{
        let toast = this.toastCtrl.create({
          message: 'Usuario registrado con éxito',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.operation = 'login';
          console.log(data);
        }).catch((error)=>{
          console.log(error);
        });
    }).catch((error)=>{
      console.log(error);
    });

  }

  toastAlerts(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}

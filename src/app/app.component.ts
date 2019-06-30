import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Events, Nav, Platform } from 'ionic-angular';
import { CampaignsListMyPage } from '../pages/campaigns-list-my/campaigns-list-my';
import { HomePage } from '../pages/home/home';
import { HospitalTabsPage } from '../pages/hospital-tabs/hospital-tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
// import { Storage } from '@ionic/storage';
import { LocalstorageService } from '../services/localstorage.service';

import { FCM, NotificationData } from '@ionic-native/fcm';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { NotificationsService } from '../services/notifications.service';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  statusLougOut:boolean=false;
  pages: Array<{title: string, component: any}>;
  showSplash = true; // <-- show animation
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events:Events,
    public storage:LocalstorageService,
    private fcm:FCM,
    public localNotifications:LocalNotifications,
    public notifications: NotificationsService) {

    this.initializeApp();


    // used for an example of ngFor and navigation
    this.storage.getStorageUid().then((uid)=>{
      if(uid ==''){
        this.statusLougOut= false;
        this.pages = [
          { title: 'Inicio', component: HomePage },
          { title: 'Hospitales', component: HospitalTabsPage },
          { title: 'Login', component: LoginPage }
          ];
        }else{
          this.statusLougOut= true;
          this.pages = [
            { title: 'Inicio', component: HomePage },
            { title: 'Profile', component: ProfilePage },
            { title: 'Hospitales', component: HospitalTabsPage },
            { title: 'Mis Campañas', component: CampaignsListMyPage}
               ];

        }
    } )
    .catch((error)=>{
      console.log('error recuperando uid localstorage', error);
   });



    events.subscribe('user:loggedin',()=>{
      this.statusLougOut= true;
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Profile', component: ProfilePage },
        { title: 'Hospitales', component: HospitalTabsPage },
        { title: 'Mis Campañas', component: CampaignsListMyPage}
      ];
    });

      events.subscribe('user:loggedout',()=>{
        this.statusLougOut= false;
      this.pages = [
        { title: 'Inicio', component: HomePage },
        { title: 'Hospitales', component: HospitalTabsPage },
        { title: 'Login', component: LoginPage }
                    ];
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleLightContent(); //ok
      // this.statusBar.overlaysWebView(false); //ok
      // this.statusBar.overlaysWebView(true);

      this.splashScreen.hide();

      // begin notifications
      if (this.platform.is('cordova') || this.platform.is('android')) {
        // This will only print when on iOS
        console.log('I am an iOS device!');



        this.fcm.getToken().then((token: string)=>{
        console.log('token device', token);
        this.notifications.saveToken(token).then(succes =>{
          console.log('save token firestore ');})
          .catch(e =>{console.log(e);});

        }).catch(error =>{
          console.log(error);
        });

      this.fcm.onTokenRefresh().subscribe((token:string)=>{
        console.log('Token device refresh', token);
      });
      this.fcm.onNotification().subscribe((data)=>{
        if(data.wasTapped){
          // app segun plano
          console.log('estamos en segundo plano '+ JSON.stringify(data));

        }else{
          //  app en primer plano
            console.log('estamos en primer plano '+ JSON.stringify(data));
            this.localNotifications.schedule({
              id: Math.floor((Math.random() * 100) +1 ),
              title: "Nueva Campaña !",
              text: "Donar Sangre es donar vida",
              data:{
                nombre: "pepe",
                apellido: "telo"
              }
            });
          }
        }, error =>{
          console.log(error);
        });

        this.localNotifications.on("click").subscribe(resultado =>{
          console.log(resultado);
        });

      }
        //  fin notificaciones

    });
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }
  logOut(){
    console.log('LOg out ... ');
    this.storage.removeStorageUid();
    this.events.publish('user:loggedout');
  }
}

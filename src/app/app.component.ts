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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  statusLougOut:boolean=false;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events:Events,
    public storage:LocalstorageService) {
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

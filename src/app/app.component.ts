import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { HospitalTabsPage } from '../pages/hospital-tabs/hospital-tabs';
import { CampaignNewPage } from '../pages/campaign-new/campaign-new';
import { CampaignsListMyPage } from '../pages/campaigns-list-my/campaigns-list-my';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Hospitales', component: HospitalTabsPage },
      { title: 'Mis Campañas', component: CampaignsListMyPage}
    ];

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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

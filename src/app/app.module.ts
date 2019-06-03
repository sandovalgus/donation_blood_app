import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// firebase

import { firebaseConfig } from '../firebaseConfig';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// forms
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

// pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { HospitalTabsPage } from '../pages/hospital-tabs/hospital-tabs';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { HospitalDetailModalPage } from '../pages/hospital-detail-modal/hospital-detail-modal';
import { CampaignNewPage } from '../pages/campaign-new/campaign-new';
import { CampaignsListMyPage } from '../pages/campaigns-list-my/campaigns-list-my';
import { FilterPage } from '../pages/filter/filter';

// modules

import { CampaignNewPageModule } from '../pages/campaign-new/campaign-new.module';
import { CampaignsListMyPageModule } from '../pages/campaigns-list-my/campaigns-list-my.module';
// servicios
import { CampaignService } from '../services/campaign.service';
import { AuthService } from '../services/auth.service';
import { HospitalService } from '../services/hospital.service';
import { UserService } from '../services/user.service';


import { SocialSharing } from '@ionic-native/social-sharing';
import { FilterPageModule } from '../pages/filter/filter.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    ProfileEditPage,
    HospitalTabsPage,
    HospitalDetailModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignNewPageModule,
    CampaignsListMyPageModule,
    FilterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    ProfileEditPage,
    HospitalTabsPage,
    HospitalDetailModalPage,
    CampaignNewPage,
    CampaignsListMyPage,
    FilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    HospitalService,
    CampaignService,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

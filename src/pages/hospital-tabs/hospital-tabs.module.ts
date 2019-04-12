import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalTabsPage } from './hospital-tabs';

@NgModule({
  declarations: [
    HospitalTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalTabsPage),
  ]
})
export class HospitalTabsPageModule {}

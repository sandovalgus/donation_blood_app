import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalDetailModalPage } from './hospital-detail-modal';

@NgModule({
  declarations: [
    HospitalDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalDetailModalPage),
  ],
})
export class HospitalDetailModalPageModule {}

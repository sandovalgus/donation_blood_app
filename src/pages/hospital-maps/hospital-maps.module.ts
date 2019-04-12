import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalMapsPage } from './hospital-maps';

@NgModule({
  declarations: [
    HospitalMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalMapsPage),
  ],
})
export class HospitalMapsPageModule {}

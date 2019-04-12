import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalListsPage } from './hospital-lists';

@NgModule({
  declarations: [
    HospitalListsPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalListsPage),
  ],
})
export class HospitalListsPageModule {}

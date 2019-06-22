import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationStatusPage } from './donation-status';

@NgModule({
  declarations: [
    DonationStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationStatusPage),
  ],
})
export class DonationStatusPageModule {}

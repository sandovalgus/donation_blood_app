import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignsListMyPage } from './campaigns-list-my';

@NgModule({
  declarations: [
    CampaignsListMyPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignsListMyPage),
  ],
})
export class CampaignsListMyPageModule {}

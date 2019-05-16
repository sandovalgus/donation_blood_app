import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignDetailPage } from './campaign-detail';

@NgModule({
  declarations: [
    CampaignDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignDetailPage),
  ],
})
export class CampaignDetailPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignNormalPage } from './campaign-normal';

@NgModule({
  declarations: [
    CampaignNormalPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignNormalPage),
  ],
})
export class CampaignNormalPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignNewPage } from './campaign-new';

@NgModule({
  declarations: [
    CampaignNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignNewPage),
  ],
})
export class CampaignNewPageModule {}

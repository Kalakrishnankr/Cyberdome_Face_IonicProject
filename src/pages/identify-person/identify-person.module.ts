import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentifyPersonPage } from './identify-person';

@NgModule({
  declarations: [
    IdentifyPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentifyPersonPage),
  ],
})
export class IdentifyPersonPageModule {}

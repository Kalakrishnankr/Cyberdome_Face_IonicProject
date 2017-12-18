import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDetailsPage } from './upload-details';

@NgModule({
  declarations: [
    UploadDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadDetailsPage),
  ],
})
export class UploadDetailsPageModule {}

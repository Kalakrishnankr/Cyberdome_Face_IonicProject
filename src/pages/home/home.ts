import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UploadDetailsPage } from '../upload-details/upload-details';
import { IdentifyPersonPage } from '../identify-person/identify-person';
import { ReadPage } from '../read/read';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
identify(){
	this.navCtrl.push(IdentifyPersonPage);
}

upload(){
	this.navCtrl.push(UploadDetailsPage);
}
read(){
	this.navCtrl.push(ReadPage);
}


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the PersonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person-details',
  templateUrl: 'person-details.html',
})
export class PersonDetailsPage {

	value :any;
	cat :any;
	pList = [];

	personData:any;
	personDetail : any;
	userDataList = {     
          user_age: '', 
          user_address :'',
          user_crime_details:'', 
          user_identify:''
        };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.personData=navParams.get("pData");
  	console.log(this.personData);
  	this.personDetail=this.personData.userData;
  	console.log(this.personDetail);
  	/*this.personDetail.map(personDetail => {
  		let [age, address, crimeDetails, personalIdentity] = personDetail.split(':');
  		return { age ,address,crimeDetails,personalIdentity };
  		//console.log(age,address,crimeDetails,personalIdentity);
  	});*/
  	this.value= this.personDetail.split(",");
  	console.log(this.value);
  	for (let i = 0; i < this.value.length; i++) {
  		this.pList.push(this.value[i].split(":")[1]);
  		console.log(this.pList);
  	}
  	  	console.log(this.pList);
  	

  }
  	//console.log(data);


}

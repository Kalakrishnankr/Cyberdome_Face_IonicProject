import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera'
import { AuthService } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { PersonDetailsPage } from '../person-details/person-details';


//import { PersonDetailsPage } from '../pages/person-details/person-details';

/**
 * Generated class for the IdentifyPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identify-person',
  templateUrl: 'identify-person.html',
})
export class IdentifyPersonPage {
	 public personList: any=[];



	byteArray:any;
		blob:Blob;
		public base64Image: string;
		public binaryImage: any;
    public faceId: any;
		public faceIds: any;
		public faceData: any;
		public personId: any;
		public personData:any;
		public personDataStatus: any;
    public imageSrc:any;

    public details: any = {};
    public jsonArray: any = [];
    user_snap_taken=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public camera: Camera, private auth : AuthService,public loadingCtrl:LoadingController ) {
  }

  b64toBlob(b64Data, contentType, sliceSize){
  	contentType = contentType || '';
  	sliceSize = sliceSize || 512;
  	var byteCharacters = atob(b64Data);
  	var byteArrays = [];

  	for(var offset = 0;offset<byteCharacters.length;offset += sliceSize){
  		var slice = byteCharacters.slice(offset,offset + sliceSize);

  		var byteNumbers= new Array(slice.length);
  		for (var i = 0;i<slice.length;i++) {
  			byteNumbers[i]=slice.charCodeAt(i);
  		}
  		var byteArray = new Uint8Array(byteNumbers);
  		byteArrays.push(byteArray);
  	}
  	var blob = new Blob(byteArrays,{
  		type:contentType
  	});
  	return blob;
  }



 private openGallery (): void {
  let cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.camera.EncodingType.JPEG,      
    correctOrientation: true
  }

 this.camera.getPicture(cameraOptions)
    .then(file_uri => {
      this.imageSrc = file_uri;
      this.base64Image="data:image/jpeg;base64,"+this.imageSrc;
      this.binaryImage = this.b64toBlob(this.imageSrc, "image/png", "");
      console.log("BinaryImage: ", this.binaryImage);
        this.user_snap_taken=true;

     }, 

    err => console.log(err));   
}

  capture(){
              
 	this.camera.getPicture({
      quality:50,
  		destinationType:this.camera.DestinationType.DATA_URL,
  		targetWidth:1000,
  		targetHeight:1000,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum:true,
      mediaType: this.camera.MediaType.PICTURE,      
      correctOrientation: true
  	}).then((imageData) =>{
  		console.log("ImageData:",imageData)
  		//detect face
  		this.base64Image="data:image/jpeg;base64,"+imageData;
      console.log("ImageData:",this.base64Image)
  		this.binaryImage= this.b64toBlob(imageData,"image/png","");
  		console.log("BinaryImage :",this.binaryImage)
      },(err) =>{
      console.log(err);
    });
  }



  submit(){
    let loader=this.loadingCtrl.create({
        content: "Please wait"
      })

      loader.present();

      console.log("BinaryImage :",this.binaryImage)
      //detect
  		this.auth.detectFace(this.binaryImage).subscribe((data) => {
  			console.log(data);
  			//console.log(data[0],faceId);

  			this.faceIds=[];
  			this.faceIds.push(data[0].faceId);

  			//identify face
  			this.faceData = {
  				"personGroupId" : "cyber_dom",
  				"faceIds":this.faceIds,
  				"maxNumOfCandidatesReturned":1,
  				"confidenceThreshold":0.5
  			};
  			this.auth.identifyFace(this.faceData).subscribe((data) => {
  				console.log(data);
  				//get person data
  				/*for(let i=0;i<data.length;i++){
  					this.personId=data[i].candidates[i].personId;
  					this.personList.push(this.personId);
  					console.log(this.personList)
  				}
				console.log(this.personList)*/
				loader.dismiss();
  				this.personId = data[0].candidates[0].personId;
  				//this.personList.push(this.personId);
  				
  				this.auth.getPersonDetails(this.personId).subscribe((data) => {
  					console.log(data);
  					this.personData = data;
  					this.personDataStatus = "true";
  					this.details.Firstname=this.personData.name;
            this.personList.push(this.personData.name);
            loader.dismiss();
            //alert('PersonDetected : '+this.details.Firstname);

            
  				},(error) =>{
  					console.log(error);
  					this.personDataStatus = "false";
            loader.dismiss();
  					alert('Error occured while trying "Get person details". Please try later');
  				});
  			},(error) => {
  				console.log(error);
          loader.dismiss();
  				alert('Error occured while trying "Identify Face". Please try later')
  			});
  		},(error) =>{
  			console.log(error);
        loader.dismiss();
  			alert('Valid Face not Detected.Please try again');
  		});

    }

       
        
  	
  //goback button

  goback(){
    this.navCtrl.pop();
  }

  //Detailed Page
  getDetails(personId){
  	this.auth.getPersonDetails(this.personId).subscribe((data) => {
  					console.log(data);
  					this.personData = data;
  					this.personDataStatus = "true";

  					console.log(this.personData);

  					//push Detailed Page
  					this.navCtrl.push(PersonDetailsPage,{"pData": this.personData});


  					this.details.Firstname=this.personData.name;
           			// alert('PersonDetected : '+this.details.Firstname);

            
  				},(error) =>{
  					console.log(error);
  					this.personDataStatus = "false";
  					alert('Error occured while trying "Get person details". Please try later');
  				});
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../../providers/auth-service/auth-service';

import { HomePage } from '../home/home';

/**
 * Generated class for the UploadDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-details',
  templateUrl: 'upload-details.html',
})
export class UploadDetailsPage {

 public base64Image: any;
	public imageSrc: any;
  public binaryImage: any;

	// public userid;
    public username;
    public userage;
    public useraddress;
    public usercrimedetails;
    public useridentity;
    public faceApiUrl: any;
    userDataList = { 
          user_name: '', 
          user_age: '', 
          user_address :'',
          user_crime_details:'', 
          user_identify:''
        };
   user_snap_taken=false;
   customData = {
    "name" : '',
    "userData":''
   };

   public personID: string;

  constructor(public navCtrl: NavController,
    public camera: Camera,
    private toastCtrl: ToastController,
    private loadingCtrl : LoadingController,
    private auth : AuthService) {

  }
  //Method for take snap
  takePicture(){
    	this.camera.getPicture({
    		destinationType:this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation:true,
    		targetWidth:1000,
    		targetHeight:1000
    	}).then((imageData) =>{
    		this.base64Image="data:image/jpeg;base64,"+imageData;
        this.binaryImage = this.b64toBlob(imageData, "image/png", "");
        console.log("BinaryImage: ", this.binaryImage)
        this.user_snap_taken=true;
        console.log("ImageData",imageData);
    	},(err) =>{
    		console.log(err);
    	});
  }
  //method for open Gallery

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



  //Function to add records
  submit(){
      let loader=this.loadingCtrl.create({
        content: "Please wait"
      })
      

      
    if(this.validateFields()){
        this.customData.name=this.userDataList.user_name;
        this.customData.userData="Age:" +this.userDataList.user_age+",Address:"+this.userDataList.user_address+",Crime Details:"+this.userDataList.user_crime_details+",PersonalIdentity:"+this.userDataList.user_identify;
       console.log(this.customData);
loader.present().then(()=>{
        this.auth.createPerson(this.customData).subscribe((data) => {
          console.log(data);
          this.personID = data["personId"];
          console.log("Person String",this.personID);
            this.auth.addPersonFace(this.personID,this.binaryImage).subscribe((data)=>{
              console.log(data);
              this.auth.trainGroup().subscribe((data) =>{

                console.log("Training Group successfully");
                
                
                //var frm = document.getElementsByName('registerForm')[0];
                //frm.clears();
                  
              });
            });
        });
        })
        loader.dismiss();
        this.presentToast("Person successfully added");
                 document.forms["registerForm"].reset();
                 this.base64Image=null;
                 

    }

  }

  cancel(){
    this.navCtrl.pop();
  }
  presentToast(msg:string) {
          let toast = this.toastCtrl.create({
              message: msg,
              duration: 3000,
              position: 'middle',
              cssClass: 'toast_class'
          });
          toast.onDidDismiss(() => {
              console.log('Dismissed toast');
          });
          toast.present();
      }

      //base64 image conversion
b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }
  //Method to validate the feilds are empty or not
  validateFields(){
    if(this.userDataList.user_name== null){
      this.presentToast("Empty Feild Name!");
      return false;
    }else if(this.userDataList.user_age == null){
      this.presentToast("Empty Feild Age");
      return false;
    }else if(this.userDataList.user_address==null){
      this.presentToast("Empty user Address");
      return false;
    }else if(this.userDataList.user_identify==null){
      this.presentToast("UserIdentity is required");
      return false;
    }else if(this.userDataList.user_crime_details==null){
    	this.presentToast("Crime Details required ");
    	return false;
    }
    else if (this.user_snap_taken==false) {
      this.presentToast("Please take a pic");
      return false;
    }else{
      return true;
    }


    }

}

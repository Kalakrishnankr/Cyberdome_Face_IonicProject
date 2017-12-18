import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ActionSheetController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import Tesseract from 'tesseract.js';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/**
 * Generated class for the ReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
})
export class ReadPage {

  srcImage: string;
  OCRAD: any;
  public binaryImage: any;
  public result1:any;


  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
    ) {}

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Choose Photo',
        handler: () => {
            this.getPicture(0); // 0 == Library
        }
    },{
      text: 'Take Photo',
      handler: () => {
            this.getPicture(1); // 1 == Camera
        }
    },{
      text: 'Demo Photo',
      handler: () => {
        this.srcImage = 'assets/images/demo.jpg';
        console.log(this.srcImage)
      }
    },{
      text: 'Cancel',
      role: 'cancel'
    }
    ]
});
    actionSheet.present();
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
  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
  }).then((imageData) => {


    this.srcImage = "data:image/jpeg;base64,"+ imageData;
     console.log(this.srcImage)
    //this.binaryImage = this.b64toBlob(this.srcImage"image/png", "");
  //console.log(this.binaryImage)
 
    Tesseract.recognize(this.srcImage)
    .then(function(result){
      console.log(result.text)
      //alert(result.text);
      console.log(result)
    })
  }, (err) => {
    console.log(`ERROR -> ${JSON.stringify(err)}`);
  });
}

analyze() {
  let loader = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loader.present();
    /*(<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
  });*/
  //this.binaryImage = this.b64toBlob(this.srcImage, "image/png", "")
  console.log(this.srcImage)
  Tesseract.recognize(this.srcImage)
  .then((result)=>{
        // this.result1=result.text;
        console.log(result.text);
        this.result1=result;
    console.log(result)
    loader.dismissAll();

    alert(result.text);
  })



}

restart() {
  this.srcImage = '';
  this.result1 =null;
  this.presentActionSheet();
}

}

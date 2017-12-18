import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UploadDetailsPage } from '../pages/upload-details/upload-details';
import { IdentifyPersonPage } from '../pages/identify-person/identify-person';
import { PersonDetailsPage } from '../pages/person-details/person-details';
import { ReadPage } from '../pages/read/read';


import { AuthService } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UploadDetailsPage,
    IdentifyPersonPage,
    PersonDetailsPage,
    ReadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UploadDetailsPage,
    IdentifyPersonPage,
    PersonDetailsPage,
    ReadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

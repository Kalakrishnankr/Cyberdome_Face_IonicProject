import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { AuthService } from '../providers/auth-service/auth-service';
import { HttpModule }  from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { UploadDetailsPage } from '../pages/upload-details/upload-details';
import { IdentifyPersonPage } from '../pages/identify-person/identify-person';
import { PersonDetailsPage } from '../pages/person-details/person-details';
import { ReadPage } from '../pages/read/read';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


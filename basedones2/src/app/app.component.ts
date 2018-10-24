import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InfoData} from '../pages/infodata/infodata';
import { HomeLogo } from '../pages/homeLogo/homeLogo';
import { Historic } from '../pages/historic/historic';
import { SellData } from '../pages/selldata/selldata';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomeLogo;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


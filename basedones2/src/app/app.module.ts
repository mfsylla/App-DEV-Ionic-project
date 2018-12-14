import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { HomeLogo } from '../pages/homeLogo/homeLogo'

import { InfoData } from '../pages/infodata/infodata';
import { Charges } from '../pages/charges/charges';
import { Objective } from '../pages/objective/objective';
import { Company } from '../pages/company_list/company_list';
import { SellData } from '../pages/selldata/selldata';
import { History } from '../pages/history/history';
import { Camera } from '@ionic-native/camera';

import { InAppBrowser } from '@ionic-native/in-app-browser';

var config = {
  /*apiKey: "AIzaSyDT7pML9IY9PZslUnTOLGU8pftS-hQ5yxA",
  authDomain: "myapp-f3866.firebaseapp.com",
  databaseURL: "https://myapp-f3866.firebaseio.com",
  projectId: "myapp-f3866",
  storageBucket: "myapp-f3866.appspot.com",
  messagingSenderId: "959670328500"
  */
 apiKey: "AIzaSyCDnlXehsRm7Mn25iqdqzhZmSVZtgxRuKA",
 authDomain: "testdatabase-29b62.firebaseapp.com",
 databaseURL: "https://testdatabase-29b62.firebaseio.com",
 projectId: "testdatabase-29b62",
 storageBucket: "testdatabase-29b62.appspot.com",
 messagingSenderId: "909303594523"
    
  
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfoData,
    HomeLogo,
    Charges,
    Objective,
    Company,
    SellData,
    History
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config), 
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeLogo,
    HomePage,
    InfoData,
    Charges,
    Objective,
    Company,
    SellData,
    History
  ],
  providers: [
    AngularFirestore,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser
  ]
})
export class AppModule {}

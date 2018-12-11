import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'company_list.html'
})
export class Company {

  constructor(private inAppBrowser: InAppBrowser){}
  EmporioArmaniWebPage(){
    const browser =  this.inAppBrowser.create("https://www.armani.com/fr/armanicom/unisexe/emporio-armani/cross_section",'_self');
  }

  CelioWebPage(){
    const browser =  this.inAppBrowser.create("https://www.celio.com",'_self');
  }

  ElGansoWebPage(){
    const browser =  this.inAppBrowser.create("https://www.elganso.com/fr_fr/",'_self');
  }

  HMWebPage(){
    const browser =  this.inAppBrowser.create("https://www2.hm.com/fr_fr/index.html",'_self');
  }

  DecathlonWebPage(){
    const browser =  this.inAppBrowser.create("https://www.decathlon.fr/",'_self');
  }

  FootLockerWebPage(){
    const browser =  this.inAppBrowser.create("https://www.footlocker.fr/fr/page-d-accueil",'_self');
  }
 }
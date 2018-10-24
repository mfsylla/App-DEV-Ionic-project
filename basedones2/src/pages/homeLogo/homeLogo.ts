import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Historic } from '../historic/historic';
import { Charges } from '../charges/charges';
import { Objective } from '../objective/objective';
import { Scanner } from '../scanner/scanner';
import { Commande } from '../commande/commande';

// Import list options

@Component({
   templateUrl: 'homeLogo.html'
})

export class HomeLogo {
  
  constructor(public alerCtrl: AlertController, public navCtrl: NavController) { }

  doAlert() {
    let alert = this.alerCtrl.create({
      title: 'New Friend!',
      message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
      buttons: ['Ok']
    });
    alert.present()
  }

  articlesPage(){
    this.navCtrl.push(HomePage);
    
  }

  // HISTORIQUE DES VENTES
  doHistoric(){
    this.navCtrl.push(Historic);
  }
  // CHARGES
  doCharges(){
    this.navCtrl.push(Charges);
  }
  // OBJECTIVES
  doObjective(){
    this.navCtrl.push(Objective);
  }
  // SCANNER
  doScanner(){
    this.navCtrl.push(Scanner);
  }
  // COMMANDES
  doCommandes(){
    this.navCtrl.push(Commande);
  }
}





import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface ToDo{
    TV: string;
    MP4player : string;
    Quantity: number;
    id?: string;
  }

interface Register{
    Name: string;
    Quantity: number;
    id?: string;
}

@Component({
	selector: 'page-historic',
	templateUrl: 'historic.html'
})

export class Historic {

    todoCollection: AngularFirestoreCollection<ToDo>;
    item: ToDo;
    register: Register;
    public quantity_selt: number;
    public value: number;

    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore) {
        this.item = navParams.get('data');
        this.quantity_selt = navParams.get('value_less');
        this.updateHistoric(this.quantity_selt);
      }

 
 ionViewWillEnter() {
    console.log('Hello Its me');
  //  TV : this.asf.doc(`Any/${this.item.id}`).get();
  }

  updateHistoric(quantity_selt: number){
   
      this.asf.collection('Selt').add({quantity_selt}).then(newItem => {
        console.log(`Nueva tarea: "${quantity_selt}" (ID: ${newItem.id})`);
      }).catch(err => {
        console.error(err);
      });

}

}
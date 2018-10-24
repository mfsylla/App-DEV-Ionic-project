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
    id?: string;
  }

@Component({
	selector: 'page-infodata',
	templateUrl: 'infodata.html'
})

export class InfoData {

    items;
  
    todoCollection: AngularFirestoreCollection<ToDo>;
    item: ToDo;

    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore) {
        this.item = navParams.get('data');
      }
          /*
      ionViewDidLoad() {
      console.log('Hello Its me');
      }
        */

      initializeItems(){
        this.items = this.item ;
      }

          // research bar filtering

       getItems(ev){
        // Reset items back to all of the items
        this.initializeItems();
      
        // set val to the value of the ev target
        var val = ev.target.value;

       // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
      
      }


 
          ionViewWillEnter() {
            console.log('Hello Its me');
          //  TV : this.asf.doc(`Any/${this.item.id}`).get();
          }

}
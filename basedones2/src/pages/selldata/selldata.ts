import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Historic } from '../historic/historic';

interface ToDo{
    TV: string;
    MP4player : string;
    Quantity: number;
    id?: string;
  }

@Component({
	selector: 'page-selldata',
	templateUrl: 'selldata.html'
})

export class SellData {

    todoCollection: AngularFirestoreCollection<ToDo>;
    item: ToDo;
    public value: number;

    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore) {
        this.item = navParams.get('data');
        this.sellActions(this.item);
      }

 
 ionViewWillEnter() {
    console.log('Hello Its me');
  //  TV : this.asf.doc(`Any/${this.item.id}`).get();
  }

  sellActions(item: ToDo){
    this.value = item.Quantity -1;
    if(this.value < 0){
        console.log("Not in stock");
    }else{
    this.asf.doc(`Any/${item.id}`).update({ Quantity: this.value});
    var quantity_value=this.value;
    this.asf.collection('Selt').add({quantity_value});
    
    /*this.navCtrl.push(Historic, {
      data: item, value_less: this.value
    });
    */
    }
    console.log('Hello Its me twice');
  }

}
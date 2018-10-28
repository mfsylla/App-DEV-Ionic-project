import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Historic } from '../historic/historic';

interface ToDo{
     /*  TV: string;
    MP4player : string;
    id?: string;
    */
   Name: string;
   Price : number;
   Image: string;
   Size_L: number;
   Size_S: number;
   Size_M: number;
   TotalQuantity: number;
   Description: string;
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
    public TotalSize_S: number[];
    public TotalSize_M: number[];
    public TotalSize_L: number[];
 
    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore) {
        this.item = navParams.get('data');
        this.sellActions(this.item);
      }

 
 ionViewWillEnter() {
    console.log('Hello Its me');
  //  TV : this.asf.doc(`Any/${this.item.id}`).get();
  }

  sellActions(item: ToDo){

    //Select the quantity of each size you want to sell : We may put a wheel list with the quantity available
    //Calculate totalquantity and price
    //Get the date of selling
    //Press on the sell button
    //Register the sell on the HistorySeltClothes 

    /********************************************************************************************************************* */

    //Defining the sizes Available for the dropdown menu
    //For Size_S

    for( var i = 0 ; i<= item.Size_S ; i++ ){
      this.TotalSize_S.push(i);
    }
    for( var i = 0 ; i<= item.Size_M ; i++ ){
      this.TotalSize_M.push(i);
    }
    for( var i = 0 ; i<= item.Size_L ; i++ ){
      this.TotalSize_L.push(i);
    }

    //***************************************************************************************************************** */
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
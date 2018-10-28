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
    public TotalSize_S: number[] = [];
    public TotalSize_M: number[] = [];
    public TotalSize_L: number[] = [];

    public WantedSize_S:number = 0;
    public WantedSize_M:number = 0;
    public WantedSize_L:number = 0;

    takeSelection = {selectedSize_S: 0 , selectedSize_M: 0 , selectedSize_L: 0}
    
    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore) {
        this.item = navParams.get('data');
        this.showAvailableSizes(this.item);
      }

 
 ionViewWillEnter() {
    console.log('Hello Its me');
  //  TV : this.asf.doc(`Any/${this.item.id}`).get();
  }

  showAvailableSizes(item:ToDo){
    for( var i = 0 ; i<= item.Size_S ; i++ ){
      this.TotalSize_S.push(i);
      console.log("TotalSize_S = "+i);
    }
    for( var i = 0 ; i<= item.Size_M ; i++ ){
      this.TotalSize_M.push(i);
      console.log("TotalSize_M = "+i);
    }
    for( var i = 0 ; i<= item.Size_L ; i++ ){
      this.TotalSize_L.push(i);
      console.log("TotalSize_L = "+i);
    }
  }

  setWanted_SizeS(){
    if(this.takeSelection.selectedSize_S===null)
    {this.WantedSize_S=0;}
    else{
    this.WantedSize_S = this.takeSelection.selectedSize_S;
    console.log( this.takeSelection.selectedSize_S);
    }
  }
  setWanted_SizeM(){
    if(this.takeSelection.selectedSize_M===null)
    {this.WantedSize_M=0;}
    else{
    this.WantedSize_M = this.takeSelection.selectedSize_M;
    console.log( this.takeSelection.selectedSize_M);
    }
  }
  setWanted_SizeL(){
    if(this.takeSelection.selectedSize_L===null)
    {this.WantedSize_L=0;}
    else{
    this.WantedSize_L = this.takeSelection.selectedSize_L;
    console.log(this.takeSelection.selectedSize_L);
    }
  }


  sellActions(){

    /******Select the quantity of each size you want to sell : We may put a wheel list with the quantity available********/
    //The function showAvailableSizes do that

    /**************************************Calculate totalquantity and price*******************************/
    var TotalToPay=(this.WantedSize_S*29)+(this.WantedSize_M*29)+(this.WantedSize_L*29);
    console.log("Total To Pay is :"+TotalToPay);
    //Get the date of selling
    //Press on the sell button
    //Register the sell on the HistorySeltClothes 

    /********************************************************************************************************************* */

    //Defining the sizes Available for the dropdown menu
    //For Size_S
    

    //***************************************************************************************************************** */
/*    this.value = item.Quantity -1;
    if(this.value < 0){
        console.log("Not in stock");
    }else{
    this.asf.doc(`Any/${item.id}`).update({ Quantity: this.value});
    var quantity_value=this.value;
    this.asf.collection('Selt').add({quantity_value});
    */
    
    /*this.navCtrl.push(Historic, {
      data: item, value_less: this.value
    });
    */
   // }
    //console.log('Hello Its me twice');
  }

}
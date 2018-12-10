import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Historic } from '../historic/historic';
import { AlertController } from 'ionic-angular';

interface ToDo{
   Name: string;
   Price : number;
   Image: any;
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

    //Variables to get a array of available quantity to show in the dropdown list for HTML
    public TotalSize_S: number[] = [];
    public TotalSize_M: number[] = [];
    public TotalSize_L: number[] = [];
    public TotalQuantity: number[] = [];

    //Variables to get the quantity of each size that we want to buy
    public WantedSize_S:number = 0;
    public WantedSize_M:number = 0;
    public WantedSize_L:number = 0;

  //Variable to calculate and show the total price of the shop
    public TotalToPay:number = 0;

    //Variables to pass quantity of each size selected from HTML to TS
    takeSelection = {selectedSize_S: 0 , selectedSize_M: 0 , selectedSize_L: 0}
    
    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore, private alertCtrl: AlertController) {
        this.item = navParams.get('data'); //pass item of the clothe 
        this.showAvailableSizes(this.item); //The first thing to do is to know hoy many t-shirts of each size the magazine has
      }

 
 ionViewWillEnter() {
    console.log('Hello Its me');
  }

  //Prepare de dropdown list to show in HTML and select that to sell
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
    for( var i = 0 ; i<= item.TotalQuantity ; i++ ){
      this.TotalQuantity.push(i);
      console.log("TotalQuantity= "+i);
    }
  }

  //Get the quantity of each size that we want to buy
  setWanted_SizeS(){
    this.WantedSize_S = this.takeSelection.selectedSize_S;
    console.log( this.takeSelection.selectedSize_S);
    this.CalculateQuantityToPay();
  }
  setWanted_SizeM(){
    this.WantedSize_M = this.takeSelection.selectedSize_M;
    console.log( this.takeSelection.selectedSize_M);
    this.CalculateQuantityToPay();
  }
  setWanted_SizeL(){
    this.WantedSize_L = this.takeSelection.selectedSize_L;
    console.log(this.takeSelection.selectedSize_L);
    this.CalculateQuantityToPay();
  }

  CalculateQuantityToPay(){
    this.TotalToPay=(this.WantedSize_S*this.item.Price)+(this.WantedSize_M*this.item.Price)+(this.WantedSize_L*this.item.Price);
    console.log("Total To Pay is :"+this.TotalToPay+" €");
  }

  sellActions(){

    /******Select the quantity of each size you want to sell : We may put a wheel list with the quantity available********/
    //The function showAvailableSizes do that

    /**************************************Calculate totalquantity and price*******************************/
    // It is calculated thanks to the function CalculateQuantityToPay
   
    /*************************************** Get the date of selling***************************************/

    let alert = this.alertCtrl.create({
      title: 'Selt!',
      subTitle: 'Te article was succesfully selt!',
      buttons: ['Ok']
    });
    

    var today = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //var Selt_Date = Month+"/"+Day+"/"+Year+" at "+Hour+"h"+Minutes+":"+Seconds;
    var Selt_Date = months[today.getMonth()]+"/"+days[today.getDay()]+"/"+today.getFullYear()+" at "+today.getHours()+"h"+ today.getMinutes()+":"+today.getSeconds();

    /***************************************Update item of the T-Shirt***************************************/

    this.asf.doc(`Clothes/${this.item.id}`).update({ 
      Size_S: (this.TotalSize_S.length - this.WantedSize_S -1),
      Size_M: (this.TotalSize_M.length - this.WantedSize_M -1),
      Size_L: (this.TotalSize_L.length - this.WantedSize_L -1),
      TotalQuantity : (this.TotalQuantity.length - this.WantedSize_S - this.WantedSize_M -this.WantedSize_L -1)
    });
    //Press on the sell button

    /***************************************Add information to an History ***************************************/

    var Name = this.item.Name;
    var Size_S_bought = this.WantedSize_S;
    var Size_M_bought = this.WantedSize_M;
    var Size_L_bought = this.WantedSize_L;
    var Selt_price = this.TotalToPay;
    var Selt_Image = this.item.Image;

    console.log(this.item.Image);
    console.log(Selt_Image);

    this.asf.collection('HistorySeltClothes').add({Name,Size_S_bought,Size_M_bought,Size_L_bought,Selt_price, Selt_Date ,Selt_Image})

    alert.present();
    this.navCtrl.popToRoot();

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
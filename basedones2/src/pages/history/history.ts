import { Component } from '@angular/core';
import { NavController, Item, AlertController, NavParams, ItemGroup } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { storage, initializeApp } from 'firebase';
import {Camera, CameraOptions } from '@ionic-native/camera';
import { InfoData } from '../infodata/infodata';
import { SellData } from '../selldata/selldata';



interface ToDo{
  Name: string;
  Selt_Date : string;
  Selt_price: number;
  Size_L_bought: number;
  Size_M_bought: number;
  Size_S_bought: number;
  id?: string;
}
///////////////////////////////////////////

@Component({
  selector: 'app-history',
  templateUrl: 'history.html'
})
export class History {
  
   // searchbar filtering

   items;

   //////////searchbar instructions/////////


    //Variables for using database (show and treat data)
    todoCollection: AngularFirestoreCollection<ToDo>;
    //Any: ToDo[];
    HistorySeltClothes: ToDo[];
    canReorder: boolean = false;
    queryText: string;

///////////////////////////////////////////  
   constructor(public navCtrl : NavController, public navParams: NavParams, private asf: AngularFirestore, 
    private af: AngularFireDatabase, public alertCtrl: AlertController, private camera: Camera){ 
     // this.Any = navParams.get('data');
     this.HistorySeltClothes = navParams.get('data');
      this.queryText = "l";
    }

    initializeItems() {
    }


    /*
    
    The database is found on app.module.ts in the "var config"
    
    */ 

        //Show list of data at the opening of the page IN REAL TIME
        ionViewDidEnter(){
        this.todoCollection = this.asf.collection('HistorySeltClothes' 
       // ref => ref.orderBy("TV").startAt("").endAt(""+"\uf8ff")
        //.where("TV", ">=", "s").where("TV", "<=", '\uf8ff')
        /*.orderBy()
        .startAt("LG")
        .endAt("LG"+"\uf8ff")*/,ref => ref.orderBy("Name"));
        this.todoCollection.snapshotChanges().subscribe(todoList => {
          //this.Any = todoList.map(item => {
            this.HistorySeltClothes = todoList.map(item => {
            return {
              Name: item.payload.doc.data().Name,
              Selt_Date: item.payload.doc.data().Selt_Date,
              id: item.payload.doc.id,
              Selt_price: item.payload.doc.data().Selt_price,
              Size_L_bought: item.payload.doc.data().Size_L_bought,
              Size_M_bought: item.payload.doc.data().Size_M_bought,
              Size_S_bought: item.payload.doc.data().Size_S_bought
            }
          })  
        })
        }
      
        //Delete a data (an item)
      // Nothing because we do not delete
        
        //Add a new item 
        //1- Show the window to ask values to add
    //Nothing because we do not add manually
            
            //2- Add data and information to the database
            //Nothing because we do not add manually
            
          
            
            //Go to the next page to show inforlmation in infoData.ts and infoData.html (NOT FINISHED YET, WORKING ON IT)
           detailsPage(item: ToDo){
            this.navCtrl.push(InfoData, {
              data: item
            });
            }

            
    

                searching(ev){
                  var word = ev.target.value;
                  this.todoCollection = this.asf.collection('HistorySeltClothes', 
                  ref => ref.orderBy("Name").startAt(word).endAt(word+"\uf8ff"));
                  this.todoCollection.snapshotChanges().subscribe(todoList => {
             //       this.Any = todoList.map(item => {
              this.HistorySeltClothes = todoList.map(item => {
                      return {
                        Name: item.payload.doc.data().Name,
                        Selt_Date: item.payload.doc.data().Selt_Date,
                        id: item.payload.doc.id,
                        Selt_price: item.payload.doc.data().Selt_price,
                        Size_L_bought: item.payload.doc.data().Size_L_bought,
                        Size_M_bought: item.payload.doc.data().Size_M_bought,
                        Size_S_bought: item.payload.doc.data().Size_S_bought
                      }
                    })  
                  })
                }
            
        }
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
  /*TV: string;
  MP4player : string;
  id?: string;
  ImageData: string;*/
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
///////////////////////////////////////////

@Component({
  selector: 'app-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
   // searchbar filtering

   items;

   //////////searchbar instructions/////////


    //Variables for using database (show and treat data)
    todoCollection: AngularFirestoreCollection<ToDo>;
    //Any: ToDo[];
    Clothes: ToDo[];
    canReorder: boolean = false;
    queryText: string;

///////////////////////////////////////////  
   constructor(public navCtrl : NavController, public navParams: NavParams, private asf: AngularFirestore, 
    private af: AngularFireDatabase, public alertCtrl: AlertController, private camera: Camera){ 
     // this.Any = navParams.get('data');
     this.Clothes = navParams.get('data');
      this.queryText = "l";
    }

    initializeItems() {
 ///    this.items = this.Any ;
     //this.items = this.asf.collection('Any');
    }
 /*
    getItems(ev) {
     // Reset items back to all of the items
     this.initializeItems();
 
     // set val to the value of the ev target
     var val = ev.target.value;
 
     // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {
       this.items = this.items.filter((item) => {
         return (
           item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  
        })
     }
   }
   */

    /*
    
    The database is found on app.module.ts in the "var config"
    
    */ 

        //Show list of data at the opening of the page IN REAL TIME
        ionViewDidEnter(){
        this.todoCollection = this.asf.collection('Clothes' 
       // ref => ref.orderBy("TV").startAt("").endAt(""+"\uf8ff")
        //.where("TV", ">=", "s").where("TV", "<=", '\uf8ff')
        /*.orderBy()
        .startAt("LG")
        .endAt("LG"+"\uf8ff")*/,ref => ref.orderBy("Name"));
        this.todoCollection.snapshotChanges().subscribe(todoList => {
          //this.Any = todoList.map(item => {
            this.Clothes = todoList.map(item => {
            return {
              Name: item.payload.doc.data().Name,
              Description: item.payload.doc.data().Description,
              id: item.payload.doc.id,
              Image: item.payload.doc.data().Image,
              Size_L: item.payload.doc.data().Size_L,
              Size_M: item.payload.doc.data().Size_M,
              Size_S: item.payload.doc.data().Size_S,
              Price: item.payload.doc.data().Price,
              TotalQuantity: item.payload.doc.data().TotalQuantity
            }
          })  
        })
        }
      
        //Delete a data (an item)
        deleteItem(item: ToDo){
          this.asf.doc(`Clothes/${item.id}`).delete().then(() =>{
            console.log(`Element supprimé: "${item.Name}"`);
            let alert = this.alertCtrl.create({
              title: 'Deleted',
              subTitle: 'The article was succesfully deleted',
              buttons: ['Ok']
            });
            alert.present();
            this.navCtrl.popToRoot();
          }).catch(err => {
            console.error(err);
          })

          }
        
        //Add a new item 
        //1- Show the window to ask values to add
          newItem(){
            let prompt = this.alertCtrl.create({
              title: 'Add a Clothe',
              message: 'Write its information here',
              inputs:[{
                //name: 'Clothe_name',
                name: 'Name',
                placeholder: 'Write name....'
              },
              {
                name: 'Description',
                placeholder: 'Write description'
              },
              {
                name: 'Price',
                placeholder: 'Write price'
              },
              {
                name: 'Size_S',
                placeholder: 'Write Quantity of Size S'
              },
              {
                name: 'Size_M',
                placeholder: 'Write Quantity of Size M'
              },
              {
                name: 'Size_L',
                placeholder: 'Write Quantity of Size L'
              },
            //Image and TotalQuantity are taken after the button 
            ], 
              buttons:[{
                text:'Cancel'
              },{
                text: 'Save',
                handler: data =>{
                 // data.Image = this.takePhoto(data.Name);
                  this.addClothe(data.Name,data.Description, data.Price, data.Size_S, data.Size_M, data.Size_L);
                }
              }]
            }).present();
            }
            
            //2- Add data and information to the database
            addClothe(Name: string, Description: string, Price: number, 
              Size_S: number, Size_M: number, Size_L : number){
           /*   if(this.Any.length >0){
                let last = this.Any.length -1;
              }*/
              if(this.Clothes.length >0){
                let last = this.Clothes.length -1;
              }
              
              var TotalQuantity = Number(Size_L) + Number(Size_M )+ Number(Size_S);
              this.asf.collection('Clothes').add({Name, Description,Price,Size_S,Size_M,Size_L,TotalQuantity}).then(newItem => {
                console.log(`New Clothe added : "${Name}" (ID: ${newItem.id})`);
               // this.takePhoto(`${newItem}`);
                
              }).catch(err => {
                console.error(err);
              });
            }
            
          
            
            //Go to the next page to show inforlmation in infoData.ts and infoData.html (NOT FINISHED YET, WORKING ON IT)
           detailsPage(item: ToDo){
            this.navCtrl.push(InfoData, {
              data: item
            });
            }

            
            sellPage(item: ToDo){
              this.navCtrl.push(SellData, {
                data: item
              });
              }

                searching(ev){
                  var word = ev.target.value;
                  this.todoCollection = this.asf.collection('Clothes', 
                  ref => ref.orderBy("Name").startAt(word).endAt(word+"\uf8ff"));
                  this.todoCollection.snapshotChanges().subscribe(todoList => {
             //       this.Any = todoList.map(item => {
              this.Clothes = todoList.map(item => {
                      return {
                        Name: item.payload.doc.data().Name,
                        Description: item.payload.doc.data().Description,
                        id: item.payload.doc.id,
                        Image: item.payload.doc.data().Image,
                        Size_L: item.payload.doc.data().Size_L,
                        Size_M: item.payload.doc.data().Size_M,
                        Size_S: item.payload.doc.data().Size_S,
                        Price: item.payload.doc.data().Price,
                        TotalQuantity: item.payload.doc.data().TotalQuantity
                      }
                    })  
                  })
                }
            
        }
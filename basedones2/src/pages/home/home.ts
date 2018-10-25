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
  TV: string;
  MP4player : string;
  id?: string;
  ImageData: string;
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
    Any: ToDo[];
    canReorder: boolean = false;

///////////////////////////////////////////  
   constructor(public navCtrl : NavController, public navParams: NavParams, private asf: AngularFirestore, 
    private af: AngularFireDatabase, public alertCtrl: AlertController, private camera: Camera){ 
      this.Any = navParams.get('data');
    }

    initializeItems() {
     this.items = this.Any ;
     //this.items = this.asf.collection('Any');
    }
 
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

    /*
    
    The database is found on app.module.ts in the "var config"
    
    */ 

        //Show list of data at the opening of the page IN REAL TIME
        ionViewDidEnter(){
        this.todoCollection = this.asf.collection('Any');
        this.todoCollection.snapshotChanges().subscribe(todoList => {
          this.Any = todoList.map(item => {
            return {
              MP4player: item.payload.doc.data().MP4player,
              TV: item.payload.doc.data().TV,
              id: item.payload.doc.id,
              ImageData: item.payload.doc.data().ImageData
            }
          })  
        })
        }
      
        //Delete a data (an item)
        deleteItem(item: ToDo){
          this.asf.doc(`Any/${item.id}`).delete().then(() =>{
            console.log(`Element supprimé: "${item.TV}"`);
          }).catch(err => {
            console.error(err);
          })

          }
        
        //Add a new item 
        //1- Show the window to ask values to add
          newItem(){
            let prompt = this.alertCtrl.create({
              title: 'Add an element',
              message: 'Choose the new element to add',
              inputs:[{
                name: 'MP4player',
                placeholder: 'MP4player mark'
              },
              {
                name: 'TV',
                placeholder: 'TV mark'
              }], 
              buttons:[{
                text:'Cancel'
              },{
                text: 'Save',
                handler: data =>{
                  this.addMP4playerTV(data.MP4player,data.TV);
                }
              }]
            }).present();
            }
            
            //2- Add data and information to the database
            addMP4playerTV(MP4player: string, TV: string){
              if(this.Any.length >0){
                let last = this.Any.length -1;
              }
              this.asf.collection('Any').add({MP4player, TV}).then(newItem => {
                console.log(`Nueva tarea: "${MP4player}" (ID: ${newItem.id})`);
              }).catch(err => {
                console.error(err);
              });
            }
            
            //Updae the selected data
            //1- Open the windows to ask new values to put on the item
            updateItem(item: ToDo){
              let prompt = this.alertCtrl.create({
                title: 'Update element',
                message: 'Update the element',
                inputs:[{
                  name: 'MP4player',
                  placeholder: 'MP4player mark'
                },
                {
                  name: 'TV',
                  placeholder: 'TV mark'
                }], 
                buttons:[{
                  text:'Cancel'
                },{
                  text: 'Save',
                  handler: data =>{
                   this.nowUpdateItem(data.MP4player,data.TV,item);
                 // this.asf.doc(`Any/${item.id}`).update({ MP4player: data.MP4player, TV: data.TV});
                  }
                }]
              }).present();
              }
              //2- Replace the data and values by the news one
            nowUpdateItem(newMP4player: string, newTV: string, item: ToDo){
              this.asf.doc(`Any/${item.id}`).update({ MP4player: newMP4player, TV: newTV});
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

              async takePhoto(item: ToDo){
              try{
                
                const options:CameraOptions={
                quality: 50,
                targetHeight: 600,
                targetWidth: 600,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
                } 
                

               const result = await this.camera.getPicture(options);

               const image = `data:image/jpeg;base64,${result}`;

               const pictures = storage().ref(`${item.MP4player}`);

               pictures.putString(image, 'data_url' );

               this.asf.doc(`Any/${item.id}`).update({ ImageData: result });
                  }
                  catch(e)
                  { console.error(e);
                  }
                }

            
        }
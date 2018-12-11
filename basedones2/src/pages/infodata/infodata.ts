import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup,AlertController} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SellData } from '../selldata/selldata';
import {Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';

interface ToDo{
  /*  TV: string;
    MP4player : string;
    id?: string;
    */
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
	selector: 'page-infodata',
	templateUrl: 'infodata.html'
})

export class InfoData {

    items;
  
    todoCollection: AngularFirestoreCollection<ToDo>;
    item: ToDo;

    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore,
      public alertCtrl: AlertController, private camera: Camera) {
        this.item = navParams.get('data');
      }
          /*
      ionViewDidLoad() {
      console.log('Hello Its me');
      }
        */


          ionViewWillEnter() {
            console.log('Hello Its me');
          //  TV : this.asf.doc(`Any/${this.item.id}`).get();
          }
/********************************** Delete Item************************************************/
          deleteItem(item: ToDo){
            this.asf.doc(`Clothes/${item.id}`).delete().then(() =>{
              console.log(`Element supprimé: "${item.Name}"`);
              let alert = this.alertCtrl.create({
                title: 'Deleted',
                subTitle: 'The article was succesfully deleted',
                buttons: ['Ok'] });
                alert.present();
                this.navCtrl.popToRoot();
            }).catch(err => {
              console.error(err);
            })
  
            }

            /********************************** Update Item************************************************/
            updateItem(item: ToDo){
              let prompt = this.alertCtrl.create({
                title: 'Update a Clothe',
                message: 'Write its information here',
                inputs:[{
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
             //TotalQuantity is taken after the button 
              ], 
                buttons:[{
                  text:'Cancel'
                },{
                  text: 'Update and save',
                  handler: data =>{
                   this.nowUpdateItem(data.Name,data.Description, data.Price, data.Size_S, data.Size_M, data.Size_L,item);
                 // this.asf.doc(`Any/${item.id}`).update({ MP4player: data.MP4player, TV: data.TV});
                  }
                }]
              }).present();
              }

              nowUpdateItem(newName: string, newDescription: string, newPrice: number, 
                newSize_S: number, newSize_M: number, newSize_L : number,  item: ToDo){
                this.asf.doc(`Clothes/${item.id}`).update({ Name: newName, Description:  newDescription, Price: newPrice, 
                Size_S: newSize_S, Size_M: newSize_M, Size_L: newSize_L });
              }

            /********************************** Sell Item************************************************/
              sellPage(item: ToDo){
                this.navCtrl.push(SellData, {
                  data: item
                });
                }

                async takePhoto(item: ToDo){
                  try{
                    
                    const options:CameraOptions={
                    quality: 50,
                    targetHeight: 300,
                    targetWidth: 300,
                    destinationType: this.camera.DestinationType.DATA_URL,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE
                    } 
                    
    
                   const result = await this.camera.getPicture(options);
    
                   const image = `data:image/jpeg;base64,${result}`;
    
                   const pictures = storage().ref(`${item.Name}`);
    
                   pictures.putString(image, 'data_url' );
                  
                  this.asf.doc(`Clothes/${item.id}`).update({ Image: result });

                  let alert = this.alertCtrl.create({
                    title: 'Great!',
                    subTitle: 'The photon was taken',
                    buttons: ['Ok'] });
                    alert.present();
                    this.navCtrl.pop();
                      }
                      catch(e)
                      { console.error(e);
                      }
                      
                    }

}
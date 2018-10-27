import { Component } from '@angular/core';
import { NavController, NavParams , IonicPage ,Item, ItemGroup,AlertController} from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} 
from 'angularfire2/database';
/* For cloud firestore test*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SellData } from '../selldata/selldata';

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

    constructor(public navCtrl: NavController, public navParams: NavParams,private asf: AngularFirestore,
      public alertCtrl: AlertController) {
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

          ionViewWillEnter() {
            console.log('Hello Its me');
          //  TV : this.asf.doc(`Any/${this.item.id}`).get();
          }

          deleteItem(item: ToDo){
            this.asf.doc(`Any/${item.id}`).delete().then(() =>{
              console.log(`Element supprimé: "${item.TV}"`);
            }).catch(err => {
              console.error(err);
            })
  
            }

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

              nowUpdateItem(newMP4player: string, newTV: string, item: ToDo){
                this.asf.doc(`Any/${item.id}`).update({ MP4player: newMP4player, TV: newTV});
              }

              sellPage(item: ToDo){
                this.navCtrl.push(SellData, {
                  data: item
                });
                }

}
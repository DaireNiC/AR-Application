import { Component } from '@angular/core';
import { ARView } from '../ar-view/ar-view';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Modal, PopoverController, ModalOptions } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import * as firebase from 'Firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalProvider } from "../../providers/global/global";


declare var cordova: any;
/**
 * Generated class for the CreateSessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-session',
  templateUrl: 'create-session.html',
})

export class CreateSession {

  //  models = [{ 'name': 'Apartment', 'selected': false, url: 'https://firebasestorage.googleapis.com/v0/b/architect-61cc8.appspot.com/o/model.wt3?alt=media&token=f36dc432-9895-40c1-af97-42f0c1112c29', "img": "assets/img/apartment.png" }, { 'name': 'House', 'selected': false , url: 'https://firebasestorage.googleapis.com/v0/b/architect-61cc8.appspot.com/o/house.wt3?alt=media&token=e8308290-f365-4376-a8a5-173d4b47a57b', "img": "assets/img/house.png" }];
  //  url = "";s =   files: Observable<any[]>;
  models = [];

  data = { roomname: '', new_roomname: '' };


  constructor(public global: GlobalProvider, public popoverController: PopoverController, public transfer: FileTransfer, public file: File, public navCtrl: NavController, private db: AngularFireDatabase) {

    //update models whenever there is a change in the DB
    //update sessions when a new value is added to db
    // this.ref.on('value', snapshot => {
    //   this.models = snapshot.val();

    // });
    // console.log(JSON.stringify(this.models));
    let ref = firebase.database().ref('/Models/');
    ref.on('value', snapshot => {
      console.log(JSON.stringify(snapshot.val()));
      var result = snapshot.val();
      this.models = Object.keys(result).map(function(key) {
        return result[key];
      });

      //  this.models = Object.values(result);
      // const values = Object.keys(data).map(key => data[key]);
      //
      // const commaJoinedValues = values.join(",");
    });

  }


  presentPopover(myEvent) {
    console.log(JSON.stringify(this.models));
    let popover = this.popoverController.create(ModalPage, this.models);
    popover.present({
      ev: myEvent
    });
    var url = "";

    popover.onDidDismiss(data => {
      if (data != null) {
        console.log(data["url"]);
        url = (data["url"]);
      }

      console.log(url);
      this.download(url);
    });

  }

  addSession() {
    // set the key to the room name
    let ref = firebase.database().ref('/ARSessions/');
    if (this.data.new_roomname != '') {
      ref.child(this.data.new_roomname).set("");
      //save the key
      this.global.sessionKey = this.data.new_roomname;
      this.navCtrl.push(ARView);
      // navigate to AR view

    }

  }


  download(url) {
    console.log("in download method plus url is: " + url);
    this.global.downloadURL = url; // save the url for use in other pages e.g when in the load ar scnene method
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, cordova.file.dataDirectory + 'model.wt3').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log("dis is an error to do with your file download");
    });
  }

}

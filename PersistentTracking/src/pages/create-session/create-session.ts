import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Modal, PopoverController, ModalOptions } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
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

  models = [{ 'name': 'Apartment', 'selected': false, url: 'https://firebasestorage.googleapis.com/v0/b/architect-61cc8.appspot.com/o/model.wt3?alt=media&token=f36dc432-9895-40c1-af97-42f0c1112c29', "img": "assets/img/apartment.png" }, { 'name': 'House', 'selected': false , url: 'https://firebasestorage.googleapis.com/v0/b/architect-61cc8.appspot.com/o/house.wt3?alt=media&token=e8308290-f365-4376-a8a5-173d4b47a57b', "img": "assets/img/house.png" }];
//  url = "";


  constructor(public popoverController: PopoverController, public transfer: FileTransfer, public file: File, public navCtrl: NavController) {

  }




  presentPopover(myEvent) {
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

  download(url) {
    console.log("in download method plus url is: " + url);
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, cordova.file.dataDirectory + 'model.wt3').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log("dis is an error to do with your file download");
    });
  }

}

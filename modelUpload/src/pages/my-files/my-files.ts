import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@IonicPage()
@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {
  files: Observable<any[]>;
  public uploader: FileUploader = new FileUploader({});

  constructor(public navCtrl: NavController, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController, private iab: InAppBrowser) {
    this.files = this.dataProvider.getFiles();
  }

  getFiles() {

  return this.uploader.queue.map((fileItem) => {
    console.log( "file item " + fileItem);
    return fileItem.file;
  });
}

uploadModel(){
  // get a handle on the file the user choses
  let files = this.getFiles();
  console.log(files);
}

  addFile() {

    let inputAlert = this.alertCtrl.create({
      title: 'Name your Model',
      inputs: [
        {
          name: 'info',
          placeholder: 'Apartment Complex...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Store',
          handler: data => {
           this.uploadInformation(data.info);
          }
        }
      ]
    });
    inputAlert.present();
  }

  uploadInformation(text) {
    let file = this.getFiles();
    console.log(file);
    // send file and name
    let upload = this.dataProvider.uploadToStorage(text, file[0]);

    // Perhaps this syntax might change, it's no error here!
    upload.then().then(res => {
      this.dataProvider.storeInfoToDatabase(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New File added!',
          duration: 3000
        });
        toast.present();
      });
    });
  }

  deleteFile(file) {
    this.dataProvider.deleteFile(file).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'File removed!',
        duration: 3000
      });
      toast.present();
    });
  }

  viewFile(url) {
    this.iab.create(url);
  }
}

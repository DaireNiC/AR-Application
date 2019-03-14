import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Modal, PopoverController, ModalOptions } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

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

  constructor(
    public popoverController: PopoverController
  ) { }

   presentPopover(ev: any) {
    const popover =  this.popoverController.create(ModalPage);
    popover.onDidDismiss(data => {
       console.log(data);
     });
    return popover.present();


   // openModal() {
   //  const modal  = this.modalController.create(ModalPage)
   //
   //   modal.present();

    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     console.log('Modal Sent Data :', dataReturned);
    //   }
    // });


  }

}

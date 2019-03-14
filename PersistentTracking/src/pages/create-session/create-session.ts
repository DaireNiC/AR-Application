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

  models = [{'name': 'lovely house', 'selected': false}, {'name': 'nice house', 'selected': false}];

  constructor(
    public popoverController: PopoverController
  ) { }


  presentPopover(myEvent) {
    let popover = this.popoverController.create(ModalPage, this.models);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data != null) {
        console.log(data);
      }
    });


  }

}

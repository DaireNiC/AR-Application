import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {

	constructor(public viewCtrl: ViewController) {}

	 dismiss() {
	   this.viewCtrl.dismiss();
	 }
}

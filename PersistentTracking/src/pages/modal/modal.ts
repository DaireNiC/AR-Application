import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ViewController, NavController} from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})

export class ModalPage {
  // list of models retrieved from DB
  models = [];
	constructor(public viewCtrl: ViewController,  public navCtrl: NavController,  public navParams: NavParams) {}

  ionViewDidEnter() {
    console.log(this.navParams.data);
    this.models = this.navParams.data;
  }
	 dismiss(p) {
     console.log(p);
	   this.viewCtrl.dismiss(p);
	 }
}

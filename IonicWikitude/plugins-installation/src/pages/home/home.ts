import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

//declare var cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public platform: Platform) {
         platform.ready().then(() => {
        //   this.wikitudePlugin = require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
          alert((<any>window).wikitudePlugin);
          });
  }

}

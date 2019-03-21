import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ARView } from '../ar-view/ar-view';
import { CreateSession } from '../create-session/create-session';
import { AlertController } from 'ionic-angular';
import * as firebase from 'Firebase';
import { SingletonService } from '../../services/SingletonService';
import { GlobalProvider } from "../../providers/global/global";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  sessions = []
  sessionKey = '';
  data = { roomname: '', new_roomname: '' };
  //  ref = this.db.list('/ArSessions/');

  ref = firebase.database().ref('/ARSessions/');

  constructor(private alertCtrl: AlertController, public global: GlobalProvider, public navCtrl: NavController, public db: AngularFireDatabase, public singleton: SingletonService) {


    //update sessions when a new value is added to db
    this.ref.on('value', snapshot => {
      this.sessions = snapshot.val();
    });


  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Load Session',
      inputs: [
        {
          name: 'title',
          placeholder: 'Client A'
        },
      ],
      buttons: [
        {
          cssClass: 'cancel-button-css',
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Go',
          handler: data => {
            console.log(data);
            this.data.roomname = data.title;
            if (this.loadSession()){
              console.log("such success");
                this.navCtrl.push(ARView);
            }else{
              this.failLoadAlert();
            }
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  failLoadAlert() {
      const alert = this.alertCtrl.create({
        title: 'Session not Found!',
        subTitle: 'Please check your session name and try again.',
        buttons: ['OK']
      });
      alert.present();
    }


  createSession() {
    // navigate to create session page
    this.navCtrl.push(CreateSession);
  }

  loadSession() {
    var sessionInput = this.data.roomname;
    for (var session in this.sessions) {
      if (session == sessionInput) {
        console.log("match!");
        this.global.sessionKey = sessionInput;
        return (true);
      }
    }

  }

}

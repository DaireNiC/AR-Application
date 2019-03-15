import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ARView } from '../ar-view/ar-view';
import { CreateSession} from '../create-session/create-session';
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
  sessionKey ='';
  data = { roomname: '', new_roomname: '' };
  //  ref = this.db.list('/ArSessions/');

  ref = firebase.database().ref('/ARSessions/');

  constructor( public global: GlobalProvider, public alertController: AlertController, public navCtrl: NavController, public db: AngularFireDatabase, public singleton:SingletonService) {

  //  this.sessionKey = singleton.setSessionKey("testerkeyyay");

    //update sessions when a new value is added to db
    this.ref.on('value', snapshot => {
      this.sessions = snapshot.val();
    });
  }


  addSession() {
    // set the key to the room name
    this.ref.child(this.data.new_roomname).set("");
    // navigate to AR view
    this.navCtrl.push(ARView);
  }

  createSession() {
    // navigate to create session page
    this.navCtrl.push(CreateSession);
  }
  loadSession() {
    var sessionInput = this.data.roomname;
    for(var session in this.sessions){
      if( session == sessionInput){
        console.log("match!");
        this.global.sessionKey=sessionInput;
        this.navCtrl.push(ARView);
      }
    }

  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.key();
  //  item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

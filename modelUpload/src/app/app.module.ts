import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DataProvider } from '../providers/data/data';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

var firebaseConfig = {
  apiKey: "AIzaSyBin5K65PzlW0X_HnVsmcYmJHCaiMyqC80",
  authDomain: "architect-61cc8.firebaseapp.com",
  databaseURL: "https://architect-61cc8.firebaseio.com",
  projectId: "architect-61cc8",
  storageBucket: "architect-61cc8.appspot.com",
  messagingSenderId: "285211879252"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    InAppBrowser
  ]
})
export class AppModule { }

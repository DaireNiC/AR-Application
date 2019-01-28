import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, geolocation: Geolocation, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      geolocation.getCurrentPosition().then((location) => {
        console.log(location);
      }).catch((error) => {
        console.log("error getting geolocation", error);
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

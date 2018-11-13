import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

// import { cordova } from '../../declaration';
declare var cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  wikitudePlugin: any;
  requiredFeatures = [ "2d_tracking", "geo" ];

  constructor(public navCtrl: NavController, public platform: Platform) {
     platform.ready().then(() => {
      this.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
      this.wikitudePlugin._sdkKey = "ZqbET9vXTIlrs+PjDitFppuDPLsYi1uNYmRrS7fLxxfA+Q0kzajw677ECx3uw2rQeeJo5mFJdm5/DZHtm2C3WhuDnqDWhPHlHqUHJ/8wRikRwlgN0+dXraKnBO5svkqkp9J2rM5XWvJ6tX3XLp682SDZO2E+YnTi6cvIBO2ey5JTYWx0ZWRfX/P0pkHuEQsBJyJ17vJsJ4eTeJ6v9eF+hhxEMZvhkgU0vCNPSO3a8GnV6e1vmybpvqN2bD50SYZVYUlWiQNkCjjGef0bNt69dQzOWkRNM4GTQtWKVv9lyBTmC+z2kTyrL4zVwtLH032wTiIUQafdLfqWqIbzgUpxH8n0r4ImXVOOPZJjlmpMfPUqLx46E2Y6xulhgUamFwGBV8Hh8woV9vnCKzK5OQERYqrLoRO5SvaW3wU0rXeR0S/Aelm+iUlpNhVoLuIYtQXjDu3rvkbjzOpi78lUgT+ZBiP6EUYH86SE+KrfJmVl7gu1DlsqD6WyTDB2IxdRVZK/AM0thpNoQ9U3xt477TuL49f9O+mJRKjS4Tnl5yEmJsPP8sgjgmcgPpI7j+8210/C/mksrsz9yeqq5dfNdYK8EcjzUjCiBTw6gkgcLHbbsZCgpNDKoU/6rneyavLKw8dTtxkdVY1qrG3GtI3JsLRaf0iJVTOPFdGmUwkz6ETx7Ok=";

      this.wikitudePlugin.isDeviceSupported(this.onDeviceSupported, this.onDeviceNotSupported, this.requiredFeatures);
    });
  }
  onDeviceSupported () {
    console.log('device supported');
  }

  onDeviceNotSupported () {
    console.log('device not supported');
  }
}

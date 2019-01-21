/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
      WikitudePlugin._sdkKey="Xw58KRFIwpdeoszmXTK6dX77af/Cw3G8/DfUVD/1DtOAZWOUNaxebR0UdnjyPWjdiOKmFg8gwNE7jsTakKC24tG1z/aAH0FqjRFnKn0aMjqm9RcXLX0gxuTq7puupL87u200KLHRxkDt4R2r960P+kwrw+YuV6LgRkL1ufmvH7hTYWx0ZWRfX8nxm1NCoxx/6XKFrk81jMsn84J4A0DZBgsTmRd8zNVKC2xPPscfmaiHBFcAoJzhYqmhO+0+qcYB6Wb+w3b0xJ+SxspQSLgZsZDa6rlQMptkVe2GKYX5m46uKQXEAI+nXlaD41YDg9UrQ5Bq+3Qmkns7n4Inr2B4Fhn6oFG+vGVrdtBUmeAIW9d4astEMKpFI2FOHinlVxpMQAYoGh0wp85N6iJr5/DIIJ9ngWjmGGoDTkOERprV+lopi1/DAIpq/yr3mCWodcZTxPjw2NSlZENl236N6rSo1jf6pMpOn4Hc8K57rtPLNsW7KvUg0oM8AGcwentD5uG80EuJnNV47OPJumw/LkqRjEEj3S8aO4oBAacDJpsgY8UypkBOT/oOe5cS5sc2SkFWZ+3+/AJJqwGLRH9slS8XPh/Y3p8XsG77AjUnIX2UAS/iJm9QmeA984mgz2edrmv+Z2JdwKeI6r9SubqQzbuDqvRauup8w3xtWbwUvOuO+/lVlgzOjY6/QXpetpx7zgjCstxfWCQx6v11YltmXCfYt5rCpu7RzFTFRyh+GIrGil7JUR4mUsVPub1cKiCRwaas";
       // "Xw58KRFIwpdeoszmXTK6dX77af/Cw3G8/DfUVD/1DtOAZWOUNaxebR0UdnjyPWjdiOKmFg8gwNE7jsTakKC24tG1z/aAH0FqjRFnKn0aMjqm9RcXLX0gxuTq7puupL87u200KLHRxkDt4R2r960P+kwrwa+0+qcYB6Wb+w3b0xJ+SxspQSLgZsZDa6rlQMptkVe2GKYX5m46uKQXEAI+nXlaD41YDg9UrQ5Bq+3Qmkns7n4Inr2B4Fhn6oFG+vGVrdtBUmeAIW9d4astEMKpFI2FOHinlVxpMQAYoGh0wp85N6iJr5/DIIJ9ngWjmGGoDTkOERprV+lopi1/DAIpq/yr3mCWodcZTxPjw2NSlZENl236N6rSo1jf6pMpOn4Hc8K57rtPLNsW7KvUg0oM8AGcwentD5uG80EuJnNV47OPJumw/LkqRjEEj3S8aO4oBAacDJpsgY8UypkBOT/oOe5cS5sc2SkFWZ+3+/AJJqwGLRH9slS8XPh/Y3p8XsG77AjUnIX2UAS/iJm9QmeA984mgz2edrmv+Z2JdwKeI6r9SubqQzbuDqvRauup8w3xtWbwUvOuO+/lVlgzOjY6/QXpetpx7zgjCstxfWCQx6v11YltmXCfYt5rCpu7RzFTFRyh+GIrGil7JUR4mUsVPub1cKiCRwaas";

            /** Check if your device supports AR */
            WikitudePlugin.isDeviceSupported(
                function(success) {
                  console.log("Your platform supports AR/Wikitude. Have fun developing!!");
                },
                function(fail) {
                  console.log("Your platform failed to run AR/Wikitude: "+fail);
                },
                [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
            );

            /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
             * through the function below for the direction Ionic app --> Wikitude SDK
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View

            WikitudePlugin.setJSONObjectReceivedCallback(obj => {

                console.log("setJSONObjectReceivedCallback ..."+JSON.stringify(obj));
                // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
                if (obj["action"]){
                    switch (obj["action"]) {
                        case "closeWikitudePlugin":
                            // close wikitude plugin
                            WikitudePlugin.close();
                            break;
                        case "captureScreen":

                            WikitudePlugin.captureScreen(
                                (absoluteFilePath) => {
                                    console.log("snapshot stored at:\n" + absoluteFilePath);

                                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                                },
                                (errorMessage) => {
                                    console.log(errorMessage);
                                },
                                true, null
                            );

                            break;
                        default:
                            console.warn("action not handled => ", obj);
                            break;
                    } // end switch
                } // end if (obj.action)
            });

            /**
             * Define the generic ok callback
             */
            WikitudePlugin.onWikitudeOK = function() {
                console.log("Things went ok.");
            }

            /**
             * Define the generic failure callback
             */
            WikitudePlugin.onWikitudeError = function() {
                console.log("Something went wrong");
            }

            // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native
            // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
            //WikitudePlugin.setLocation(47, 13, 450, 1);

            /* for Android only
            WikitudePlugin.setBackButtonCallback(
                () => {
                    console.log("Back button has been pressed...");
                }
            );
            */

    });
  }
}
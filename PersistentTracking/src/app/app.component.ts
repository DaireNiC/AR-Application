/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase } from 'angularfire2/database';
import { SingletonService } from '../services/SingletonService';
import * as firebase from 'Firebase';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { TabsPage } from '../pages/tabs/tabs';
import { GlobalProvider } from "../providers/global/global";
declare let window: any;
declare let cordova: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  sessionKey = '';
  dbResult = [];
  ref = firebase.database().ref('/ARSessions/');

  constructor(public global: GlobalProvider, public transfer: FileTransfer,public file: File, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public db: AngularFireDatabase, public singleton: SingletonService) {
    this.sessionKey = this.global.sessionKey;

    platform.ready().then(() => {
      window.addEventListener('filePluginIsReady', function() { console.log('File plugin is ready'); }, false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();



      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
      WikitudePlugin._sdkKey = "Xw58KRFIwpdeoszmXTK6dX77af/Cw3G8/DfUVD/1DtOAZWOUNaxebR0UdnjyPWjdiOKmFg8gwNE7jsTakKC24tG1z/aAH0FqjRFnKn0aMjqm9RcXLX0gxuTq7puupL87u200KLHRxkDt4R2r960P+kwrw+YuV6LgRkL1ufmvH7hTYWx0ZWRfX8nxm1NCoxx/6XKFrk81jMsn84J4A0DZBgsTmRd8zNVKC2xPPscfmaiHBFcAoJzhYqmhO+0+qcYB6Wb+w3b0xJ+SxspQSLgZsZDa6rlQMptkVe2GKYX5m46uKQXEAI+nXlaD41YDg9UrQ5Bq+3Qmkns7n4Inr2B4Fhn6oFG+vGVrdtBUmeAIW9d4astEMKpFI2FOHinlVxpMQAYoGh0wp85N6iJr5/DIIJ9ngWjmGGoDTkOERprV+lopi1/DAIpq/yr3mCWodcZTxPjw2NSlZENl236N6rSo1jf6pMpOn4Hc8K57rtPLNsW7KvUg0oM8AGcwentD5uG80EuJnNV47OPJumw/LkqRjEEj3S8aO4oBAacDJpsgY8UypkBOT/oOe5cS5sc2SkFWZ+3+/AJJqwGLRH9slS8XPh/Y3p8XsG77AjUnIX2UAS/iJm9QmeA984mgz2edrmv+Z2JdwKeI6r9SubqQzbuDqvRauup8w3xtWbwUvOuO+/lVlgzOjY6/QXpetpx7zgjCstxfWCQx6v11YltmXCfYt5rCpu7RzFTFRyh+GIrGil7JUR4mUsVPub1cKiCRwaas";
      // "Xw58KRFIwpdeoszmXTK6dX77af/Cw3G8/DfUVD/1DtOAZWOUNaxebR0UdnjyPWjdiOKmFg8gwNE7jsTakKC24tG1z/aAH0FqjRFnKn0aMjqm9RcXLX0gxuTq7puupL87u200KLHRxkDt4R2r960P+kwrwa+0+qcYB6Wb+w3b0xJ+SxspQSLgZsZDa6rlQMptkVe2GKYX5m46uKQXEAI+nXlaD41YDg9UrQ5Bq+3Qmkns7n4Inr2B4Fhn6oFG+vGVrdtBUmeAIW9d4astEMKpFI2FOHinlVxpMQAYoGh0wp85N6iJr5/DIIJ9ngWjmGGoDTkOERprV+lopi1/DAIpq/yr3mCWodcZTxPjw2NSlZENl236N6rSo1jf6pMpOn4Hc8K57rtPLNsW7KvUg0oM8AGcwentD5uG80EuJnNV47OPJumw/LkqRjEEj3S8aO4oBAacDJpsgY8UypkBOT/oOe5cS5sc2SkFWZ+3+/AJJqwGLRH9slS8XPh/Y3p8XsG77AjUnIX2UAS/iJm9QmeA984mgz2edrmv+Z2JdwKeI6r9SubqQzbuDqvRauup8w3xtWbwUvOuO+/lVlgzOjY6/QXpetpx7zgjCstxfWCQx6v11YltmXCfYt5rCpu7RzFTFRyh+GIrGil7JUR4mUsVPub1cKiCRwaas";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
        function(success) {
          console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        },
        function(fail) {
          console.log("Your platform failed to run AR/Wikitude: " + fail);
        },
        [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
       * through the function below for the direction Ionic app --> Wikitude SDK
       * For calls from Wikitude SDK --> Ionic app see the captureScreen example in
       * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View

      WikitudePlugin.setJSONObjectReceivedCallback(obj => {
        console.log(this.global.sessionKey);


        console.log(" MAP RESOURCE : setJSONObjectReceivedCallback ..." + JSON.stringify(obj));
        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic)
        if (obj["action"]) {
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
                  WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath + "');");
                },
                (errorMessage) => {
                  console.log(errorMessage);
                },
                true, null
              );

              break;
            case "save_current_instant_target":
              console.log("in save method");
              console.log(cordova.file.externalDataDirectory);

              window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fs) {

                console.log('file system open: ' + JSON.stringify(fs));
                fs.getFile("SavedAugmentations.json",
                  { create: true, exclusive: false },
                  function(fileEntry) {
                    fileEntry.createWriter(function(writer) {
                      writer.write(obj["augmentations"]);
                    }, console.log("couldnt create writer"));
                  }, console.log("error writing file"));

              }, console.log("error loading fs"));
              // /    this.db.list('armodel').push(obj["augmentations"]);

              // writing to firebase DB
              console.log("sesh key from save method " + this.global.sessionKey)
              var ref = firebase.database().ref('/ARSessions/');
              this.ref.child(`${this.global.sessionKey}/augmentations`).set(obj["augmentations"]);


            // if this is the first time saving the augmentation need to save download url retrieved earlier from model selection
              if (this.global.downloadURL){
                // save it to the augmentation Object
                let  downloadURL = { "dowloadURL" : this.global.downloadURL };
                this.ref.child(this.global.sessionKey).update(downloadURL);

              }


                WikitudePlugin.callJavaScript("World.saveCurrentInstantTargetToUrl(\"" + cordova.file.dataDirectory + "SavedInstantTarget.wto" + "\");")
              //WikitudePlugin.callJavaScript("World.saveCurrentInstantTargetToUrl(\"" + cordova.file.externalDataDirectory + 'targets/' + obj["name"] + ".wto" + "\");")
              break;
            case "load_existing_instant_target":



              console.log("in load method app componenet");

              // LOAD from DB
              var ref = firebase.database().ref('/ARSessions/' + this.global.sessionKey);

              var dbres = {};
              var key = this.global.sessionKey;


              // getting the latest data from the db
              this.ref.on('value', snapshot => {
                dbres = snapshot.val();
              });
              console.log("key is! --> " + key);
                console.log("global key is! --> " +  this.global.sessionKey);

              //REsult loaded from the DB
              console.log(" ENTIRE RESULT from  DB: " + JSON.stringify(dbres));

              // display the result for this session from db
              console.log(" SESSION RESULT from DB: " + JSON.stringify(dbres[key]));



              // write the model locally
              // get ref to download url





              // JSON obj = JSON.parse(dbres[key]);
              // var modelUri = (obj[0]["uri"]);
              //
              //  // read from the db the file using path name
              //  // LOAD from DB
              //  var ref = firebase.database().ref('/ARModels/' + modelUri);
              //  var model = "";
              //  // getting the latest data from the db
              //  this.ref.on('value', snapshot => {
              //     model = snapshot.val();
              //  });

              // get name of model and load and save to device
              //check the github for people who have saved similarly
              // /    writeToFile(model, key, "model.wt3");

              //write the loaded result to augmentations file
              let downloadURL = dbres[key]["dowloadURL"] ;
              console.log("found this download url and now aptemting to download" + downloadURL);

              download(downloadURL, this.transfer);

              writeToFile(dbres, key, "SavedAugmentations.json").then(response => {
                window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fileSystem) {
                  fileSystem.getFile("SavedAugmentations.json", null, function(fileEntry) {
                    fileEntry.file(function(file) {
                      var reader = new FileReader();
                      reader.onloadend = function() {
                        console.log(" FILE READ \n AFTER WIRITNG TO FILE FROM DB: " + this.result);
                              //        console.log("Successful file  db: " + this.dbResult);


                        //  displayFileData(fileEntry.fullPath + ": " + this.result);
                        //          this.db.list('armodel').push(obj["augmentations"]);
                        WikitudePlugin.callJavaScript("World.loadExistingInstantTargetFromUrl(\"" + cordova.file.dataDirectory + "SavedInstantTarget.wto" + "\"," + this.result + ");");
                      };
                      reader.readAsText(file);
                    }, console.log("err"));
                  }, console.log("err"));
                }, console.log("err"));
              });
              break;
            case "get_model_uri":
              console.log("in model method in app component");

              WikitudePlugin.callJavaScript("World.loadModelFromUrl(\"" + cordova.file.dataDirectory + "model.wt3" +  "\");");

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


      async function download(url, transfer) {
        console.log("in download method plus url is: " + url);
        const fileTransfer: FileTransferObject = transfer.create();
        fileTransfer.download(url, cordova.file.dataDirectory + 'model.wt3').then((entry) => {
          console.log(' SUCCESS download complete: ' + entry.toURL());
        }, (error) => {
          // handle error
          console.log("ERROR DOWNLOADING FILE");
        });
      }


      async function writeToFile(dbres, key, filename) {
        //write what is in DB to fie
        //  var dbres = dbres;
        return window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fs) {

          //  var key = this.sessionKey;
          //  console.log("KEY: " + key);
          console.log("RES: " + dbres);

          console.log('file system open: ' + JSON.stringify(fs));
          fs.getFile(filename,
            { create: true, exclusive: false },
            function(fileEntry) {
              fileEntry.createWriter(function(writer) {
                // writer.write(this.dbResult[this.global.sessionKey]);
                if (filename.includes(".json")) {
                  writer.write(dbres[key]["augmentations"]);
                  console.log("WRITING DB RESULT TO FILE: " + dbres[key]);
                }
                else {
                  writer.write(dbres);
                  console.log("WRITING DB RESULT TO FILE: " + dbres);

                }
              }, console.log("couldnt create writer"));
            }, console.log("error writing file"));

        }, console.log("error loading fs"));
        //    return "hi";
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
    //        WikitudePlugin.callJavaScript("World.saveCurrentInstantTargetToUrl(\"" + cordova.file.dataDirectory + "SavedInstantTarget.wto" + "\");")

    // window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(fs) {
    //
    //   fs.getDirectory('augmentations/', {
    //     create: true,
    //     exclusive: false
    //   },
    //     function(dirEntry) {
    //       dirEntry.getFile(obj["name"] + ".json",
    //         {
    //           create: true,
    //           exclusive: false
    //         },
    //         function(fileEntry) {
    //           fileEntry.createWriter(function(writer) {
    //             writer.write(obj["augmentations"]);
    //             console.log("success on writing!");
    //           }, console.log("couldnt create writer"));
    //         }, console.log("error writing file"));
    //     }, console.log("error loading fs"));
    // }, console.log("error loading fs"));

    // save db read to file
    //      WikitudePlugin.callJavaScript("World.saveCurrentInstantTargetToUrl(\"" + cordova.file.externalDataDirectory + "SavedInstantTarget.wto" + "\");")

    // console.log("loading instant target wiki plugin...");
    // WikitudePlugin.callJavaScript("World.loadExistingInstantTargetFromUrl(\"" + cordova.file.externalDataDirectory + 'targets/' + obj["name"] + ".wto" + "\");")
    //
    // //load file from local storage

  }



}

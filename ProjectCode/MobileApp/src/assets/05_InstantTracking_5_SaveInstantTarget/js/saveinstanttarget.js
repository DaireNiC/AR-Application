// Firebase App is always required and must be first

 var config = {    apiKey: "AIzaSyBin5K65PzlW0X_HnVsmcYmJHCaiMyqC80",
     authDomain: "architect-61cc8.firebaseapp.com",
     databaseURL: "https://architect-61cc8.firebaseio.com",
     projectId: "architect-61cc8",
     storageBucket: "architect-61cc8.appspot.com",
     messagingSenderId: "285211879252"
 };

 firebase.initializeApp(config);

 // get session key
 // listen for firebase updates
 //var  ref = firebase.database().ref('/ARSessions/');
var defaultScaleValue = 0.045;
var defaultRotationValue = 0;

var rotationValues = [];
var scaleValues = [];

var allCurrentModels = [];

var oneFingerGestureAllowed = false;

//firebase results
 var dbres = {};

/*
    This global callback can be utilized to react on the transition from and to 2 finger gestures; specifically, we
    disallow the drag gesture in this case to ensure an intuitive experience.
*/
AR.context.on2FingerGestureStarted = function() {
  oneFingerGestureAllowed = false;
};


var World = {

  drawables: [],
  modelPaths: [
    // "assets/models/model.wt3",
  //   "assets/models/couch.wt3",
    // "assets/models/officechair.wt3",
    // "assets/models/table.wt3",
    // "assets/models/trainer.wt3"
  ],
  /*
      RequestedModel is the index of the next model to be created. This is necessary because we have to wait one
      frame in order to pass the correct initial position to the newly created model. InitialDrag is a boolean
      that serves the purpose of swiping the model into the scene. In the moment that the model is created, the
      drag event has already started and will not be caught by the model, so the motion has to be carried out by
      the tracking plane. LastAddedModel always holds the newest model in allCurrentModels so that the plane knows
       which model to apply the motion to.
  */
  requestedModel: -1,
  initialDrag: false,
  lastAddedModel: null,


  init: function initFn() {


    this.showUserInstructions("Running without platform assisted tracking (ARKit or ARCore).");

    World.createOverlays();
    World.setupDBListener();

  },


  setupDBListener: function setupDBListenerFn() {
    // // downloads the model used in AR scene selected from DB
    console.log("NEW: getting session key... ")
      AR.platform.sendJSONObject({
          action: "get_session_key"
      });
  },


  // /* Called from platform specific part of the sample. */
  setupDBKey: function setupDBKeyFn(key) {
    console.log("NEW:in the setupDBKey --> " + key);
    // set up listener to db
/*   ref = firebase.database().ref('/ARSessions/' + key);

    // getting the latest data from the db
    ref.on('value', snapshot => {
      dbres = snapshot.val();
      console.log("NEW VAL");
      World.loadExistingInstantTarget();
    });
    */
  },




  setupModel: function setupModelFn() {
    // // downloads the model used in AR scene selected from DB
    console.log("loading model uri from savetargetsjs... ")
      AR.platform.sendJSONObject({
          action: "get_model_uri"
      });

    //  World.loadExistingInstantTarget();
  },

  createOverlays: function createOverlaysFn() {

    var crossHairsRedImage = new AR.ImageResource("assets/crosshairs_red.png", {
      onError: World.onError
    });
    this.crossHairsRedDrawable = new AR.ImageDrawable(crossHairsRedImage, 1.0);

    var crossHairsBlueImage = new AR.ImageResource("assets/crosshairs_blue.png", {
      onError: World.onError
    });
    this.crossHairsBlueDrawable = new AR.ImageDrawable(crossHairsBlueImage, 1.0);

    var crossHairsGreenImage = new AR.ImageResource("assets/crosshairs_green.png", {
      onError: World.onError
    });
    this.crossHairsGreenDrawable = new AR.ImageDrawable(crossHairsGreenImage, 1.0);

    this.tracker = new AR.InstantTracker({
      onChangedState: function onChangedStateFn(state) {
        var els = [].slice.apply(document.getElementsByClassName("model-button"));
        if (state === AR.InstantTrackerState.INITIALIZING) {
          els.forEach(function(element) {
            element.classList.add("image-button-inactive");
          });

          document.getElementById("tracking-start-stop-button").src = "assets/buttons/start.png";
          document.getElementById("tracking-height-slider-container").style.visibility = "visible";
        } else {
          els.forEach(function(element) {
            element.classList.remove("image-button-inactive");
          });

          document.getElementById("tracking-start-stop-button").src = "assets/buttons/stop.png";
          document.getElementById("tracking-height-slider-container").style.visibility = "hidden";
        }
      },
      /*
          Device height needs to be as accurate as possible to have an accurate scale returned by the Wikitude
          SDK.
       */


      deviceHeight: 1.0,
      onError: World.onError,
      onChangeStateError: World.onError,
      /* SMART has to be disabled to use the save and load InstantTarget feature. */
      smartEnabled: false
    });

    this.instantTrackable = new AR.InstantTrackable(this.tracker, {
      drawables: {
        cam: World.crossHairsBlueDrawable,
        initialization: World.crossHairsRedDrawable
      },
      onTrackingStarted: function onTrackingStartedFn() {
        /* Do something when tracking is started (recognized). */
      },
      onTrackingStopped: function onTrackingStoppedFn() {
        /* Do something when tracking is stopped (lost). */
      },
      onTrackingPlaneClick: function onTrackingPlaneClickFn(xPos, yPos) {
        /* React to a the tracking plane being clicked here. */
      },
      onTrackingPlaneDragBegan: function onTrackingPlaneDragBeganFn(xPos, yPos) {
        oneFingerGestureAllowed = true;
        World.updatePlaneDrag(xPos, yPos);
      },
      onTrackingPlaneDragChanged: function onTrackingPlaneDragChangedFn(xPos, yPos) {
        World.updatePlaneDrag(xPos, yPos);

      },
      onTrackingPlaneDragEnded: function onTrackingPlaneDragEndedFn(xPos, yPos) {
        World.updatePlaneDrag(xPos, yPos);
        World.initialDrag = false;

      },
      onError: World.onError
    });

    setInterval(
      function() {
        if (World.tracker.canStartTracking) {
          World.instantTrackable.drawables.initialization = [World.crossHairsGreenDrawable];
        } else {
          World.instantTrackable.drawables.initialization = [World.crossHairsRedDrawable];
        }
      },
      1000
    );

    World.setupEventListeners()
  },

  setupEventListeners: function setupEventListenersFn() {
    document.getElementById("tracking-model-button-clock").addEventListener('touchstart', function( /*ev*/ ) {
      World.requestedModel = 0;
    }, false);

  },

  updatePlaneDrag: function updatePlaneDragFn(xPos, yPos) {
    if (World.requestedModel >= 0) {
      World.addModel(World.requestedModel, xPos, yPos);
      World.requestedModel = -1;
      World.initialDrag = true;
    }

    if (World.initialDrag && oneFingerGestureAllowed) {
      World.lastAddedModel.translate = {
        x: xPos,
        y: yPos
      };
    }
  },

  changeTrackerState: function changeTrackerStateFn() {

    if (this.tracker.state === AR.InstantTrackerState.INITIALIZING) {
      this.tracker.state = AR.InstantTrackerState.TRACKING;
    } else {
      this.tracker.state = AR.InstantTrackerState.INITIALIZING;
    }
  },

  changeTrackingHeight: function changeTrackingHeightFn(height) {
    this.tracker.deviceHeight = parseFloat(height);
  },

  addModel: function addModelFn(pathIndex, xpos, ypos) {

    World.setupModel();

    if (World.isTracking()) {
      var modelIndex = rotationValues.length;
      World.addModelValues();

      var model = new AR.Model(World.modelPaths[pathIndex], {
        scale: {
          x: defaultScaleValue,
          y: defaultScaleValue,
          z: defaultScaleValue
        },
        translate: {
          x: xpos,
          y: ypos
        },
        /*
            We recommend only implementing the callbacks actually needed as they will cause calls from
            native to JavaScript being invoked. Especially for the frequently called changed callbacks this
            should be avoided. In this sample all callbacks are implemented simply for demonstrative purposes.
        */
        onDragBegan: function( /*x, y*/ ) {
          oneFingerGestureAllowed = true;
        },
        onDragChanged: function(relativeX, relativeY, intersectionX, intersectionY) {

          if (oneFingerGestureAllowed) {
            /*
                We recommend setting the entire translate property rather than its individual components
                as the latter would cause several call to native, which can potentially lead to performance
                issues on older devices. The same applied to the rotate and scale property.
            */
            this.translate = {
              x: intersectionX,
              y: intersectionY
            };
          }
        },
        onDragEnded: function(x, y) {
          /* React to the drag gesture ending. */
                World.saveCurrentInstantTarget();
        },
        onRotationBegan: function(angleInDegrees) {
          /* React to the rotation gesture beginning. */
                World.saveCurrentInstantTarget();
        },
        onRotationChanged: function(angleInDegrees) {
          this.rotate.z = rotationValues[modelIndex] - angleInDegrees;
        },
        onRotationEnded: function( /*angleInDegrees*/ ) {
          rotationValues[modelIndex] = this.rotate.z;
                World.saveCurrentInstantTarget();
        },
        onScaleBegan: function(scale) {
          /* React to the scale gesture beginning. */
        },
        onScaleChanged: function(scale) {
          var scaleValue = scaleValues[modelIndex] * scale;
          this.scale = {
            x: scaleValue,
            y: scaleValue,
            z: scaleValue
          };
        },
        onScaleEnded: function( /*scale*/ ) {
          scaleValues[modelIndex] = this.scale.x;
          World.saveCurrentInstantTarget;
        },
        onError: World.onError
      });
console.log("model at the end of processing is : " + JSON.stringify(model));
      allCurrentModels.push(model);
      World.lastAddedModel = model;
      this.instantTrackable.drawables.addCamDrawable(model);

    }
  },

  isTracking: function isTrackingFn() {
    return (this.tracker.state === AR.InstantTrackerState.TRACKING);
  },

  addModelValues: function addModelValuesFn() {
    rotationValues.push(defaultRotationValue);
    scaleValues.push(defaultScaleValue);
  },

  resetModels: function resetModelsFn() {
    this.instantTrackable.drawables.removeCamDrawable(allCurrentModels);

    allCurrentModels = [];
    World.resetAllModelValues();
  },
  // /* Called from platform specific part of the sample. */
  loadModelFromUrl: function loadModelFromUrlFn(url) {
    console.log("in the load model on savejs, url recieved fis:  " + url);
    World.modelPaths[0] = url;
    console.log("world.modelpaths : " + World.modelPaths[0]);
  },

  resetAllModelValues: function resetAllModelValuesFn() {
    rotationValues = [];
    scaleValues = [];
  },

  saveCurrentInstantTarget: function saveCurrentInstantTargetFn() {
    var augmentations = [];

    allCurrentModels.forEach(function(model) {
      augmentations.push({
        uri: model.uri,
        translate: model.translate,
        rotate: model.rotate,
        scale: model.scale
      });
    });

    if (this.tracker.state === AR.InstantTrackerState.TRACKING) {
      AR.platform.sendJSONObject({
        action: "save_current_instant_target",
        augmentations: JSON.stringify(augmentations)
      });
    } else {
      alert("Save instant target is only available while tracking.")
    }
  },

  /* Called from platform specific part of the sample. */
  saveCurrentInstantTargetToUrl: function saveCurrentInstantTargetToUrlFn(url) {
    this.tracker.saveCurrentInstantTarget(url, function() {
      alert("Saving was successful");
    }, function(error) {
      alert("Saving failed: " + error);
    })
  },





  loadExistingInstantTarget: function loadExistingInstantTargetFn() {
    console.log("loading")
    AR.platform.sendJSONObject({
      action: "load_existing_instant_target"
    });
  },

  /* Called from platform specific part of the sample */
  loadExistingInstantTargetFromUrl: function loadExistingInstantTargetFromUrlFn(url, augmentations) {
    var mapResource = new AR.TargetCollectionResource(url);
    console.log(url);
    this.tracker.loadExistingInstantTarget(mapResource, function() {


      World.instantTrackable.drawables.removeCamDrawable(World.drawables);
      World.drawables.forEach(function(drawable) {
        drawable.destroy();
      });
      World.drawables = [];
      augmentations.forEach(function(model) {
        var modelIndex = rotationValues.length;

        rotationValues[modelIndex] = model.rotate.z;
        scaleValues[modelIndex] = model.scale.x;

        World.drawables.push(new AR.Model(model.uri, {
          translate: model.translate,
          rotate: model.rotate,
          scale: model.scale,
          onDragBegan: function() {
            oneFingerGestureAllowed = true;
          },
          onDragChanged: function(relativeX, relativeY, intersectionX, intersectionY) {
            if (oneFingerGestureAllowed) {
              /*
                  We recommend setting the entire translate property rather than its individual components
                  as the latter would cause several call to native, which can potentially lead to
                  performance issues on older devices. The same applied to the rotate and scale property.
              */
              this.translate = {
                x: intersectionX,
                y: intersectionY
              };
            }
          },
          onRotationChanged: function(angleInDegrees) {
            this.rotate.z = rotationValues[modelIndex] - angleInDegrees;
          },
          onRotationEnded: function() {
            rotationValues[modelIndex] = this.rotate.z
          },
          onScaleChanged: function(scale) {
            var scaleValue = scaleValues[modelIndex] * scale;
            this.scale = {
              x: scaleValue,
              y: scaleValue,
              z: scaleValue
            };
          },
          onScaleEnded: function() {
            scaleValues[modelIndex] = this.scale.x;
          },
          onError: World.onError
        }))
      });
      World.instantTrackable.drawables.addCamDrawable(World.drawables);
      alert("Loading was successful");
    }, function(error) {
      alert("Loading failed: " + error);
    }, {
      expansionPolicy: AR.CONST.INSTANT_TARGET_EXPANSION_POLICY.ALLOW_EXPANSION
    })
  },

  onError: function onErrorFn(error) {
    alert(error)
  },

  showUserInstructions: function showUserInstructionsFn(message) {
    document.getElementById('loadingMessage').innerHTML = message;
  }


};



World.init();

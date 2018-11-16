






## About 

This repo is a compilation of the research and progress of my final year software development project. 


#  Project Development  
Mixed reality, which includes both virtual and augmented, is an area in tech making significant progress in recent years. The goal of this project is to explore the state of the field in augmented reality. 

## Progress 

|Week|   |
|--|--|
| 1-3 | Research into areas of technology suitable for the project. Focusing on AR. Exploring the state of the field in AR. Comparing different libraries available. 
4 | Create a hello world application using google's ARCore Library. 
5 | Investigate geolocation based AR. 
6-7 | Investigating Shared AR

## Weeks 1-3

### Project Idea Research

 1.  Researched different areas of interest suitable for the project.
	 - IOT 
		 -  Explored applications of Raspberry pi + Arduino
	 - VR 
		 - Using Unity/C# + Blender to create an app for Oculus Go/GearVR
	 - AR 
		 - Mobile application using latest AR technologies
	 - AI
		 - Mobile application using tensorflow lite + ReactNative 

### AR focused project
- Decided to chose augmented reality with a focus on creating a mobile application as my project.
- Researched state of the field 
- Explored AR libraries available 
	- ARCore, ARKit, ViroReact
	- Looked at projects created using these libraries 
 - Researched Tools needed
	 - Android/C#, 3D modelling (Blender/Sketchup)


> Sources :
>-  https://www.mhlnews.com/technology-automation/top-10-emerging-iot-technologies-you-need-know
> - https://www.vrfocus.com/2018/01/the-state-of-immersive-reality-in-2018/
> - https://uploadvr.com/best-of-ces-2018-5-big-updates/ - https://www.vrfocus.com/2018/05/recap-of-everything-ar-and-vr-at-google-io/

## ARCore
### How it works
#### Motion Tracking
- ARCore uses a process called concurrent odometry and mapping, or COM, to understand where the phone is relative to the world around it.
-  ARCore detects visually distinct features in the captured camera image called **feature points** and uses these points to compute its change in location. 
- The visual information is combined with inertial measurements from the device's IMU to estimate the **pose** (position and orientation) of the camera relative to the world over time.

#### Environmental understanding
- ARCore is constantly improves its understanding of the real world environment by detecting feature points and planes.
- It looks for clusters of feature points that appear to lie on common horizontal or vertical surfaces, like tables or walls, and makes these surfaces available to your app as  **planes**.
-  ARCore can also determine each plane's boundary and make that information available to your app. You can use this information to place virtual objects resting on flat surfaces.
- Because ARCore uses feature points to detect planes, flat surfaces without texture, such as a white wall, may not be detected properly. 

- 
### Week 4
- Researched ARCore Library 
- Read through documentation 
- Created Hello World application for android

![Alt Text](https://media.giphy.com/media/39yDlAJDTmnJolROYc/giphy.gif)

> Sources
> - https://developers.google.com/ar/discover/
> - https://developers.google.com/ar/develop/developer-guides

### Week 5
- Researched Geolocation and AR applications
- Researched Geolocation accuracy 
- Found that the current state of gps on mobile devices was not accurate enough for application's need
	- Would need to use bluetooth beacons/ Dedicated GPS device/ additional HW
 
> Sources
>   - https://www.gps.gov/systems/gps/performance/accuracy/
> - https://www.andygup.net/how-accurate-is-android-gps-part-1-understanding-location-data/
> - https://developer.android.com/guide/topics/location/strategies
>  - https://www.gps.gov/systems/gps/performance/accuracy/
>  http://www.wetlandsurveysireland.com/news/how-to-achieve-sub-metre.html

### Week 6-7
- Researching Shared Augmented Reality
- Investigated ARCore Cloud Anchors to achieve this
- Working on creating basic AR using Cloud Anchors
- Set up Unity for development 
- Set up Android Studio and ARCore Dependencies 
- Set up Firebase for ARCore Cloud Anchors
- Got Google Cloud Anchors API key
- Created basic android app with shared AR
#### Cloud Anchor Host
![Alt Text](https://github.com/DaireNiC/AR-Application/blob/master/media/cloud_anchor_host.jpg)

#### Cloud Anchor Test with ARCore & Firebase 
![Alt Text](https://github.com/DaireNiC/AR-Application/blob/master/media/cloud_anchor_client.jpg)
> Sources
>   - https://developers.google.com/ar/develop/java/cloud-anchors/overview-android
> - https://developers.google.com/ar/develop/unity/cloud-anchors/quickstart-unity-android

### Week 8 
- Researched Vuforia SDK for creating multiplatform AR apps
- Implemented Ground plane detection
- Imported 3D model and added control for movement 


![Alt Text](https://media.giphy.com/media/1irNkg7dDMnEwr0gGz/giphy.gif)


- https://blogs.unity3d.com/2018/01/15/vuforia-in-unity-build-cross-platform-ar-apps/?_ga=2.222623579.1738989719.1541076993-871768103.1538569267
- https://www.instructables.com/id/Augmented-Reality-App-for-Beginners/


### Week 9
 - Exploring ways to create a fully functional crossplatform application
 - Researched ViroReact, Expo AR however they don't support shared ar (nor do they plan to anytime soon)
	 - https:\//github.com/viromedia/viro/issues/451
 - Tried to import sketchup model to existing cloud anchor example
	 - 3D file must be exported as .obj (sketchup supports this functionality)
	 -  Incorporated Sceneform Plugin to support custom objects
 - Looking into wikitude as an option with JS framework
 - Environment Setup for wikitude
 	- installed node.js, apache cordova	 
	 

#### Wikitude SDK
- Seems to be the most applicable AR SDK for crossplatform application development
- Supports Unity, Android, IOS, Apache Cordova & Xamarian
 - Latest version of SDK, WIkitude 8.0, uses ARCore & ARKit under the hood
 - Free for experimental development and learning - must pay for commercial use
- Extra functionality that other SDKs don't provide, e.g Scene recognition 
	- Could be used for placing a 3d object such as an extension for a building, in real space
- Provides support for Shared AR 
	- more research required here as it differs from how ARCore implements shared AR.
	
	
### Week 10
- Obtained Education License from Wikitude.
- Created sample Apache Cordova app using Wikitude Plugin.
- Also managed to create Ionic3 app implementing the plugin.



Resources : 
- https://www.wikitude.com/external/doc/documentation/latest/phonegap/setupguidecordovacli.html#setup-guide-cordova-cli
- https://www.wikitude.com/blog-sdk-8-endless-ar-possibilities/
- https://next.reality.news/news/wikitude-8-gives-app-developers-ability-create-private-micro-ar-clouds-0185083/
- https://www.wikitude.com/external/doc/documentation/latest/phonegap/instanttracking.html#instant-tracking
- https://medium.com/@wikitude/debunking-the-ar-cloud-79e93f5b94f7

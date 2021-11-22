# ionic-playground
Getting Audio to work in ionic 5
Project: my-audio

1. Install the following plugins
ionic audio plugin docs: https://ionicframework.com/docs/native/native-audio
```
    npm install cordova-plugin-nativeaudio
    npm install @ionic-native/native-audio
    npm install @ionic-native/audio-management
```

2. Then run npm list to install any missing dependencies manually

3. Audio Code 
    - my-audio/src/app/tab1/tab1.page.ts
    - updated providers in my-audio/app/app.module.ts

4. Run the following and this should work, otherwise for more information follow the ionic 5 mobile deployment docs: https://ionicframework.com/docs/react/your-first-app/6-deploying-mobile
```
ionic build
ionic cap copy
ionic cap sync
```

5. Go to the ios/android folder and edit the NativeAudio files
![see readme-images/audio-fix-ionic5.png if image not displaying](readme-images/audio-fix-ionic5.png)

Project: my-admob

1. Install the following
```
    npm install cordova-admob
    npm install @ionic-native/admob
    ionic cap sync
```

2. Then run npm list to install any missing dependencies manually

3. Take a look at the audio example: my-admob/src/app/tab1/tab1.page.ts

4. Run the following and this should work, otherwise for more information follow the ionic 5 mobile deployment docs: https://ionicframework.com/docs/react/your-first-app/6-deploying-mobile
```
ionic build
ionic cap copy
ionic cap sync
```
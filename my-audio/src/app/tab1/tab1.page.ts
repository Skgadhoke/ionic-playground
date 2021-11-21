import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

interface Sound {
	key: string;
	asset: string;
}


@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	private sounds: Sound[] = [];
	private audioPlayer: HTMLAudioElement = new Audio();
	private forceWebAudio = false;
	private isNative = false;

	constructor(private platform: Platform, private nativeAudio: NativeAudio) {
		platform.ready().then(() => {
			if (platform.is('cordova')) {
				this.isNative = true;
				this.preload('', '');
			}
		});
	}

	preload(key: string, asset: string): void {

		key = 'bass';
		//asset='assets/audio/bass.mp3';
		asset = 'assets/audio/file1.mp3';

		if (!this.sounds.filter((sound) => sound.key === key).length) {
			if (this.isNative && !this.forceWebAudio) {
				this.platform.ready()
					.then(() => this.nativeAudio.preloadSimple(key, asset));
				this.nativeAudio.preloadComplex(key, asset, 1, 1, 0);
				this.sounds.push({
					key: key,
					asset: asset
				});
			} else {
				const audio = new Audio();
				audio.src = asset;
				this.sounds.push({
					key: key,
					asset: asset
				});
			}
		}
	}

	playAudio(): boolean {
		let key = 'bass';
		const soundToPlay: Sound = this.sounds.find((sound) => sound.key === key);

		if (soundToPlay) {
			if (this.isNative) {
				this.platform.ready()
					.then(() => this.nativeAudio.loop(soundToPlay.key)
						.then((res) => console.log(res),
							(err) => console.log('play error', JSON.stringify(soundToPlay), err))
					);
			} else {
				this.audioPlayer.src = soundToPlay.asset;
				this.audioPlayer.play()
					.catch(() => { }); // ignore web player errors
			}
			return true;
		} else {
			return false;
		}
	}

	    //  this.nativeAudio.stop('uniqueId1').then(this.onSuccess, this.onError);
    //  this.nativeAudio.unload('uniqueId1').then(this.onSuccess, this.onError);	
	stopAudio(): boolean {
		let key = 'bass';
		const soundToPlay: Sound = this.sounds.find((sound) => sound.key === key);

		if (soundToPlay) {
			if (this.isNative) {
				this.platform.ready()
					.then(() => this.nativeAudio.stop(soundToPlay.key)
						.then((res) => console.log(res),
							(err) => console.log('play error', JSON.stringify(soundToPlay), err))
					);
			} else {
				this.audioPlayer.src = soundToPlay.asset;
				this.audioPlayer.play()
					.catch(() => { }); // ignore web player errors
			}
			return true;
		} else {
			return false;
		}
	}

	getSounds() {
		return this.sounds;
	}

}













// import { Component } from '@angular/core';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';

// @Component({
//   selector: 'app-tab1',
//   templateUrl: 'tab1.page.html',
//   styleUrls: ['tab1.page.scss']
// })
// export class Tab1Page {
//   constructor(private nativeAudio: NativeAudio) {
//     this.load();
//    }

//    onSuccess() {
//      console.log('success!!!');
//    }

//    onError() {
//      console.log('ERRORS :(')
//    }


//    load() {
//      //alert("loading");
//      this.nativeAudio.preloadSimple('bass', '../assets/audio/bass.mp3');
//      //.then(this.onSuccess, this.onError);
//      // this.nativeAudio.preloadComplex('uniqueId2', '../../assets/audio/file2.mp3', 1, 1, 0).then(this.onSuccess, this.onError);
//    }

//    playAudio () {
//      //alert("attempting to play audio");
//      //this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);

//      this.nativeAudio.loop('bass').then(() => {
//       console.log('Successfully played');
//       alert("loading");
//     }).catch((err) => {
//       alert(err);
//       console.log('error', err);
//     });


//      // can optionally pass a callback to be called when the file is done playing
//      // this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
//    }

//    stopAudio () {
//     alert("attempting to stop audio");
//      // this.nativeAudio.loop('uniqueId2').then(this.onSuccess, this.onError);

//      // this.nativeAudio.setVolumeForComplexAsset('uniqueId2', 0.6).then(this.onSuccess, this.onError);

//      this.nativeAudio.stop('uniqueId1').then(this.onSuccess, this.onError);

//      this.nativeAudio.unload('uniqueId1').then(this.onSuccess, this.onError);	
//    }
// }

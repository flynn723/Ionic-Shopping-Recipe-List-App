import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable ()
export class CameraService {

  lastImage: string = null;

  constructor( private camera: Camera, private alertCtrl: AlertController ) { }

  capturePicture( someModel: any ): Promise<any> {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      // saveToPhotoAlbum: ,
    }

    return new Promise( (resolve, reject) => {

      this.camera.getPicture(options).then( (imageData) => {

        resolve(imageData);

      }).catch( (imageError) => {

        this.camera.cleanup();
        console.error(imageError);
        this.presentAlert("Adding Picture Failed.");
        reject(false);

      });

    });

  }

  presentAlert( message: string ) {
    const alert = this.alertCtrl.create({
      title: message,
      message: message,
      buttons: ['Ok']
    });
    alert.present();    
  }

}

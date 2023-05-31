import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { GeralService } from 'src/services/geral.service';
import { Marcador } from '../interfaces/marcador.interface';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')mapRef!: ElementRef;
  map!: GoogleMap;
  private markers!: Marker[];

  constructor(private geralService: GeralService, private modalCtrl: ModalController) {}

  ionViewDidEnter() {
     this.geralService.getMarcadores().then(marcadores => {
      this.markers = marcadores;
      this.createMap();
     });
  }

  async createMap(){

    var myStyles =[
      {
          featureType: "poi",
          stylers: [
                { visibility: "off" }
          ]
      }]

  this.map = await GoogleMap.create({
    id: 'vaiPraOnde',
    apiKey: environment.mapsKey,
    element: this.mapRef.nativeElement,
    forceCreate: true,
    config: {
      width: 200,
      height: 200,
      center: {
        lat: -7.1027537,
        lng: -34.8359948,
      },
    zoom: 15,
    disableDefaultUI: true,
    styles: myStyles,
    }
  });
  await this.addMarkers();


  this.map.setOnMarkerClickListener(async (marker) => {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps:{
        marker,
      },
      breakpoints:[0,0.3],
      initialBreakpoint: 0.3,
    })
    modal.present();
  })
  }

  async addMarkers() {
     await this.map.addMarkers(this.markers)
  }

}

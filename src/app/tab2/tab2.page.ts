import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {Pengisian} from '../models/pengisian';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  jenisRanmor: string;
  volumePengisian: number;

  constructor(public toastController: ToastController) {}

  async simpanRecord() {
    console.log(this.jenisRanmor);
    console.log(this.volumePengisian);

    const dataBaru: Pengisian = {
      id: uuidv4(),
      ranmor: this.jenisRanmor,
      volume: this.volumePengisian,
      created: Date.now()
    };
    console.log(dataBaru);
    // ambil dulu data yang sudah tersimpan
    const dataSaatIni = await Storage.get({key: 'riwayat'});
    let arraySaatIni = JSON.parse(dataSaatIni.value) as unknown as Array<Pengisian> || [];
    // tambahkan data yg baru menjadi record paling atas
    arraySaatIni.unshift(dataBaru);
    // simpan ke storage
    await Storage.set({
      key: 'riwayat',
      value: JSON.stringify(arraySaatIni)
    });

    // tampilkan message bahwa berhasil disimpan
    const toast = await this.toastController.create({
      message: 'Done saving!',
      duration: 2000
    });
    await toast.present();

    console.log('Done saving!');
  }
}

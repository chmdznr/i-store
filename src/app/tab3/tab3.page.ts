import {Component, OnInit} from '@angular/core';
import { Storage } from '@capacitor/storage';
import {Pengisian} from '../models/pengisian';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  daftarRiwayatPengisian: Pengisian[];

  constructor() {}

  ionViewWillEnter() {
    console.log('on ionViewWillEnter');
    // load data dari database
    Storage.get({key: 'riwayat'}).then(data => {
      this.daftarRiwayatPengisian = JSON.parse(data.value) as unknown as Array<Pengisian> || [];
      console.log(this.daftarRiwayatPengisian);
    });
  }

  ngOnInit(): void {
    console.log('on init');
  }

  async deleteRecord(id: string) {
    this.daftarRiwayatPengisian = this.daftarRiwayatPengisian.filter(value => value.id !== id);
    await Storage.set({
      key: 'riwayat',
      value: JSON.stringify(this.daftarRiwayatPengisian)
    });
  }
}

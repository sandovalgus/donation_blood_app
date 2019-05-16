import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }



  ionViewCanEnter() {
    console.log('1 - Toc, Toc!!! ¿Puedo pasar? Se lanza antes de que la vista pueda entrar.');

  }



  ionViewWillEnter() {
    console.log('3 - Acabamos de entrar en la página.');
  }

  ionViewDidEnter() {
    console.log('4 - Página completamente cargada y activa.');
  }

  ionViewCanLeave() {
    console.log('5 - Toc, Toc!!! ¿Puedo salir? Se lanza antes de que la vista pueda salir.');
  }

  ionViewWillLeave() {
    console.log('6 - ¿Estás seguro que quieres dejar la página?.');
  }

  ionViewDidLeave() {
    console.log('7 - La página Home2 ha dejado de estar activa.');
  }

  ionViewWillUnload() {
    console.log('8 - Página y eventos destruidos (Este evento no debería saltar.).');
  }
}

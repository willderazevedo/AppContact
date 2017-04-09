import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

//Pages
import { ContactsPage } from '../contacts/contacts';
import { FilesModalPage } from '../files-modal/files-modal';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  file:string = "";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
  public alert: AlertController) {}

  public goToList() {
    return this.navCtrl.push(ContactsPage, {file: this.file});
  }

  public toggleModal() {
    let modal = this.modalCtrl.create(FilesModalPage);

    modal.present();
    modal.onDidDismiss((data) => {
      this.file = data;
    });
  }

}

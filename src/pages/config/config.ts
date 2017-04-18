import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

//Pages
import { ContactsPage } from '../contacts/contacts';
import { FilesModalPage } from '../files-modal/files-modal';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  /**
   * Caminho do arquivo
   * @var {string} file
   */
  file:string = "";

  /**
   * Construtor da classe de configuração onde serão instaciadas suas dependêcias
   * @param  {NavController}   navCtrl   Biblioteca que contém todas as informações da página atual como também suas ações.
   * @param  {ModalController} modalCtrl Biblioteca para controle de uma página secudária dentro da página atual.
   * @return {void}
   */
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  /**
   * Metódo responsável por fazer a transição da página de configuração para de listagem dos contatos do arquivo.
   * @return {void}
   */
  public goToList() {
    this.navCtrl.push(ContactsPage, {file: this.file});
  }

  /**
   * Método reponsável por criar a modal na página atual.
   * @return {void}
   */
  public toggleModal() {
    let modal = this.modalCtrl.create(FilesModalPage);

    modal.present();
    modal.onDidDismiss((data) => {
      this.file = data;
    });
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Pages
import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  url:string = "";

  constructor(public navCtrl: NavController) {}

  public goToList() {
    return this.navCtrl.push(ContactsPage, {url: this.url});
  }

}

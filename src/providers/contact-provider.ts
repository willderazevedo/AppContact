import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ContactProvider {

  constructor(public http: Http, public contacts: Contacts,
    public alertCtrl: AlertController, public loadCtrl: LoadingController) {}

  public getContacts(api_url) {
    return this.http.get(api_url).map(data => data.json());
  }

  public importContacts(contacts) {

    var status = 0;
    var load   = this.loadCtrl.create({
      content: "Cadastrando contatos... ",
      duration: 1500
    });

    setTimeout(() => {
      load.present();

      for(var i = 0; i < contacts.length; i++) {

        let contact          = this.contacts.create();
        contact.name         = new ContactName(null, contacts[i].nome);
        contact.phoneNumbers = [new ContactField('mobile', contacts[i].telefone)];

        contact.save()
        .then(() => status++)
        .catch(err => console.log(err));
      }

      load.dismiss();
      load.onDidDismiss(() => {
        this.alertCtrl.create({
          title: "Sucesso",
          subTitle: "Contatos cadastrados com sucesso!",
          buttons: ["Ok"]
        }).present();
      });
    }, 100);
    
  }

}

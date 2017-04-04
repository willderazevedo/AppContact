import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Contacts, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ContactProvider {

  success:boolean = false;

  constructor(public http: Http, public contacts: Contacts,
    public alertCtrl: AlertController, public loadCtrl: LoadingController) {}

  public getContacts(api_url) {
    return this.http.get(api_url).map(data => data.json());
  }

  public importContacts(contacts) {

    var load    = this.loadCtrl.create({
      content: "Cadastrando contatos... ",
    });

    load.present();

    setTimeout(() => {

      //Remove if alredy exists
      contacts = this.existingFilter(contacts);

      for(var i = 0; i < contacts.length; i++) {

        let contact          = this.contacts.create();
        contact.name         = new ContactName(null, contacts[i].nome);
        contact.phoneNumbers = [new ContactField('mobile', contacts[i].telefone)];

        contact.save()
        .then(() => console.log('Cadastrados com sucesso!'))
        .catch(err => console.log(err));
      }

      load.dismiss();
      this.alertCtrl.create({
        title: "Sucesso!",
        subTitle: "Contatos cadastrados com sucesso",
        buttons: ["Ok"]
      }).present();
    }, 1500);

  }

  private existingFilter(contacts) {

    for(var i = 0; i < contacts.length; i++) {
      var options = new ContactFindOptions();
      options.filter = contacts[i].nome;

      this.contacts.find(["name"], options).then((data) => {
        if(data.length > 0)
          contacts.splice(i);
      });
    }

    return contacts;
  }

}

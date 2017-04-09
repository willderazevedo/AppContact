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

  public getFileName(file_uri) {
    let file_name  = "";
    let break_path = file_uri.split('');

    for(var i = break_path.length - 1; i >= 0; i--) {
      if(break_path[i] == "/")
        break;

      file_name = break_path[i] + file_name;
    }

    return file_name;
  }

  public getFilePath(file_uri) {
    let file_path  = "";
    let break_path = file_uri.split('');

    for(var i = break_path.length - 1; i >= 0; i--) {
      if(break_path[i] == "/"){
        file_path = file_uri.substr(0, (i+1));
        break;
      }
    }

    return file_path;
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

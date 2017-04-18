import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//Providers
import { ContactProvider } from '../../providers/contact-provider';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  file_uri   = this.navParams.get('file');
  selectAll  = false;
  contacts   = [];
  import     = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadCtrl: LoadingController, public alertCtrl: AlertController,
  public provider: ContactProvider, public file: File) {
    this.readFile();
  }

  public readFile() {

    let load = this.loadCtrl.create({
      content: "Carregando contatos...",
    });

    load.present();

    setTimeout(() => {

      //Separate URIs parameters
      let file_name   = this.provider.getFileName(this.file_uri);
      let file_path   = this.provider.getFilePath(this.file_uri);

      //Instance contacts
      this.file.readAsText(file_path, file_name)
      .then(data => {
        this.contacts = JSON.parse(data);
        load.dismiss();
      }).catch(err => {
        load.dismiss();
        this.alertCtrl.create({
          title: "Atenção!",
          subTitle: "Erro na requisição dos contatos, arquivo inválido!",
          buttons: [
            {
              text: "Voltar",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      });
    }, 1500);
  }

  public addItem(element, contact) {
    //Remove item if already exists
    this.removeDoubleItem(contact);

    if(element.checked)
      this.import.push(contact);

  }

  private removeDoubleItem(contact) {
    for (var i = 0; i < this.import.length; i++) {
      if (this.import[i].nome === contact.nome){
        this.import.splice(i);
      }
    }
  }

  public importContacts(){
    this.provider.importContacts(this.import);
  }

  public navBarHelp() {
    return this.alertCtrl.create({
      title: "Tutorial",
      subTitle: "Olá, você pode apertar na primeira seta para voltar a escolha do arquivo e na " +
                "segunda seta, essa bem ao meu lado, para atualizar os contatos ou aperte na bolinha " +
                "vermelha para mais opções.",
      buttons:["Entendi"]
    }).present();
  }

  public fabHelp() {
    return this.alertCtrl.create({
      title: "Tutorial",
      subTitle: "Olá, aqui você poderá selecionar todos os contatos, basta apertar no botão da setinha " +
      "com o quadrado ou se quiser importar para os seus contatos basta apertar no botão das carinhas.",
      buttons:["Entendi"]
    }).present();
  }

}

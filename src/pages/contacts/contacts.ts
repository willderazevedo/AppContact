import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//Providers
import { ContactProvider } from '../../providers/contact-provider';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  api_url    = this.navParams.get('url');
  selectAll  = false;
  contacts   = [];
  import     = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadCtrl: LoadingController, public alertCtrl: AlertController,
  public provider: ContactProvider) {
    this.getContacts();
  }

  public getContacts() {

    let load = this.loadCtrl.create({
      content: "Carregando contatos...",
    });

    load.present();

    setTimeout(() => {

      this.provider.getContacts(this.api_url).subscribe(
        data => {
          this.contacts = data;
          load.dismiss();
        },
        err => {

          load.dismiss();

          let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Erro na requisição dos contatos, API inválida!",
            buttons: [
              {
                text: "Voltar",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          }).present();
        }
      );
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
      subTitle: "Olá, você pode apertar na primeira seta para voltar a escolha da API e na " +
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

import { Injectable } from '@angular/core';
import { Contacts, ContactField, ContactName, ContactFindOptions } from '@ionic-native/contacts';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class ContactProvider {

  /**
   * Construtor da classe onde será instanciada as classes importadas.
   * @param  {Contacts}          contacts  Biblioteca nativa para manipulação dos contatos no dispositivo.
   * @param  {AlertController}   alertCtrl Controlador de chamada de um alerta.
   * @param  {LoadingController} loadCtrl Controlador de chamada de um alerta do tipo carregamento.
   * @return {void}
   */
  constructor(public contacts: Contacts, public alertCtrl: AlertController,
    public loadCtrl: LoadingController) {}

  /**
   * Método responsável por separar o nome do arquivo do caminho do mesmo.
   * @param  {string} file_uri Caminho completo do arquivo juntamente com o nome.
   * @return {string}          Nome do arquivo como retorno.
   */
  public getFileName(file_uri: string) {
    let file_name  = "";
    let break_path = file_uri.split('');

    for(var i = break_path.length - 1; i >= 0; i--) {
      if(break_path[i] == "/")
        break;

      file_name = break_path[i] + file_name;
    }

    return file_name;
  }

  /**
   * Método responsável por separar o caminho do arquivo do nome.
   * @param  {string} file_uri Caminho completo do arquivo juntamente com o nome.
   * @return {string}          Caminho do arquivo como retorno
   */
  public getFilePath(file_uri: string) {
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

  /**
   * Método responsável por importar os contatos para a lista telefônica do aparelho.
   * @param  {any}    contacts Lista de contatos selecionados
   * @return {void}
   */
  public importContacts(contacts: any) {

    var msg  = "";
    var load = this.loadCtrl.create({
      content: "Cadastrando contatos... ",
    });

    load.present();

    //Remover contatos existentes
    contacts = this.existingFilter(contacts);

    for(let i = 0; i < contacts.length; i++) {

      let contact          = this.contacts.create();
      contact.name         = new ContactName(null, contacts[i].nome);
      contact.phoneNumbers = [new ContactField('mobile', contacts[i].telefone)];

      try{
        contact.save();
        msg = "Contatos cadastrados com sucesso.";
      }catch(err){
        msg = "Erro ao cadastrar contatos";
      }
    }

    load.dismiss();
    this.alertCtrl.create({
      title: "Resultado",
      message: msg,
      buttons: ["Ok"]
    }).present();
  }

  /**
   * Método responsável por retirar da lista contatos que ja existem no aparelho.
   * @param  {any}    contacts Lista de contatos a ser filtrada.
   * @return {any}          Retorno da nova lista após o filtro.
   */
  private existingFilter(contacts: any) {

    for(var i = 0; i < contacts.length; i++) {
      let options    = new ContactFindOptions();
      options.filter = contacts[i].nome;

      this.contacts.find(["name"], options).then((data) => {
        if(data.length > 0)
          contacts.splice(i);
      });
    }

    return contacts;
  }

}

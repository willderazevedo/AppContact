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

  /**
   * Camihno do arquivo
   * @var {string} file_uri
   */
  file_uri   = this.navParams.get('file');

  /**
   * Selecionar todos os contatos
   * @var {boolean} selectAll
   */
  selectAll  = false;

  /**
   * Lista de contatos encontrados na leitura do arquivo.
   * @var {array} contacts
   */
  contacts   = [];

  /**
   * Lista de contatos a serem importados.
   * @var {array} import
   */
  import     = [];

  /**
   * Construtor responsável por instaciar as dependências da classe de contato
   * @param  {NavController}     navCtrl   Biblioteca que contém todas as informações da página atual como também suas ações.
   * @param  {NavParams}         navParams Biblioteca que contém todos os parametros que foram passados para a página atual.
   * @param  {LoadingController} loadCtrl  Controlador de chamada de um alerta do tipo carregamento.
   * @param  {AlertController}   alertCtrl Controlador de chamada de um alerta.
   * @param  {ContactProvider}   provider  Classe fornecedora de serviço relacionados a importações do contato.
   * @param  {File}              file      Biblioteca nativa que manipula os arquivos e diretorios do aparelho.
   * @return {void}
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadCtrl: LoadingController, public alertCtrl: AlertController,
  public provider: ContactProvider, public file: File) {
    this.readFile();
  }

  /**
   * Método responsável pela a leitura do arquivo
   * @return {void}
   */
  public readFile() {

    let load = this.loadCtrl.create({
      content: "Carregando contatos...",
    });

    load.present();

    setTimeout(() => {

      //Serparar os parametros da URI
      let file_name   = this.provider.getFileName(this.file_uri);
      let file_path   = this.provider.getFilePath(this.file_uri);

      //Popular variável de contato
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

  /**
   * Método responsável por adicionar contato para importação.
   * @param  {any} element Descrição do elemento que foi selecionado.
   * @param  {any} contact Propriedades do contato selecionado.
   * @return {void}
   */
  public addItem(element: any, contact: any) {

    //Remover da importação caso já tenha sido selecionado
    this.removeDoubleItem(contact);

    if(element.checked)
      this.import.push(contact);

  }

  /**
   * Método responsável pela remoção do item da lista de importação.
   * @param  {any} contact Propriedades do contato selecionado
   * @return {void}
   */
  private removeDoubleItem(contact: any) {
    for (var i = 0; i < this.import.length; i++) {
      if (this.import[i].nome === contact.nome)
        this.import.splice(i);
    }
  }

  /**
   * Método responsável pela chamada da importação dos contatos.
   * @return {void}
   */
  public importContacts(){
    this.provider.importContacts(this.import);
  }

  /**
   * Método responsável pela chamada do alerta de ajuda da barra de navegação.
   * @return {void}
   */
  public navBarHelp() {
    this.alertCtrl.create({
      title: "Tutorial",
      subTitle: "Olá, você pode apertar na primeira seta para voltar a escolha do arquivo e na " +
                "segunda seta, essa bem ao meu lado, para atualizar os contatos ou aperte na bolinha " +
                "vermelha para mais opções.",
      buttons:["Entendi"]
    }).present();
  }

  /**
   * Método responsável pela chamada do alerta de ajuda do botão fab
   * @return {void}
   */
  public fabHelp() {
    this.alertCtrl.create({
      title: "Tutorial",
      subTitle: "Olá, aqui você poderá selecionar todos os contatos, basta apertar no botão da setinha " +
      "com o quadrado ou se quiser importar para os seus contatos basta apertar no botão das carinhas.",
      buttons:["Entendi"]
    }).present();
  }

}

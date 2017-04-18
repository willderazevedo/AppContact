import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

//Providers
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-files-modal',
  templateUrl: 'files-modal.html'
})
export class FilesModalPage {

  /**
   * Lista de diretórios e arquivos.
   * @var {array}
   */
  files_list  = [{name: "Carregando..."}];

  /**
   * Caminho padrão para listagem dos diretórios e arquivos.
   * @var {string}
   */
  storage_uri = "file:///storage/emulated/0/";

  /**
   * Construtor reponsável por instaciar as dependências da modal.
   * @param  {ViewController} viewCtrl Biblioteca nativa que contém as propriedades da pagina atual mas não seus headers ou cabeçarios.
   * @param  {File}           file     Biblioteca nativa responsável pela manipulação dos arquivos e diretórios do aparelho.
   * @return {void}
   */
  constructor(public viewCtrl: ViewController, public file: File) {
    this.listFiles();
  }

  /**
   * Método responsável por listar arquivos e diretórios do aparelho.
   * @param  {string} dirName Nome da pasta que que se deseja listar.
   * @return {void}
   */
  public listFiles(dirName: string = '') {
    this.file.listDir(this.storage_uri, dirName.substr(1, dirName.length))
    .then((files) => this.files_list = files)
    .catch(err => console.log(err));
  }

  /**
   * Método responsável por mandar a página principal a o caminho do arquivo selecionado.
   * @param  {string} file_uri Caminho do arquivo.
   * @return {void}
   */
  public pickFile(file_uri: string) {
    this.viewCtrl.dismiss(file_uri);
  }

  /**
   * Método responsável por dispensar modal.
   * @return {void}
   */
  public modalDismiss() {
    this.viewCtrl.dismiss();
  }

}

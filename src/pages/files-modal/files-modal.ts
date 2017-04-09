import { Component } from '@angular/core';
import { File } from '@ionic-native/file';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-files-modal',
  templateUrl: 'files-modal.html'
})
export class FilesModalPage {

  files_list  = [{name: "Carregando..."}];
  storage_uri = "file:///storage/emulated/0/";

  constructor(public viewCtrl: ViewController, public file: File,
    public params: NavParams) {
    this.listFiles();
  }

  public listFiles(dirName = '') {
    this.file.listDir(this.storage_uri, dirName.substr(1, dirName.length))
    .then((files) => this.files_list = files)
    .catch(err => console.log(err));
  }

  public pickFile(file_uri) {
    this.viewCtrl.dismiss(file_uri);
  }

  public modalDismiss() {
    this.viewCtrl.dismiss();
  }

}

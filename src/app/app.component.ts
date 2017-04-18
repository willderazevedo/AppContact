import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ConfigPage } from '../pages/config/config';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ConfigPage;

  /**
   * Construtor da classe principal da aplicação
   * @param  {Platform}     platform     Biblioteca nativa nela contém todas as informações da plataforma e suas ações.
   * @param  {StatusBar}    statusBar    Biblioteca nativa nela contém todas as configurações da barra do topo.
   * @param  {SplashScreen} splashScreen Biblioteca nativa responsável pela tela de splash ou tela de entrada.
   * @return {void}
   */
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.hideSplashScreen(splashScreen);
    });
  }

  /**
   * Método responsável por corrigir o erro da splash screen sumir antes do tempo
   * @param  {SplashScreen} splashScreen Biblioteca nativa responsável pela tela de splash ou tela de entrada.
   * @return {void}
   */
  private hideSplashScreen(splashScreen: SplashScreen) {
    setTimeout(() => {
      splashScreen.hide();
    }, 100);
  }
}

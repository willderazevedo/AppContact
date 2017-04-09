import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { File } from '@ionic-native/file';
import { ContactProvider } from '../providers/contact-provider';

//Pages
import { ConfigPage } from '../pages/config/config';
import { ContactsPage } from '../pages/contacts/contacts';
import { FilesModalPage } from '../pages/files-modal/files-modal';

@NgModule({
  declarations: [
    MyApp,
    ConfigPage,
    ContactsPage,
    FilesModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfigPage,
    ContactsPage,
    FilesModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    File,
    ContactProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

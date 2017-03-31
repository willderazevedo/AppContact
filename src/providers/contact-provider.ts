import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactProvider {

  constructor(public http: Http, public contacts: Contacts) {}

  public getContacts(api_url) {
    return this.http.get(api_url).map(data => data.json());
  }

  public importContacts(contacts) {
    console.log(contacts);
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Platform} from 'ionic-angular';

@Injectable()
export class NotificationsService {

  constructor(
              private angularFirestore: AngularFirestore,
              private platform: Platform) {}



  public saveToken(token) {
    if (!token) return;
    const devicesDatabaseReference = this.angularFirestore.collection('device-tokens');
    const data = {
      token,
      userId: 'user-'+new Date().toISOString(),
    };
    return devicesDatabaseReference.doc(token).set(data);
  }






}

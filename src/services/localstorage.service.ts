import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalstorageService {

  public USER_ID:string ='';

	constructor(private storage: Storage) {

	}


  setStorageUid(value_uid){
    this.storage.set('uid', value_uid);
  }
  getStorageUid(){
  return  this.storage.get('uid').then((val) => {
      console.log('Your uid is ', val);
      return val;
    });
  }

  removeStorageUid(){
    this.storage.set('uid', '');
  }

}

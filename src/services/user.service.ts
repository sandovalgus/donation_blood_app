import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


import {User} from '../interfaces/user';


@Injectable()
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore
              ) {
                this.userCollection = firestore.collection<User>('users');
              }

              getuser(id){
                return this.userCollection.doc<User>(id).valueChanges().pipe(
                  take(1),
                  map(user =>{
                    user.id = id;
                    return user
                })
                );
              }

              updateUser(user: User){
                return this.userCollection.doc(user.id).update(user);
              }

              addUser(user: User){
                return this.userCollection.doc(user.id).set(user);
              }



  // get() {
  //   return this.angularFireDataBase.list('users/');
  // }
  // getById(uid) {
  //   return this.angularFireDataBase.object('users/' + uid);
  // }
  // add(user: User) {
  //   return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  // }
  // edit(user: User) {
  //   return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  // }
}

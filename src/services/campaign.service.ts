
import { Injectable } from '@angular/core';
import {Campaign} from '../interfaces/campaign';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class CampaignService {
 private campaignCollection: AngularFirestoreCollection<Campaign>;
 private campaigns: Observable<Campaign[]>;
 private campaigns$: Observable<any[]>;


//  bloode_type$: BehaviorSubject<string|null>;
//  hospital_fk$: BehaviorSubject<string|null>;
startAt = new Subject();
endAt = new Subject();

  constructor(
                private firestore: AngularFirestore
              ) {
                this.campaignCollection = this.firestore.collection<Campaign>('campaigns');
            }


   getCampaigns(){

               console.log('welcome service');
                  this.campaignCollection = this.firestore.collection<Campaign>('campaigns');

                return  this.campaigns = this.campaignCollection.snapshotChanges().pipe(
                    map(actions =>{
                      return actions.map(a=>{
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {id, ...data};
                      });
                    })

                  );
            }

    getCampaign(id){
      this.campaignCollection = this.firestore.collection<Campaign>('campaigns');
      return this.campaignCollection.doc<Campaign>(id).valueChanges().pipe(
        take(1),
        map(camp =>{
          camp.id = id;
          return camp
      })
      );
    }

    getCampaignsLimits(limit){


          this.campaignCollection = this.firestore.collection<Campaign>('campaigns', ref=> ref.limit(limit));

        return  this.campaigns = this.campaignCollection.snapshotChanges().pipe(
            map(actions =>{
              return actions.map(a=>{
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
              });
            })

          );
    }

    updateCampaign(campaign: Campaign, id:string){
      return this.campaignCollection.doc(id).update(campaign);
    }

    addCampaign(campaign: Campaign){
      return this.campaignCollection.add(campaign);
    }

    removeCampaign(id){
      return this.campaignCollection.doc(id).delete();
    }

     campaignWhereId(id){
      this.campaignCollection = this.firestore.collection<Campaign>('campaigns',
                                                ref=> ref.where('user_fk', '==', id) && ref.orderBy('date', 'desc'));

      return  this.campaigns = this.campaignCollection.snapshotChanges().pipe(
        map(actions =>{
          return actions.map(a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })

      );
     }


     filterSearchCampaign(bloode_type, hospital_fk){
      console.log('blode type  ' + bloode_type + "hospital " + hospital_fk);
      if(bloode_type == 'all' && hospital_fk == 'all'){
        this.campaignCollection = this.firestore.collection<Campaign>('campaigns');
      }
      if(bloode_type == 'all' && hospital_fk != 'all'){
        this.campaignCollection = this.firestore.collection<Campaign>('campaigns',ref=>
        ref.orderBy('date')
        .where('hospital_fk', '==', hospital_fk)
              );

      }
      if(bloode_type != 'all' && hospital_fk == 'all'){
        this.campaignCollection = this.firestore.collection<Campaign>('campaigns',ref=>
        ref.orderBy('date')
        .where('bloode_type', '==', bloode_type)
              );

      }

      return  this.campaigns = this.campaignCollection.snapshotChanges().pipe(
          map(actions =>{
            return actions.map(a=>{
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id, ...data};
            });
          })

        );

}

}

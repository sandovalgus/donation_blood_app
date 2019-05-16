
import { Injectable } from '@angular/core';
import {Campaign} from '../interfaces/campaign';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable()
export class CampaignService {
 private campaignCollection: AngularFirestoreCollection<Campaign>;
 private campaigns: Observable<Campaign[]>;

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

}


import { Injectable } from '@angular/core';
import {DonationProcess } from '../interfaces/donationProcess';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Campaign} from '../interfaces/campaign';
import {CampaignService} from './campaign.service';

// import { async } from 'rxjs/internal/scheduler/async';
import  { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs';
import {flatMap, map, take} from 'rxjs/operators';
import 'rxjs/Rx';

@Injectable()
export class DonationProcessService {
 private donationProcessCollection: AngularFirestoreCollection<DonationProcess>;
 private donationProcess: Observable<DonationProcess[]>;


 campaigns: Observable<any[]>;

 colChallangeCollection: AngularFirestoreCollection<DonationProcess>;
 feedItem: Observable<Campaign[]>;

  constructor(
                private firestore: AngularFirestore,
                private campaignServ: CampaignService
              ) {
                this.donationProcessCollection = this.firestore.collection<DonationProcess>('donations-process');
            }



    addDonationProcess(donation: DonationProcess){
      return this.donationProcessCollection.add(donation);
    }

    getsMyDonations(userId){
      this.colChallangeCollection = this.firestore.collection('donations-process',ref=>
      ref.orderBy('date', 'desc')
      .where('user_id', '==', userId)
            );
      this.feedItem = this.colChallangeCollection.snapshotChanges().pipe(map(changes  => {
       return changes.map( change => {
         const donationProcess = change.payload.doc.data();
         const donationProcess_id = change.payload.doc.id;
         const signupId = donationProcess.campaign_id;
           return this.firestore.doc('campaigns/' + signupId).valueChanges().pipe(map( (campaign: Campaign) => {
             return Object.assign(
               {campaign, donationProcess,donationProcess_id }); }
           ));
       });
     }), flatMap(feeds => combineLatest(feeds)));
     return this.feedItem;
    }

    updateDonation(donation: DonationProcess, id:string){
      return this.donationProcessCollection.doc(id).update(donation);
    }

    donationProcessWhereUserId(user_id){
      console.log('user_uid service');
      console.log(user_id);
      this.donationProcessCollection = this.firestore.collection<DonationProcess>('donations-process',
                                                ref=> ref.where('user_id', '==', user_id));

      return  this.donationProcess = this.donationProcessCollection.snapshotChanges().pipe(
        map(actions =>{

         console.log(actions.length);
          return actions.map(a=>{

            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          }
          );

        })

      );
     }

     getDonationProcess(id){
      this.colChallangeCollection = this.firestore.collection<DonationProcess>('donations-process');
      return this.colChallangeCollection.doc<DonationProcess>(id).valueChanges().pipe(
        take(1),
        map(dp =>{
          dp.id = id;
          return dp
      })
      );
    }

    deleteDonationProcess(id){
      return this.donationProcessCollection.doc(id).delete();
    }

  }

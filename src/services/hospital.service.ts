
import { Injectable } from '@angular/core';
import {Hospital} from '../interfaces/hospital';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
  

@Injectable()
export class HospitalService {
 private hospitalCollection: AngularFirestoreCollection<Hospital>;
 private hospitals: Observable<Hospital[]>;

  constructor(
                private firestore: AngularFirestore 
              ) {

            }

  
   getHospitals(){

               console.log('welcome service');
                  this.hospitalCollection = this.firestore.collection<Hospital>('hospitals');

                return  this.hospitals = this.hospitalCollection.snapshotChanges().pipe(
                    map(actions =>{
                      return actions.map(a=>{
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {id, ...data};
                      });
                    })
                    
                  );
            }


    // getHospital(id){
    //   return this.hospitalCollection.doc<Hospital>(id).valueChanges();
    // }
    getHospital(id){
      this.hospitalCollection = this.firestore.collection<Hospital>('hospitals');
      return this.hospitalCollection.doc<Hospital>(id).valueChanges().pipe(
        take(1),
        map(hosp =>{
          hosp.id = id;
          return hosp
      })
      );
    }

    updateHospital(hospital: Hospital, id:string){
      return this.hospitalCollection.doc(id).update(hospital);
    }

    addHospital(hospital: Hospital){
      return this.hospitalCollection.add(hospital);
    }

    removeHospital(id){
      return this.hospitalCollection.doc(id).delete();
    }

            
  // create_NewStudent(record) {
  //   return this.firestore.collection('hospitals').add(record);
  // }

  // read_Students() {
  //   return this.firestore.collection<Hospital>('hospitals').snapshotChanges();
  // }
}

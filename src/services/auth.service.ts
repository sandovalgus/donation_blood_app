import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthService {
  private user: firebase.User;
  public USER_ID:string ='';

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(email, password) {
		console.log('Sign in with email');
		return this.afAuth.auth.createUserWithEmailAndPassword(email,password);

    }

    loginWithEmail(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        this.afAuth.auth.signOut();
			}
		getStatus() {

        return this.afAuth.authState;
			}
		getCurrent(){
			return this.afAuth.auth.currentUser.uid;
    }

    // loginGoogle(){
    //   this.google.login({
    //     'webClientId': '384341166286-8g21gibdu0enc94qek7ormc3u68c30na.apps.googleusercontent.com',
    //     'offline': true,
    //     'scopes': 'profile email'
    //   }).then(res=>{
    //     this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(res.idToken)).then(succes=>{
    //       console.log(succes);
    //     }).catch(err =>{
    //       console.log('error login google', err);
    //     })

    //   })


    // }

}

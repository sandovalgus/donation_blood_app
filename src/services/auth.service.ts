import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
	private user: firebase.User;

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

}
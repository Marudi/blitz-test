import { firebase } from '@nativescript/firebase-core';
import { Auth, createUserWithEmailAndPassword } from '@nativescript/firebase-auth';
import { Firestore, collection, doc, setDoc } from '@nativescript/firebase-firestore';

export class AuthService {
  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.auth = firebase().auth();
    this.firestore = firebase().firestore();
  }

  async signUp(email: string, password: string, hospitalData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.createHospitalProfile(userCredential.user.uid, hospitalData);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  private async createHospitalProfile(userId: string, hospitalData: any) {
    try {
      const hospitalRef = doc(collection(this.firestore, 'hospitals'), userId);
      await setDoc(hospitalRef, {
        ...hospitalData,
        createdAt: new Date(),
        subscriptionType: 'free',
        status: 'active'
      });
    } catch (error) {
      throw new Error(`Hospital profile creation failed: ${error.message}`);
    }
  }
}
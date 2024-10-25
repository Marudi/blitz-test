import { firebase } from '@nativescript/firebase-core';
import { Firestore, doc, updateDoc } from '@nativescript/firebase-firestore';

export class SubscriptionService {
  private firestore: Firestore;
  private subscriptionPlans = {
    free: {
      price: 0,
      features: ['Basic Hospital Management', 'Up to 5 staff accounts']
    },
    basic: {
      price: 99,
      features: ['All Free features', 'Pharmacy Management', 'Laboratory Management']
    },
    premium: {
      price: 199,
      features: ['All Basic features', 'Advanced Analytics', 'Drug Interaction System']
    },
    enterprise: {
      price: 499,
      features: ['All Premium features', 'Custom Modules', '24/7 Support']
    }
  };

  constructor() {
    this.firestore = firebase().firestore();
  }

  async updateSubscription(hospitalId: string, plan: string) {
    try {
      const hospitalRef = doc(this.firestore, 'hospitals', hospitalId);
      await updateDoc(hospitalRef, {
        subscriptionType: plan,
        updatedAt: new Date()
      });
    } catch (error) {
      throw new Error(`Subscription update failed: ${error.message}`);
    }
  }
}
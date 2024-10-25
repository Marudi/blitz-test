import { Http } from '@nativescript/core';

export class PaymentService {
  private stripeSecretKey: string;
  private paypalClientId: string;

  constructor() {
    this.stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY';
    this.paypalClientId = 'YOUR_PAYPAL_CLIENT_ID';
  }

  async processStripePayment(amount: number, currency: string, token: string) {
    try {
      const response = await Http.request({
        url: 'https://api.stripe.com/v1/payment_intents',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        content: `amount=${amount}&currency=${currency}&payment_method=${token}`
      });
      
      return response.content.toJSON();
    } catch (error) {
      throw new Error(`Stripe payment failed: ${error.message}`);
    }
  }

  async processPayPalPayment(amount: number, currency: string) {
    try {
      // Initialize PayPal payment flow using the PayPal REST API
      const response = await Http.request({
        url: 'https://api.paypal.com/v1/payments/payment',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.paypalClientId}`,
          'Content-Type': 'application/json'
        },
        content: JSON.stringify({
          intent: 'sale',
          payer: {
            payment_method: 'paypal'
          },
          transactions: [{
            amount: {
              total: amount.toString(),
              currency: currency
            }
          }]
        })
      });

      return response.content.toJSON();
    } catch (error) {
      throw new Error(`PayPal payment failed: ${error.message}`);
    }
  }
}
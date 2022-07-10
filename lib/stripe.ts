import {
    createCheckoutSession,
    getStripePayments
} from "@stripe/firestore-stripe-payments"
import { getFunctions, httpsCallable } from "@firebase/functions"
import app from "../lib/firebase"

const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers"
})

const loadCheckout =  async (priceId: string) => {
    await createCheckoutSession(payments, {
        price: priceId,
        success_url: window.location.origin, // uses actual domain/url of your app
        cancel_url: window.location.origin 
    }).then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

const gotToBillingPortal =async () => {
    const instance = getFunctions(app, 'us-central1')
    const functionRef = httpsCallable(instance, 'ext-firestore-stripe-payments-createPortalLink')

    await functionRef({
        returnUrl: `${window.location.origin}/account`,
    })
    .then(({data}: any) => window.location.assign(data.url))
    .catch(error => console.log(error.message))
}

export { loadCheckout, gotToBillingPortal }
export default payments
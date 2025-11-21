# How to Publish Exolorer & Set Up Payments

This guide explains how to deploy your app to the web and set up a payment account so you can start receiving money.

## 1. Deploying Your App (Making it Live)

To make your app accessible to everyone on the internet, we recommend using **Vercel** or **Netlify**. Both are free for starter projects and very reliable.

### Option A: Deploy with Vercel (Recommended)

1.  **Create a GitHub Account**: If you haven't already, go to [github.com](https://github.com) and sign up.
2.  **Push Your Code**: Upload your project code to a new GitHub repository.
3.  **Sign Up for Vercel**: Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
4.  **Import Project**:
    *   Click "Add New Project".
    *   Select your `exolorer-app` repository from the list.
    *   Vercel will automatically detect that it's a Vite/React app.
5.  **Deploy**: Click "Deploy".
    *   Vercel will build your app and give you a live URL (e.g., `exolorer-app.vercel.app`).
    *   You can share this link with anyone!

### Option B: Deploy with Netlify

1.  Go to [netlify.com](https://netlify.com) and sign up.
2.  Drag and drop your `dist` folder (created after running `npm run build`) into the Netlify dashboard.
3.  Alternatively, connect your GitHub account similar to Vercel for automatic updates.

---

## 2. Setting Up Payments (Receiving Money)

To receive payments from users (for Premium subscriptions, tickets, etc.) in Nigeria, **Paystack** is the industry standard.

### Step 1: Create a Paystack Account
1.  Go to [paystack.com](https://paystack.com) and click "Create free account".
2.  Select "Nigeria" as your country.
3.  Fill in your business name (e.g., "Exolorer Travel").
4.  **Compliance**: You will need to upload:
    *   CAC Documents (if registered business) OR Personal ID (if starting as an individual/starter business).
    *   Bank Account details (where you want the money to be sent).

### Step 2: Get Your API Keys
1.  Once your account is active, go to **Settings** > **API Keys & Webhooks**.
2.  You will see a **Public Key** and a **Secret Key**.
    *   **Public Key**: Used in the app code (safe to share).
    *   **Secret Key**: Keep this secret! Used on your server.

### Step 3: Connect Paystack to Exolorer
1.  Open your project code.
2.  In `src/components/PaymentModal.tsx`, we currently have a simulation.
3.  To make it real, install the Paystack library:
    ```bash
    npm install react-paystack
    ```
4.  Update the code to use your **Public Key**:
    ```javascript
    import { usePaystackPayment } from 'react-paystack';

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: 200000, // Amount in kobo (2000.00 NGN)
        publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxx', // Your Paystack Public Key
    };
    ```

---

## 3. Monetization Strategy

Once set up, here is how money will flow:

1.  **Premium Subscriptions**: Users pay N2,500/month to unlock offline maps and verified guides. This goes directly to your Paystack balance.
2.  **Event Tickets**: When users buy tickets, you can split the payment (take a commission) and send the rest to the event organizer using Paystack Splits.
3.  **Commissions**: For ride bookings, you can sign up for affiliate programs with Uber/Bolt (if available) or partner with local tour operators.

## 4. Support & Maintenance

*   **Emergency Numbers**: The app is pre-loaded with Lagos emergency lines (112, Police, LASTMA). Test these periodically.
*   **Updates**: Whenever you make changes to the code, just push to GitHub, and Vercel/Netlify will automatically update the live site.

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your actual key

const app = express();
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Donation',
                        },
                        unit_amount: 5000, // Amount in cents (e.g., $50.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://yourwebsite.com/success.html', // Replace with your URL
            cancel_url: 'https://yourwebsite.com/cancel.html',  // Replace with your URL
        });

        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));

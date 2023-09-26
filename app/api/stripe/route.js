import { dataset, projectId } from '@/sanity/env';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)


export async function POST(req, res) {
  if (req.method === 'POST') {
    const body = await req.json();
    const origin = req.headers.get('origin');
    console.log(origin)
    
    try {
        const session = await stripe.checkout.sessions.create ({
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1NuGZAGneUBojUFKnuBWX01D'},
                {shipping_rate: 'shr_1NuGbDGneUBojUFKnyLcjXFn'},
            ],
            line_items: body.map((item) => {
                console.log(item.image[0].asset)
                const img = `https://cdn.sanity.io/images/${projectId}/${dataset}/${item.image[0].asset._ref.replace("image-", "").replace("-webp", ".webp")}`;

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [img]
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },  
                    quantity: item.quantity
                }
            }),
            success_url: `${origin}/success`,
            cancel_url: `${origin}/canceled`,
          })

      // Create Checkout Sessions from body params.
      return NextResponse.json(session);
    } catch (err) {
        console.log(err)
    //    res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
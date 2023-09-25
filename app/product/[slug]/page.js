
import React from "react";


import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../../../sanity/env";
import { ProductDetail } from "@/components";

const ProductDetails = async (props) => {
  const data = await getData(props);


  return (
    <ProductDetail productData={data}/>
  );
};

export default ProductDetails;



export async function getData(props) {
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  });

  const query = groq`*[_type == "product" && slug.current == '${props.params.slug}'][0]`;
  const productsQuery = groq`*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    product,
    products,
  };
}



export async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.cartItems)
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1NuGZAGneUBojUFKnuBWX01D'},
                {shipping_rate: 'shr_1NuGbDGneUBojUFKnyLcjXFn'},
            ],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

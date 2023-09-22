
import React from "react";

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

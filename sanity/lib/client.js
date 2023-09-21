import { createClient, groq } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url'


import { apiVersion, dataset, projectId, useCdn } from "../env";


export async function getData() {
  "use server"
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  });


  const query = groq`*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = groq`*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
     products, bannerData ,
  };
  
}

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);




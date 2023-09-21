import React from "react";

import { getData } from "@/sanity/lib/client";

import { Product, FooterBanner, HeroBanner } from "@/components";

export default async function Home({products, bannerData}) {
  const data = await getData();
  return (
    <>
      <HeroBanner data={data} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers in different variations</p>
      </div>
      <div className="products-container">
        {data.products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
      <FooterBanner footerBanner={data.bannerData && data.bannerData[0]} />
    </>
  )
};





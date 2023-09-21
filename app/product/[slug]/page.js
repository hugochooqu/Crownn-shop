"use client";
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { createClient, groq } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../../../sanity/env";
import { Product } from "@/components";

const ProductDetails = async (props) => {
  const [index, setIndex] = useState(0);

  const data = await getData(props);
  console.log(data.product);

  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${data.product.image[
    index
  ].asset._ref
    .replace("image-", "")
    .replace("-webp", ".webp")}`;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={imageUrl} />
          </div>
          <div className="small-images-container">
            {data.product.image?.map((item, i) => (
              <img
                
                src={`https://cdn.sanity.io/images/${projectId}/${dataset}/${item.asset._ref
                  .replace("image-", "")
                  .replace("-webp", ".webp")}`}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
              />
              
            ))}
          </div>  
        </div>
        <div className="product-detail-desc">
          <h1>{data.product.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{data.product.details}</p>
          <p className="price">${data.product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart">
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {data.products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
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

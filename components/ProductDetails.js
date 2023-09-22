'use client'
import React, { useState } from 'react';

import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar,
  } from "react-icons/ai";

import {  dataset, projectId } from "../sanity/env";
import Product from './Product';


const ProductDetail = (productData) => {
    console.log(productData.productData.product)

 const [index, setIndex] = useState(0);


  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${productData.productData.product.image[index].asset._ref.replace("image-", "").replace("-webp", ".webp")}`;
     
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={imageUrl}  />
          </div>
          <div className="small-images-container">
            {productData.productData.product.image?.map((item, i) => (
              <img
                key={i}
                src={`https://cdn.sanity.io/images/${projectId}/${dataset}/${item.asset._ref.replace("image-", "").replace("-webp", ".webp")}`}
                className={ i === index ? "small-image selected-image" : "small-image"}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{productData.productData.product.name}</h1>
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
          <p>{productData.productData.product.details}</p>
          <p className="price">${productData.productData.product.price}</p>
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
            {productData.productData.products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
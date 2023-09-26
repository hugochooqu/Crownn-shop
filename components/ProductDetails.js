'use client'
import React, { useState, useContext } from 'react';
import { useStateContext } from '@/context/StateContext';

import {
    AiOutlineMinus,
    AiOutlinePlus,
    AiFillStar,
    AiOutlineStar,
  } from "react-icons/ai";

import {  dataset, projectId } from "../sanity/env";
import Product from './Product';


const ProductDetail = (productData) => {

    const product = productData.productData.product;
    // console.log(product)

 const [index, setIndex] = useState(0);
 const {decreaseQuantity, increaseQuantity, qty, onAdd} = useStateContext()

  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${product.image[index].asset._ref.replace("image-", "").replace("-webp", ".webp")}`;
     
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={imageUrl}  />
          </div>
          <div className="small-images-container">
            {product.image?.map((item, i) => (
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
          <h1>{product.name}</h1>
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
          <p>{product.details}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(productData, qty)}>
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
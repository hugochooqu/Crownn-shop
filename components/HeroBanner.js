import Link from 'next/link'
import React from 'react'

import { apiVersion, dataset, projectId, useCdn } from "../sanity/env";



const HeroBanner = (data) => {

 const heroBanner = data.data.bannerData[0];

 const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${(heroBanner.image.asset._ref).replace("image-","").replace("-webp", ".webp")}`
  return (
    
    
    
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={imageUrl} alt='headphones' className='hero-banner-image' /> 
        <div>
          <Link href={`/products/${heroBanner.product}`}>
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
        </div>
        <div className='desc'>
          <h5>DESCRIPTION</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
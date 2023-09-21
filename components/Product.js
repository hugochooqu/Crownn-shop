import React from 'react'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'

import { apiVersion, dataset, projectId, useCdn } from "../sanity/env";



const Product = ({product: {image, name, slug, price}}) => {
  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${(image[0].asset._ref).replace("image-","").replace("-webp", ".webp")}`

    return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
          src={imageUrl}
          width={250}
          height={250}
          className='product-image'

          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>

        </div>
      </Link>
    </div>
  )
}

export default Product
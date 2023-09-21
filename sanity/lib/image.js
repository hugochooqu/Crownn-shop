"use server"
import createImageUrlBuilder from '@sanity/image-url'


import { apiVersion, dataset, projectId, useCdn } from "../env";


const imageBuilder = createImageUrlBuilder({
  projectId,
  dataset,
  apiVersion,
  useCdn
})

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}


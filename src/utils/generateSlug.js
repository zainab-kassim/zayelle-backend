import { Product } from '../models/product.model.js'
import slugify from 'slugify'

async function generateUniqueSlug(name) {
    let slug = slugify(name, { lower: true, strict: true })
    let existingSlug = await Product.findOne({ slug })

    let count = 1
    while (existingSlug) {
        slug = `${slugify(name, { lower: true, strict: true })}-${count}`
        count++
    }
    return slug
}

export default generateUniqueSlug
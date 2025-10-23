import mongoose from "mongoose";
const { Schema } = mongoose;
import generateUniqueSlug from "../utils/generateSlug.js";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the name
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'must not be less that 0']
    },
    size: {
        type: [String],
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'must not be less than 0']
    },
    CollectionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })


ProductSchema.pre('save', async function (next) {
    if (!this.slug) {
        console.log('GENERATING SLUG FOR NEW PRODUCT...')
        this.slug = await generateUniqueSlug(this.name)
    }

    next()
})

export const Product = mongoose.model('Product', ProductSchema);
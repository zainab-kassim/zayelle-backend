import { Products } from "../models/product.model";


export const  GetProducts = ( async ( req,res)=>{
    const products = await Products.find()
     console.log(products)

})

export const GetProductsBySlug = (async (req,res)=>{
    const slug = req.body
    const product= await Products.findOne({slug})
    console.log(product)
})
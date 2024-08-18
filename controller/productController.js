import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs'
import  send  from "process";
import { error } from "console";
import { create } from "domain";
import { populate } from "dotenv";

export const  creatProductController = async (res,req) => {
    try{
        const {name,description, price,slug,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        

        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required' })

            case !description:
                return res.status(500).send({error:'Name is Required' })
            
            case !price:
                return res.status(500).send({error:'Name is Required' })


            case !category:
                return res.status(500).send({error:'Name is Required' })

            
            case !quantity:
                return res.status(500).send({error:'Name is Required' })
            
            case !slug:
                return res.status(500).send({error:'Name is Required' })
                

            case !shipping:
                return res.status(500).send({error:'Name is Required' })

            case !photo && photo.size > 1000000 :
                return res.status(500).send(
                     {error:'Name is Required' })

        }
        
        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product Created Successfully',
            products,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in crearing  Product '
        });
    }
};


export const getProductController = async(res,req) => {
    try{
       const products = await productModel
       .find({})
       .populate('category')
       .select("-photo")
       .limit(12)
       .sort({createdAt: -1});
       res.status(200).send({
        success:true,
        counTotal:products.length,
        message:"produts Liste",
        products,
       });

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,  
            message:'Bad Request', 
            error:error.message,
        })
    }

};


export const getSingleProductController = async (res,req) => {
    try{
        const product = await productModel.findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success:true,
            message:'Singel Product Fetched',
            product,
        });

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:'Invalid Product Id'
        });

    }

};


export const productPhotoController = async (res,req) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
             res.set('Content-type',product.photo.contentType);
             return res.status(200).send(product.photo.data);
        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:'Photo Not Found'
        });
    }

};


export const deleteProductController = async (res,req) => {
    try{
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Product Deleted Succesfully'
        });

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:'Deleted Failed'
        });
    }
};


export const  updateProductController = async (res,req) => {
    try{

        const {name,description, price,slug,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        

        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required' })

            case !description:
                return res.status(500).send({error:'Name is Required' })
            
            case !price:
                return res.status(500).send({error:'Name is Required' })


            case !category:
                return res.status(500).send({error:'Name is Required' })

            
            case !quantity:
                return res.status(500).send({error:'Name is Required' })
            

            case !shipping:
                return res.status(500).send({error:'Name is Required' })

            case !photo && photo.size > 1000000 :
                return res.status(500).send({error:'Name is Required' })

        }
        
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)},{new:true}
            );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product Update Successfully',
            products,
        });

    }catch(error){
        res.status(500).send({
            success:false,
            error,
            message:"Error in Update product"
        });
    }
};

export  const productFiltersController = async (req, res) => {
    try{
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length >0) args.category= checked;
        if(radio.length ) args.price = {$gte: radio[0], $let: radio[1]};
        const products = await productModel.find(args);
        res.status(400).send({
            success:false,
            products
          });

    }catch(error){
        res.status(400).send({
      success:false,
      error,
      message:'Error in filter Product'

    })
    }
    
};

export const productCountController = async (res,req) => {
    try{
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
            
        })
    }catch(error){
        console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error counting the number of product",
    })
    }
};

export const productListController = async (req,res) => {
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({})
        .select("-photo")
        .skip((page-1) * perPage)
        .limit(perPage)
        .limit({createdAt: -1});
        res.status(200).send({
            success:true,
            products
           
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in per page ctrl"
        })

    };
};

export const searchtController = async (req,res) => {
    try{
        const {keyword} = req.params;
        const results = await productModel.find({
            $or: [
                {name:{$regex:keyword,$options: "i"}},
                {description:{$regex:keyword,$options: "i"}},
            ],
        }).select("-photo");
        res.json(results);
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error Search to products'
        })
    }
};


export const relatedProductController = async  (req,res) =>{
    try{
        const {pid,cid} = req.params;
        const products = await productModel.find({
            category:cid,
            _id:{$:pid}
        })
        .select("-photo")
        .limit(3)
        .populate("category")
        res.setatus(200).send({
            success:true,
            products
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message : 'Error related products'
        });
    }
};


export const productCategoryController = async (req,res) => {
    try{
      const category = await categoryModel.findOne({slug:req.params.slug})
      const products = await productModel.find({category}).populate("category")
      res.status(200).send({
        success:true,
        products,
        category
      })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:'Error while Getting products'
        });
    }
};
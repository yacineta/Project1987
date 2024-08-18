import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const creatCategoryController = async  (req,res) => {
    try{
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is  required'})
        }
        const exisitingCategory = await categoryModel.findOne({name})
        if(exisitingCategory){
            return res.status(200).send({
                success:true,
                message:"This Category already existe"
            })
        }

        const category = await new  categoryModel({name,slug: slugify(name)}).save()
        res.status(201).send({
            success:true,
            message: 'The Category has been Created',
            category

        });
    } catch(error){
        console.log('Error',error);
        res.status(500).send({
            success:false,
            error,
            message:'Server Error'
        })
    }


};

export const updateCategoryController = async (req,res) =>{
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
            {new:true})
        res.status(200 ).send({
            success: true,
            message:'Category Updated Successfuly ',
            category,
        });

    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Server Error'
        })

    };

};
// categoryController
export const  getcategoryController  = async (req,res) =>{
   try{
    const category = await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:'Get All Category Successfuly',
        category,
    });

   } catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Iternal Server Error'
    })
   }
};


export const singleCategoryController = async (req,res) =>{
    try{
        // const {slug} = req.params
        const category = await getcategoryController.findOne({slug:req.params.slug})
        res.send(200).send({
            success:true,
            message:"Successfully Get Singel Category",
            category

        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Data Note Found',
        });
    }

};


export const deleteCategoryController = async (req,res) => {
    try{
        const {id} = req.params;
         await  categoryModel.findByIdAndDelete(id)
         res.status(204).send({
            success:true,
            message:'Deleted Successfully',
         });
        res.send({
            success:true,
            message:'Delete Successfully',
            category
        })

    }catch(error){
         console.log(error)
         res.status(500).send({
            success:false,
            error,
            message:'Server Interval Error!'
         });
    }
   
};
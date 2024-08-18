import userModel from "../models/userModel.js";
import { comparePassword,hashPassword } from "../helpers/authHelper.js";

import  JWT from "jsonwebtoken";


export const registerController  = async (req,res) =>{
    try {
        const {name,email,password,phone,address,answer} = req.body

        if(!name){
            return res.send({message:'server is required'})
        }
        if(!email){
            return res.send({message:'server is required'})
        }
        if(!password){
            return res.send({message:'server is required'})
        }
        if(!phone){
            return res.send({message:'server is required'})
        }
        if(!address){
            return res.send({message:'server is required'})
        }
        if(!answer){
            return res.send({message:'server is required'})
        }
        

        const exisitingUser = await userModel.findOne({email})
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message: 'Email already in usre'

            })

        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        answer})
            .save();

        res.status(201).send({
            success: true,
            message:"User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
             message:'Server Error',
             error
        })

    }

};

export  const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Please provied an Email and Passwor'
            });
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message:'User Not Found!'

            })
        }
        const match = await comparePassword(password,user.password);
        if (!match){
            return res.status(200).send({
                success:false,
                message:'Wrong Password'
            });
        }
         const token = await  JWT.sign({_id: user._id},process.env.JWT_SECRET,
            { expiresIn:'7d',}
            );
        //
        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                 _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,

        });

    } catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        })
    }

};

export const forgotPasswordController = async  (req,res) =>  {
    try{
        const {email,answer,newPassword} =  req.body;
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'Email is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'Email is required'})
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success: false,
                message:'Wrong Email Or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'Your Password has been changed Successfuly',
        });

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Server Error",
            error
        })
    }
};


export const testController = async(req,res) => {
    try{
         res.send("It works");
    }catch(error){
        console.log(error);
        res.send({error}); 
        
    }
  

};

export const updateProfileController = async (req,res) => {
    try{
        const {name,email,password,address,phone} = req.body;
        const user = await userModel.findById(req.user>_id)

        if(password && password.length < 6){
            return res.json({error: 'Password must  be at least 6 charchter long !'})

        }

        const hashedPassword = password ? await hashedPassword( password) :undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{y,
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,

        },{new:true})
    res.status(200).send({
        success:true,
        message:'Profile Updated Successfully',
        updatedUser
    })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Server Error',
        })
    }
}


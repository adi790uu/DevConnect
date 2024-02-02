import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const prisma:PrismaClient = new PrismaClient()
const jwtsecret = process.env.JWT_SECRET

const createuser = async(req:Request,res:Response)=>{
    try {
        const{username,password} = req.body

        if(!username || !password) {
            return res.status(400).json({message:"Creds not entered"})
        }
        const user = await prisma.user.findFirst({
            where:{username}
        })

        if(user) {
            return res.status(500).json({message:"User name already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                username,
                password:hashedPassword,
            }
        })

        if (!jwtsecret) {
            throw new Error('JWT secret not defined');
        }

        const token = jwt.sign({userId:newUser.id},jwtsecret,{expiresIn:'1d'})
        res.json({newUser,token})

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }finally{
        await prisma.$disconnect()
    }
}

const login = async(req:Request,res:Response)=>{
    try {
        const{username,password} = req.body;

        if(!username || !password) {
            return res.status(400).json({message:"Creds not entered"})
        }

        const user = await prisma.user.findFirst({
            where:{username}
        })

        if(!user) {
            return res.status(500).json({message:"User does not exist"})
        }

        const passwordMatched = await bcrypt.compare(password,user.password)
        if(!passwordMatched) {
            return res.status(500).json({message:"invalid creds"})
        }

        if (!jwtsecret) {
            throw new Error('JWT secret not defined');
          }
    
          const token = jwt.sign({ userId: user.id }, jwtsecret, { expiresIn: '1d' });
          
         console.log(token);
          res.json({user,token})

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }finally{
        await prisma.$disconnect()
    }
}

export = {
    createuser,
    login,
}
import {Request , Response, NextFunction } from "express";

import { ZodError  } from "zod";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



export default function errorHandler(error : any,req : Request,res: Response,next: NextFunction){

   if(error.message === "grocery item not found"){

      return res.status(404).json({status : "failed", message : "grocery item not found" })
   }

   if (error instanceof ZodError){

      const errors  = error.errors;


      const results = [...errors].map(
        (error) => {
            
            return {message : error.message}
        
        }
      )


      return res.status(422).send({status: "failed" ,errors : results})

      
   }

   if (error instanceof PrismaClientKnownRequestError){

        if(error.code === "P2002")
        {
            const target : any = error.meta?.target;

            return res.status(400).send({status: "failed", message: `The ${target.split("_")[1]} field value already exists and cannot be duplicated`})
        }

   }
         
    return res.status(500).send({status: "failed" ,message: "Something went wrong, please try again later"})
} 
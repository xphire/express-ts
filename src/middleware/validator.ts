import {Request, Response , NextFunction} from "express";

import { AnyZodObject} from "zod";

import { createGrocerySchemaInput } from "../schema/creategrocery.schema";

import { fetchItemByPropertyInput } from "../schema/fetchItemByProperty.schema";


import { fullUpdateGrocerySchemaInput } from "../schema/fullUpdateGroceryItem.schema";


import { fetchAllGroceryItemInput } from "../schema/fetchAllGroceryItem.schema";


export function validateCreationRequest (schema: AnyZodObject) {

     const validator = (req: Request<{},{},createGrocerySchemaInput>,res : Response,next : NextFunction) => {


        try {

            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );


            next();

            
            
        } catch (error) {


            next(error);




           // res.status(400).send({errors : error.errors})
            
        }

       
     }


     return validator;

}


export function validateFetchItemByProperty (schema : AnyZodObject){

      
    const validator = (req: Request<fetchItemByPropertyInput,{},{}>,res : Response,next : NextFunction) => {



        try {


            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );

            next();

            
        } catch (error) {

            next(error)
            
        }


    };


    return validator

}


export function validateFetchAllGroceryItem (schema : AnyZodObject){

      
    const validator = (req: Request<fetchAllGroceryItemInput,{},{}> ,res : Response,next : NextFunction) => {


        try {


            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );

            next();

            
        } catch (error) {

            next(error)
            
        }


    };


    return validator

}


export function validateFullUpdateItem (schema : AnyZodObject){


    const validator = (req: Request,res : Response,next : NextFunction) => {



        try {


            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );

            next();

            
        } catch (error) {

            next(error)
            
        }


    };


    return validator


}


export function validatePartialUpdateItem(schema : AnyZodObject){


    const validator = (req: Request,res : Response,next : NextFunction) => {



        try {


            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );

            next();

            
        } catch (error) {

            next(error)
            
        }


    };


    return validator


}



export function validateDeleteItem(schema : AnyZodObject){


    const validator = (req: Request,res : Response,next : NextFunction) => {



        try {


            schema.parse(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params
                }
            );

            next();

            
        } catch (error) {

            next(error)
            
        }


    };


    return validator


}





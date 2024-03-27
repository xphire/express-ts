import { Request, Response , NextFunction } from "express";
import { createGroceryItemService, fetchAllGroceryItemService , fetchItemByPropertyAndValueService , fullUpdateGroceryItemService , deleteGroceryItemService } from "../services/service";
import { Grocery } from "@prisma/client";
import renderSuccess from "../middleware/rendersuccess";


export async function createGroceryItemController(req : Request, res:Response , next: NextFunction){

    try {

       const grocery =  await createGroceryItemService(req.body);

      return renderSuccess(grocery)(req,res,next)
        
    } catch (e:any) {

        console.log(e)
        next(e)
        
    }


}


export async function fetchAllGroceryItemsController(req : Request, res:Response , next: NextFunction){

    try {

        const page = req.query.page;

        const perPage = req.query.perPage;

        const property : any = req.query.property

        const value : any = String(req.query.value).toLowerCase() === "true" ? true : String(req.query.value).toLowerCase() === "false" ? false : req.query.value

        if(perPage && page){

           const groceries =  await fetchAllGroceryItemService(parseInt(`${perPage}`),parseInt(`${page}`),property, value);


           return  renderSuccess(groceries)(req, res, next)


       }

       const groceries =  await fetchAllGroceryItemService();

       return renderSuccess(groceries)(req,res,next)

        
    } catch (e:any) {

        console.log(e)
        next(e)
        
    }


}

export async function fetchItemByPropertyAndValueController(req : Request, res:Response, next: NextFunction){

    try {


        let grocery : Grocery | null

        
        const {property, value} = req.params;

        grocery = await fetchItemByPropertyAndValueService(property,value);


        if (grocery === null || grocery === undefined){

            throw Error("grocery item not found");
        }

        return renderSuccess(grocery)(req,res,next)

        
    } catch (e: any) {

        console.log(e)
        next(e)
        
    }


}



export async function fullUpdateGroceryItemController(req : Request, res:Response, next: NextFunction){

    try {


        const id = req.params.id;

        const data = req.body;

        const update = await fullUpdateGroceryItemService(id, data);

        return renderSuccess(update)(req,res,next)


        
    } catch (e: any) {

        console.log(e)
        next(e)
        
    }


}



export async function deleteGroceryItemController(req : Request , res : Response , next: NextFunction){


    try {

        const id = req.params.id;

        const del = await deleteGroceryItemService(id);

        return renderSuccess(del)(req,res,next)

        
    } catch (e : any) {


        console.log(e) 
        next(e)
    }

}


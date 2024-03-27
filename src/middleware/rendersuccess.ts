import { Request, Response , NextFunction } from "express"

export default function renderSuccess (data : any){


  return function (req:Request, res: Response, next: NextFunction){

     

        if(req.path.includes("groceries")){
    
            return res.status(200).send({
    
               status : "success",
               data : data.data,
               meta : data.meta
            })
        }
    
        return res.status(req.method === "POST" ? 201 : req.method === "DELETE" ? 200 : 200).send({
    
            status : "success",
            data :  data
    
        })
    }




}







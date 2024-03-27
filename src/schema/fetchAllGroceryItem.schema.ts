import {object , TypeOf, z} from 'zod';


export const fetchAllGroceryItemSchema = object(

    {
        query: object({


               page : z.string().optional(),
               perPage : z.string().optional(),
               property : z.string().optional().refine(

                 (value) =>  {

                     if (value === undefined){return true}

                    return ["name","category","available"].includes(value as string)
                 }, {

                    message : `included properties are name, available and category (case-insensitive)`
                 }
               ),
               direction : z.enum(["asc","desc"]).optional()

               
            }
        ).refine(
            (obj) => {


                if (obj.perPage === undefined){

                    return true
                }
            
                //convert request string values to number to base 10 number

                if(Number.isNaN(parseInt(obj.page as string,10)) || Number.isNaN(parseInt(obj.perPage as string,10))){

                    return false
                }


                return true;

                

            },{

                message : "The perPage and page values must be numbers"
            }
        )
        
    })



export type fetchAllGroceryItemInput = TypeOf<typeof fetchAllGroceryItemSchema>["query"]
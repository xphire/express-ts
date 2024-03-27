import {object , string , number, TypeOf, boolean, z} from 'zod';


export const partialUpdateGrocerySchema = object(

    {
        body: object({
            name: string(
                {
                    invalid_type_error: "The name value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).optional(),
            available: boolean(
                {
                    invalid_type_error: "The name value must be a string",
                    description: "This signifies the availability of the item in the store"
                }
            ).optional(),
            price: number (
                {
                    invalid_type_error: "The value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).positive({
                message: "The price field must be greater than zero"

            }).multipleOf(0.5,"The price field value must be divisible by 0.5").optional(),
            category: z.enum([ "Beverages","Alcoholics","Toiletries","Laundry"]).optional(),
            quantity: number (
                {
                    invalid_type_error: "The value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).positive({

                message: "The price field must be greater than zero"

            }).int({
                message: "The quantity field must be a whole number"
            }).optional(),
            slug: string(
                {
                    invalid_type_error: "The slug value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).optional(),
            code: z.string().cuid("code field must be a valid cuid").optional()

        }).refine((body : object) => {

             
            return Object.keys(body).length >= 1 


        },{

               message : "The request body must contain at least one property to be updated"
        }),

        params : object(
            {
                id :   z.string({

                    coerce: true
        
                }).length(24,"id param must be at least of length 24"),
            }

        


        ) 
       
    }
);


export type partialUpdateGrocerySchemaInput = TypeOf<typeof partialUpdateGrocerySchema>
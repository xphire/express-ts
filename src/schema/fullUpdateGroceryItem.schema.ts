import {object , string , number, TypeOf, boolean, z} from 'zod';


export const fullUpdateGrocerySchema = object(

    {
        body: object({
            name: string(
                {
                    required_error: "The name field is required",
                    invalid_type_error: "The name value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ),
            available: boolean(
                {
                    required_error: "The available field is required",
                    invalid_type_error: "The name value must be a string",
                    description: "This signifies the availability of the item in the store"
                }
            ),
            price: number (
                {
                    required_error: "The price field is required",
                    invalid_type_error: "The value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).positive({
                message: "The price field must be greater than zero"

            }).multipleOf(0.5,"The price field value must be divisible by 0.5"),
            category: z.enum([ "Beverages","Alcoholics","Toiletries","Laundry"], {

                required_error : "The category field is required",
            }),
            quantity: number (
                {
                    required_error: "The quantity field is required",
                    invalid_type_error: "The value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).positive({

                message: "The price field must be greater than zero"

            }).int({
                message: "The quantity field must be a whole number"
            }),
            slug: string(
                {
                    required_error: "The slug field is required",
                    invalid_type_error: "The slug value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ),
            code: z.string({
                required_error: "The code field is required",
            }).cuid("code field must be a valid cuid")

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


export type fullUpdateGrocerySchemaInput = TypeOf<typeof fullUpdateGrocerySchema>

export type deleteGroceryItemSchemaInput = TypeOf<typeof fullUpdateGrocerySchema>["params"]

export const deleteGroceryItemSchema = object({

    params : fullUpdateGrocerySchema.shape.params
})
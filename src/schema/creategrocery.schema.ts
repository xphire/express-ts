import {object , string , number, TypeOf, boolean, z} from 'zod';

export const createGrocerySchema = object(

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
                    invalid_type_error: "The name value must be a string",
                    description: "This signifies the availability of the item in the store"
                }
            ).optional(),
            price: number (
                {
                    required_error: "The price field is required",
                    invalid_type_error: "The value must be a string",
                    description: "This is the name of the grocery item being saved"
                }
            ).positive({

                message: "The price field must be greater than zero"

            }).multipleOf(0.5,"The price field value must be divisible by 0.5"),
            category: z.enum([ "Beverages","Alcoholics","Toiletries","Laundry"]),
            quantity: number (
                {
                    required_error: "The price field is required",
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
            )

        })
       
    }
);


export type createGrocerySchemaInput = TypeOf<typeof createGrocerySchema>["body"]
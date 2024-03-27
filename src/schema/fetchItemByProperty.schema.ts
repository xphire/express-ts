import {object , TypeOf, z} from 'zod';


type properties = "name" | "slug" | "id" | "code";


export const fetchItemByPropertySchema = object(

    {
        params: object({

            property: z.string({

                coerce : true

            }).toLowerCase().refine(
                (value) => {

                   // const refinement = value.toLowerCase();

                    return ["name", "slug" , "id" , "code"].includes(value)
                },
                {
                    message: "property can only be name, id, code or slug (case-insensitive)"
                }
            ),
            value : z.string({
                coerce: true
            })
        })
        
    })



export type fetchItemByPropertyInput = TypeOf<typeof fetchItemByPropertySchema>["params"]
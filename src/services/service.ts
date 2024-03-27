//Services are methods we use to call the database

import { Grocery, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(
    {errorFormat: 'pretty'}
)


export async function createGroceryItemService(item : Grocery){

    try{

        const grocery = await prisma.grocery.create({
            data : {
                ...item
            }
        });

        return grocery;

    }catch(e:any){

        throw e;

    }
}


type Query = {

      skip : number,
      take : number,
      where ? : object,
      orderBy ? : object
}


type direction = "asc" | "desc";



export async function fetchAllGroceryItemService(perPage: number = 50,page: number = 1, property? : any , value ?  : number | string | boolean, direction : direction = "desc"){


       const toSkip : number =  perPage * (page - 1);

       let query : Query;

       if (property === undefined){

          query = {

            skip: toSkip,
            take : perPage

          };
       }else{


          query = {

            skip: toSkip,
            take : perPage,
            where : {
                [property] : {
                    
                    equals : value
             }
            } ,
            orderBy : {
                [property] : direction
            }
        }
           

       }



    try{

        const groceries = await prisma.grocery.findMany(query)

        return {

            data : groceries,
            meta : {

                per_page : perPage,
                page : page

            }
            
        }
        
        //groceries;

    }catch(e:any){

        throw e;

    }


}



export async function fetchItemByPropertyAndValueService(property : string, value : string){

    try {

        const grocery   = await prisma.grocery.findFirst({


            where: {

                [property.toLowerCase()] : {

                    equals : value
                }
            }

            
        });


        return grocery;
        
    } catch (e:any) {

        throw e
        
    }


}


export async function fullUpdateGroceryItemService(id : string, data: Omit<Grocery, "id" | "createdAt">){


    try {

        const updateGrocery = await prisma.grocery.update({

            where: {
                id : id
            },
            data : {
               
                ...data

            }

        });


        return updateGrocery;
        
    } catch (e: any) {

        throw e
        
    }


}

export async function deleteGroceryItemService(id : string){


    try {

        const item = await prisma.grocery.delete({

            where : {

                id : id
            }
        })

        return item;
        
    } catch (error : any) {

        throw error
        
    }
}




import { PrismaClient } from "@prisma/client";

import { faker } from '@faker-js/faker'

import process from "process";

const records = parseInt(process.argv[2])

const prisma = new PrismaClient()

type FakeRecord ={

    name : string,
    available : boolean,
    price : number,
    category : "Beverages" | "Alcoholics" | "Toiletries" | "Laundry",
    quantity: number,
    slug: string
}


async function seed(recordCount: number){

    const count = recordCount;

    const data : FakeRecord[] = [];

    for(let i = 0; i < count ; i++){

        data.push(genRecord());
    };

    try {

          const createMany = await prisma.grocery.createMany(
            {
                data : [...data]
            }
        );

        console.log(`${createMany.count} records successfully seeded to the database`)

        return; 
        
    } catch (error) {

        console.error(error)

        return;
        
    }


};


seed(records);


function genRecord() : FakeRecord{


    const product : string = faker.commerce.product();

    return {

        name: product,
        available: faker.datatype.boolean(),
        price: faker.number.float({ multipleOf: 0.5, min: 0, max:1000 }),
        category: faker.helpers.arrayElement(["Beverages", "Alcoholics" ,"Toiletries" , "Laundry"]),
        quantity: faker.number.int({ min: 10, max: 1000 }),
        slug: slugger(product)
    }


}

function slugger(slug: string) : string{

    return  slug + "-" +  faker.string.alpha({casing : 'lower',length : {min : 5 , max : 10}});
}
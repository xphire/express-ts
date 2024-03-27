import request from "supertest";

//import { Response } from "supertest";

import app from "../app";

import { faker } from "@faker-js/faker";


describe("Testing the test route @ /", () => {

    test("GET /", (done) => {

        request(app)
        .get("/")
        .expect(200)
        .expect("we are the world")
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })

    })

})



describe("Testing the api/v1/groceries endpoint", () => {

    it("should return 50 grocery items", async () => {
         
            expect.assertions(4);
    
            const response = await request(app).get("/api/v1/groceries");

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("status","success");
            expect(response.body.meta).toHaveProperty("per_page")
            expect(response.body.data).toHaveLength(50); 

    })

})



describe("Testing the api/v1/grocery/:property/:value endpoint", () => {

    it("should return a grocery item with id, createdAt, code, name, slug etc properties in response.body.data ", async () => {
         

        expect.assertions(3);

       const response = await request(app).get("/api/v1/grocery/ID/65f218ce2efd10f083ddf8bf");

       expect(response.status).toBe(200);
       expect(response.body.data).toHaveProperty("id", "65f218ce2efd10f083ddf8bf")
       expect(response.body).toHaveProperty("status","success");

    })

})



describe("Testing the POST api/v1/grocery endpoint", () => {

    it("should return a grocery item with id, createdAt, code, name, slug etc properties in response.body.data ", async () => {
         

        expect.assertions(3);

        const item = {

            "name" : faker.commerce.productName(),
            "available" : true,
            "price" : faker.number.int({min : 100 , max : 500}),
            "category" : faker.helpers.arrayElement(["Beverages", "Alcoholics" ,"Toiletries" , "Laundry"]),
            "quantity" : faker.number.int({min : 5 , max : 300}),
             get slug() {
                return this.name.toLowerCase(); 
            },
           
            }

       const response = await request(app).post("/api/v1/grocery").send(item);

       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty("status","success");
       expect(response.body).toHaveProperty("data");

    })

})



describe("Testing the PUT api/v1/grocery/:id endpoint", () => {

    it("should return a grocery item with id, createdAt, code, name, slug etc properties in response.body.data ", async () => {
         

        expect.assertions(4);


        const item = {

        "name" : "Lambadia",
        "available" : true,
        "price" : 700,
        "category" : "Beverages",
        "quantity" : 850,
        "slug" : "cookies",
        "code" : "clu37pk000000356n6hnlxz70"
        }

       const response = await request(app).put("/api/v1/grocery/65f218ce2efd10f083ddf8bf")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")
       .send(item);


       expect(response.statusCode).toBe(200);
       expect(response.body.data).toHaveProperty("id", "65f218ce2efd10f083ddf8bf");
       expect(response.body.data).toHaveProperty("name", item.name);
       expect(response.body).toHaveProperty("status","success");

    })

})



describe("Testing the error handler function 1", () => {

    it("should return 404 if item is not found", async () => {

        expect.assertions(3);


        const response = await request(app).get("/api/v1/grocery/id/65f218ce2efd10f083ddf8bd")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")


       expect(response.statusCode).toBe(404);
       expect(response.body).toHaveProperty("message", "grocery item not found");
       expect(response.body).toHaveProperty("status","failed");


    })
})


describe("Testing the error handler function 2", () => {

    it("should return 422 for a Zod Error instance", async () => {

        expect.assertions(3);


        const item = {

            "available" : true,
            "price" : 700,
            "category" : "Beverages",
            "quantity" : 850,
            "slug" : "cookies",
            "code" : "clu37pk000000356n6hnlxz70"

            };


        const response = await request(app).put("/api/v1/grocery/65f218ce2efd10f083ddf8bf")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")
       .send(item);


       expect(response.statusCode).toBe(422);
       expect(response.body).toHaveProperty("errors");
       expect(response.body).toHaveProperty("status","failed");


    })
})



describe("Testing the error handler function 3", () => {

    it("should return 400 if there is a unique constraint violation", async () => {

        expect.assertions(3);


        const item = {
             
            "name" : "Lemonade",
            "available" : true,
            "price" : 700,
            "category" : "Beverages",
            "quantity" : 850,
            "slug" : "cookies",
            "code" : "cltqb9w5j000913t56x8jtjxg"

            };


        const response = await request(app).put("/api/v1/grocery/65f218ce2efd10f083ddf8bf")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")
       .send(item);


       expect(response.statusCode).toBe(400);
       expect(response.body).toHaveProperty("message");
       expect(response.body).toHaveProperty("status","failed");


    })
})


describe("Testing the error handler function 4", () => {

    it("should return 500 if no other error is matched", async () => {

        expect.assertions(3);


        const response = await request(app).get("/api/v1/grocery/id/65f218ce2efd10f083ddf8b")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")



       expect(response.statusCode).toBe(500);
       expect(response.body).toHaveProperty("message");
       expect(response.body).toHaveProperty("status","failed");


    })
})


describe("Testing the error handler function 5", () => {

    it("should return 400 when there is an instance of PrismaClientKnownRequestError", async () => {

        expect.assertions(3);



        const res    =    (await request(app).get("/api/v1/grocery/id/65f218ce2efd10f083ddf8b"));


        const response = await request(app).get("/api/v1/grocery/id/65f218ce2efd10f083ddf8b")
       .set("Content-Type", "application/json")
       .set("Accept", "application/json")
    



       expect(response.statusCode).toBe(500);
       expect(response.body).toHaveProperty("message");
       expect(response.body).toHaveProperty("status","failed");


    })
})
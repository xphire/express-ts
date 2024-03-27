import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Number } from "mongoose";

import { nanoid } from "nanoid";


function createProductCode() : string{

    return nanoid();
}



@modelOptions({
    schemaOptions : {
        timestamps: true
    }
})



export class Grocery{

    @prop({required: true, unique: true})
    name: string;

    @prop({required: false, default: false})
    available: Boolean;

    @prop({required: true})
    price: Number;

    @prop({required: true, enum:["Beverages","Chocolates","Dairy","Alcoholic Drinks","Soft Drinks", "Energy Drinks"]})
    category: string;

    @prop({required: false , default : createProductCode()})
    productCode: string

    @prop({required: true})
    quantity: Number;


}

const GroceryModel = getModelForClass(Grocery)

export default GroceryModel;
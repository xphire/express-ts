require('dotenv').config();

import helmet from "helmet";

import express, {Request,Response, NextFunction, urlencoded} from "express"

import router from './router/router';

import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(urlencoded({extended: true}));

app.use(express.json());

app.use(helmet());

app.use(helmet.hidePoweredBy())


 app.get("/",(req : Request, res : Response) => {

     res.send("we are the world")
 })

app.use("/api/v1",router);

app.use(errorHandler);

export default app;




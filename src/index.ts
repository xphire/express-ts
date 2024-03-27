import app from "./app";

import dbConnect from "./database/connect";

import config from "config";

const PORT = config.get("port");


app.listen(PORT, async () => {

    await dbConnect();

    console.log(`App is listening heavily on PORT : ${PORT}`);

    
});



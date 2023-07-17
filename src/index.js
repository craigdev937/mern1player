import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { ERR } from "./middleware/midError.js";
import { playRt } from "./routes/playRt.js";

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB is now Connected!"))
        .catch((error) => console.log(error));

    const app = express();
    app.use(helmet());
    app.get("/favico.ico", (req, res) => {
        res.sendStatus(404);
    });

    // CORS
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({"status message": "OK"});
        };
        next();
    });

    // Cloudinary Connection
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(logger("dev"));
    app.use("/", playRt);
    app.use(ERR.errorHandler);
    app.use(ERR.notFound);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();




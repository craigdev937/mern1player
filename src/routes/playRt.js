import express from "express";
import { PLAYER } from "../controllers/playCon.js";
import { upload } from "../middleware/Multer.js";

export const playRt = express.Router();
    playRt.post("/", upload.single("image"), PLAYER.Create);
    playRt.get("/", PLAYER.FetchAll);



    
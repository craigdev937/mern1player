import express from "express";
import { PLAYER } from "../controllers/playCon.js";
import { upload } from "../middleware/Multer.js";

export const playRt = express.Router();
    playRt.post("/", upload.single("image"), PLAYER.Create);
    playRt.get("/", PLAYER.FetchAll);
    playRt.get("/:id", PLAYER.GetOne);
    playRt.put("/:id", upload.single("image"), PLAYER.Update);
    playRt.delete("/:id", PLAYER.Delete);



    
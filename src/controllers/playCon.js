import { PlayerModel } from "../models/Players.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

class PlayerClass {
    Create = async (req, res, next) => {
        try {
            const result = await cloudinary
                .uploader.upload(req.file.path);
            const player = new PlayerModel({
                first: req.body.first, last: req.body.last,
                age: req.body.age, info: req.body.info,
                image: result.secure_url, 
                cloudinary_id: result.public_id
            });
            await player.save();
            fs.unlinkSync(req.file.path);
            res.status(201).json(player);
        } catch (error) {
            res.status(500).json(error);
            next(error);
        }
    };

    FetchAll = async (req, res, next) => {
        try {
            const players = await PlayerModel
                .find({}).exec();
            res.status(201).json(players);
        } catch (error) {
            res.status(500).json(error);
            next(error);
        }
    };

    GetOne = async (req, res, next) => {
        try {
            await PlayerModel
            .findById(req.params.id)
            .then((player) => res.status(201)
            .json(player));
        } catch (error) {
            res.status(500).json(error);
            next(error);
        }
    };

    Update = async (req, res, next) => {
        try {
            let oldIMG = await PlayerModel.findById(req.params.id);
            await cloudinary.uploader.destroy(oldIMG.cloudinary_id);
            const newIMG = await cloudinary.uploader.upload(req.file.path);
            const data = {
                first: req.body.first, last: req.body.last,
                age: req.body.age, info: req.body.info,
                image: newIMG.secure_url, cloudinary_id: newIMG.public_id
            };
            const player = await PlayerModel.findByIdAndUpdate(
                req.params.id, data, { new: true });
            return res.status(201).json(player);
        } catch (error) {
            res.status(500).json(error);
            next(error);
        }
    };

    Delete = async (req, res, next) => {
        try {
            const player = await PlayerModel.findById(req.params.id);
            await cloudinary.uploader.destroy(player.cloudinary_id);
            await player.remove();
            res.status(201).json(`The Player was removed`);
        } catch (error) {
            res.status(500).json(error);
            next(error);
        }
    };
};

export const PLAYER = new PlayerClass();





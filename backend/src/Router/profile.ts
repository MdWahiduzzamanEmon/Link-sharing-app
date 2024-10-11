import express from "express";
import { Request, Response } from "express";
import { uploadMiddleware } from "../Others/File/fileUploadController";

export const profileRouter = express.Router();

export interface IProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

profileRouter.post(
  "/profile",
  uploadMiddleware,
  (req: Request, res: Response, next: any) => {
    try {
      const { first_name, last_name, email, profile_image } = req.body as any;

      if (!first_name || !last_name || !email || !profile_image) {
        return next(
          new Error(
            "Please add all fields.[first_name,last_name,email,profile_image]"
          )
        );
      }
    } catch (err) {
      next(err);
    }
  }
);

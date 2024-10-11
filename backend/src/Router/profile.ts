import express from "express";
import { Request, Response } from "express";

import { uploadMiddleware } from "../Others/File/fileUploadController";
import { createProfile } from "../Services/profile.service";

export const profileRouter = express.Router();

export interface IProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

profileRouter.post(
  "/create-profile",
  uploadMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { first_name, last_name, email } = req.body as any;

      if (!first_name || !last_name || !email) {
        return next(
          new Error(
            "Please add all fields.[first_name,last_name,email,profile_image]"
          )
        );
      }
      const profile_image = req?.fileUrl?.[0] as any;
      const body = {
        first_name,
        last_name,
        email,
        profile_image,
      } as IProfile;

      const result = await createProfile(body);

      if (!result) {
        return next(new Error("Error creating profile"));
      }

      res.status(200).json({
        status: 200,
        message: "Profile created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

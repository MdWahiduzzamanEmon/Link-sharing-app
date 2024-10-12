import express from "express";
import { Request, Response } from "express";

import { uploadMiddleware } from "../Others/File/fileUploadController";
import {
  createProfile,
  getAllProfile,
  getProfileByEmail,
} from "../Services/profile.service";
import { verifyTokenMiddleware } from "../Others/JWT";

export const profileRouter = express.Router();

export interface IProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

profileRouter.post(
  "/create-profile",
  verifyTokenMiddleware,
  uploadMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { user } = req as any;
      const { id: userIdFromToken, email: userEmailFromToken } = user;
      const { first_name, last_name } = req.body as any;

      if (!first_name || !last_name) {
        return next(
          new Error(
            "Please add all fields.[first_name,last_name,profile_image]"
          )
        );
      }
      const profile_image = req?.fileUrl?.[0] as any;
      const body = {
        first_name,
        last_name,
        email: userEmailFromToken,
        profile_image,
      } as IProfile;

      const result = await createProfile(body, userIdFromToken);

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

//all profile

profileRouter.get(
  "/all-profile",
  verifyTokenMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const result = await getAllProfile();

      if (!result) {
        return next(new Error("Error fetching profile"));
      }

      res.status(200).json({
        status: 200,
        message: "Profile fetched successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

//get single profile by email

profileRouter.get(
  "/get-profile",
  verifyTokenMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { user } = req as any;
      const { email } = user;

      // console.log(email, "email");

      const result = await getProfileByEmail(email);
      // console.log(result, "result");

      res.status(200).json({
        status: 200,
        message: "Profile fetched successfully",
        data: result ?? {},
      });
    } catch (err) {
      next(err);
    }
  }
);

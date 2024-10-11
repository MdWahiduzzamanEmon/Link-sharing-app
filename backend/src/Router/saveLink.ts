import express from "express";
import { Request, Response } from "express";

export const linkSaveRouter = express.Router();

linkSaveRouter.post("/saveLinks", (req: Request, res: Response, next: any) => {
  try {
    const { link } = req.body;
    if (!link) {
      next(new Error("Link not found"));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

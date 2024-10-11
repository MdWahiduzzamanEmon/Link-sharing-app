import express from "express";
import { Request, Response } from "express";
import {
  deleteAllLinks,
  deleteOneLink,
  getSaveLinks,
  postSaveLinks,
} from "../Services/saveLinks.service";

export const linkSaveRouter = express.Router();

linkSaveRouter.post(
  "/saveLinks",
  async (req: Request, res: Response, next: any) => {
    try {
      const { body } = req as any;
      if (Object.keys(body).length === 0) {
        return next(new Error("Body is empty.Please add some data"));
      }

      if (!Array.isArray(body)) {
        return next(new Error("Body is not an array"));
      }

      const result = await postSaveLinks(body);
      //   console.log(result);
      if (!result) {
        return next(new Error("Something went wrong while saving links"));
      }

      res.status(200).json({
        status: 200,
        message: "Link saved successfully",
        data: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

//get all saved links
linkSaveRouter.get(
  "/getLinks",
  async (_req: Request, res: Response, next: any) => {
    try {
      const result = await getSaveLinks();
      if (!result) {
        return next(new Error("Something went wrong while fetching links"));
      }

      res.status(200).json({
        status: 200,
        message: "Links fetched successfully",
        data: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

// deleteAllLinks

linkSaveRouter.delete(
  "/deleteAllLinks",
  async (_req: Request, res: Response, next: any) => {
    try {
      const result = await deleteAllLinks();
      if (!result) {
        return next(new Error("Something went wrong while deleting links"));
      }

      res.status(200).json({
        status: 200,
        message: "Links deleted successfully",
        data: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

//delete one link

linkSaveRouter.delete(
  "/deleteOneLink/:id",
  async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await deleteOneLink(id);
      if (!result) {
        return next(new Error("Something went wrong while deleting links"));
      }

      res.status(200).json({
        status: 200,
        message: "Links deleted successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

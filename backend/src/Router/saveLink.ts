import express from "express";
import { Request, Response } from "express";
import {
  deleteAllLinks,
  deleteOneLink,
  getSaveLinks,
  postSaveLinks,
  reorderLinks,
} from "../Services/saveLinks.service";
import { verifyTokenMiddleware } from "../Others/JWT";

export const linkSaveRouter = express.Router();

linkSaveRouter.post(
  "/saveLinks",
  verifyTokenMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { user } = req as any;
      const { id: userIdFromToken } = user;
      const { body } = req as any;
      if (Object.keys(body)?.length === 0) {
        return next(new Error("Body is empty.Please add some data"));
      }

      if (!Array.isArray(body)) {
        return next(new Error("Body is not an array"));
      }

      const result = await postSaveLinks(body, userIdFromToken);
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
  verifyTokenMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { user } = req as any;
      // console.log(user);
      const { id } = user;
      const result = await getSaveLinks(id);
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

// linkSaveRouter.delete(
//   "/deleteAllLinks",
//   verifyTokenMiddleware,
//   async (_req: Request, res: Response, next: any) => {
//     try {
//       const result = await deleteAllLinks();
//       if (!result) {
//         return next(new Error("Something went wrong while deleting links"));
//       }

//       res.status(200).json({
//         status: 200,
//         message: "Links deleted successfully",
//         data: result,
//       });
//     } catch (err) {
//       console.log(err);
//       next(err);
//     }
//   }
// );

//delete one link

linkSaveRouter.delete(
  "/deleteOneLink/:id",
  verifyTokenMiddleware,
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

//reorder link

linkSaveRouter.put(
  "/reorderLink",
  verifyTokenMiddleware,
  async (req: Request, res: Response, next: any) => {
    try {
      const { items } = req.body;
      if (!items || !Array.isArray(items)) {
        return next(new Error("Body is not an array"));
      }

      const result = await reorderLinks(items);
      if (!result) {
        return next(new Error("Something went wrong while reordering links"));
      }

      res.status(200).json({
        status: 200,
        message: "Links reordered successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

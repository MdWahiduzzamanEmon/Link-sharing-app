import express from "express";
import type { Request, Response } from "express";
import validateRegisterUser from "../Validation/validateRegisterUser";
import { hashPassword } from "../Others/SecurePassword";
import { findUserByEmail, saveUser } from "../Services/user.service";

export const authRouter = express.Router();

export type User = {
  email: string;
  userName?: string | null;
  password: string;
};

//register
authRouter.post(
  "/register",
  validateRegisterUser,
  async (req: Request, res: Response, next: any) => {
    // get the user data from the request body
    const { userName, email, password } = req.body as User;

    // check if the user exists
    const getUniqueUser = await findUserByEmail({
      ...(email && { email: email }),
    });

    // if the user exists, return an error message
    if (getUniqueUser) {
      return res.status(400).json({
        status: 400,
        message: `User with this email:${email} already exists`,
      });
    }

    // if the user does not exist, hash the password
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword, "hashedPassword");
    // save the user to the database
    const body = {
      ...(userName && { userName }),
      email,
      password: hashedPassword,
    };
    try {
      await saveUser(body);
      //   console.log(savedUser, "savedUser");
      return res.status(201).json({
        status: 201,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

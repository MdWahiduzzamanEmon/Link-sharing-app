import express from "express";
import type { Request, Response } from "express";
import validateRegisterUser from "../Validation/validateRegisterUser";
import { comparePassword, hashPassword } from "../Others/SecurePassword";
import { findUserByEmail, saveUser } from "../Services/user.service";
import exclude from "../Others/DataExcludeFunction/exclude";
import { generateToken } from "../Others/JWT";

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

//login

const userLogin = async (userData: any, password: string, res: Response) => {
  const isPasswordCorrect = await comparePassword(password, userData?.password);

  // if the password is incorrect, return an error message
  if (!isPasswordCorrect) {
    return res.status(400).json({
      status: 400,
      message: `Incorrect password`,
    });
  }

  const excludePassword = exclude(userData, ["password"]);
  // if the password is correct, then generate a token
  const token = await generateToken({
    ...excludePassword,
  });

  // return the token

  //step 1:create a object to store the user data
  const resData = {
    status: 200,
    isLogin: true,
    message: "Login successfully",
    accessToken: token,
    user: {
      ...excludePassword,
    },
  };

  return res.status(200).json(resData);
};

authRouter.post("/login", async (req: Request, res: Response, next: any) => {
  // get the user data from the request body
  const { email, password } = req.body as User;
  //   console.log(req.body, "req.body");

  //   console.log(getUniqueUser, "getUniqueUser");

  //   console.log(adminUser, "getUniqueUser");
  try {
    if (!email) {
      return res.status(400).json({
        status: 400,
        message: `Email is required`,
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 400,
        message: `Password is required`,
      });
    }

    // -------------------------  user login ----------------------------

    const getUniqueUser = await findUserByEmail({
      ...(email && {
        email: email,
      }),
    });

    // if the user does not exist, return an error message
    if (!getUniqueUser) {
      return res.status(400).json({
        status: 400,
        message: `User not found`,
      });
    }

    try {
      // check if the user exists

      if (getUniqueUser) {
        //login the user
        return await userLogin(getUniqueUser, password, res);
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

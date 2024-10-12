import { Request, Response } from "express";
import { User } from "../Router/authentication";

const validateRegisterUser = (req: Request, res: Response, next: any) => {
  // get the user data from the request body
  const { email, password } = req.body as User;

  // check if all the fields are provided
  for (const field in req.body) {
    // console.log(field, "field");
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }

  // check if the email is valid
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ message: `Invalid email` });
  }

  // check if the password is at least 8 characters long
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: `Password must be at least 8 characters long` });
  }

  next();
};

export default validateRegisterUser;

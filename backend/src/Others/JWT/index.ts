import jsonwebtoken from "jsonwebtoken";
//import cookie-parser
import cookieParser from "cookie-parser";

//generate token

export const generateToken = async (user: any, expiry = "1h") => {
  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET_KEY as string, {
    //expire in 1 hour
    expiresIn: expiry,
    algorithm: "HS256",
  });
  //   add token with bearer
  return `Bearer ${token}`;
};

//verify token

export const verifyToken = async (token: string) => {
  try {
    // Remove 'Bearer ' if it's present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token?.length); // Remove the 'Bearer ' prefix
    }

    // Now verify the token
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

//verify token middleware

export const verifyTokenMiddleware = async (req: any, res: any, next: any) => {
  // const BearerToken = req.headers.authorization; //get token from header

  //get token from cookie
  const headerToken = req.headers.authorization;
  const BearerToken = req.cookies?.token; //get token from cookie

  if (headerToken !== BearerToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // console.log(BearerToken, "BearerToken");

  const token = BearerToken?.split(" ")?.[1];
  // // console.log(token);
  if (!token) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const result = await verifyToken(token);
    req.user = result;
    next();
  } catch (error: any) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * Sets a cookie with the given token on the response, with the following properties:
 * - `httpOnly`: true (cookie is not accessible by client side)
 * - `secure`: true (cookie can only be transmitted over a secure protocol, i.e. HTTPS)
 * - `sameSite`: "none" (cookie can be sent with cross-site requests)
 * - `maxAge`: 1 hour (cookie will expire in 1 hour)
 *
 * @param {Response} res - the response object
 * @param {string} token - the token to set as the cookie value
 * @returns {Response} the response object with the set cookie
 */

export const cookieResponse = (res: any, token: string) => {
  // expire in 1 hour
  const oneHour = 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true, //cookie is not accessible by client side
    secure: true, //https
    sameSite: "none", //cross site
    maxAge: oneHour, //1 hour
  });
  // Access-Control-Allow-Origin
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  return res;
};

import { getFromCache, StoreInCache } from "../../Redis/redis";
import { verifyOtp } from "../../Services/Auth/auth.service";
import { findUserByEmailandUsername } from "../../Services/Users/user.service";
import generateOTP from "../OTP/otp";
import generatePDFfromHTML from "../PDF/generatePdf";
import { transporter } from "./mail";
import HTML_TEMPLATE from "./mail-template";
import fs from "fs";

const usingForValues = [
  "resetPassword",
  "verifyEmail",
  "deposit_request",
  "withdraw_amount_request",
  "invest_project",
];
const getUsingForValue = (usingFor: string) => {
  switch (usingFor) {
    case "resetPassword":
      return "Reset Password";
    case "verifyEmail":
      return "Verify Email";
    case "deposit_request":
      return "Deposit Request";
    case "withdraw_amount_request":
      return "Withdraw Amount Request";
    case "invest_project":
      return "Invest Project";
    default:
      return false;
  }
};
// 1 minute in milliseconds
const OTP_EXPIRATION_SECONDS = 60; // 1 minute

// Example storage for OTPs and their expiration timestamps (in-memory storage, replace with a proper database)
let otpStorage = {} as any;

// Middleware to send OTP emails
const sendOtpMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { email, usingFor } = req.body as { email: string; usingFor: string };

    // Validate required fields
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", required_field: "email" });
    }

    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email must be a string" });
    }

    if (!usingFor) {
      return res.status(400).json({
        message: "Using for is required",
        required_field: "usingFor",
        available_usingFor: usingForValues,
      });
    }

    const usingForValue = getUsingForValue(usingFor); // Cache the value for reuse
    if (!usingForValue) {
      return res.status(400).json({
        message: "Invalid using for",
        available_usingFor: usingForValues,
      });
    }

    // Check cache in parallel
    let checkUserExistPromise = getFromCache("user:forCheckExist:", email);

    // console.log(await checkUserExistPromise, "checkUserExistPromise");

    // Check OTP cache before proceeding with user lookup
    if (otpStorage[email] && otpStorage[email].expiresAt > Date.now()) {
      req.otpData = otpStorage[email];
      console.log("Reusing existing OTP:", otpStorage[email]);
      return next();
    }

    // Check if user exists, fallback to database lookup if not cached
    let checkUserExist = JSON.parse(await checkUserExistPromise);
    if (!checkUserExist) {
      checkUserExist = await findUserByEmailandUsername({ email });

      if (checkUserExist) {
        // Cache user info for future use (non-blocking)
        StoreInCache(
          "user:forCheckExist:",
          email,
          JSON.stringify(checkUserExist)
        );
      }
    }

    if (!checkUserExist) {
      return res
        .status(400)
        .json({ message: "User not found with this email: " + email });
    }

    // Generate new OTP if no valid one exists
    const otp = generateOTP(); // OTP generation logic
    const otpData = {
      otp,
      expiresAt: Date.now() + OTP_EXPIRATION_SECONDS * 1000, // Expiration time in ms
      usingFor: usingFor,
    };

    // Store OTP immediately (non-blocking)
    otpStorage[email] = otpData;
    req.otpData = otpData;

    // Send the email asynchronously and log results (non-blocking)
    const mailOptions = {
      from: process.env.MAIL_USER, // sender address
      to: email, // receiver
      subject: `${usingForValue} OTP: ${otp} `, // Subject line
      text: `Your OTP for ${usingForValue} is: ${otp}`, // plain text body
      html: HTML_TEMPLATE(`Your OTP for ${usingForValue} is ${otp}`), // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        // Optionally log the error or trigger a retry mechanism
      } else {
        console.log("OTP email sent:", info.response, otpData);
      }
    });

    return next(); // Proceed without waiting for the email to be sent
  } catch (error) {
    console.error("Error generating OTP:", error);
    return res.status(500).json({ message: "Failed to generate OTP", error });
  }
};

export default sendOtpMiddleware;

//
export const sendOtp = async (email: any) => {
  // console.log(email);
  try {
    const otp = generateOTP();

    const mailOptions = {
      from: process.env.MAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Verify Email", // Subject line
      text: `Your OTP for Verify Email is ${otp}`, // plain text body
      html: HTML_TEMPLATE(`Your OTP for Verify Email is ${otp}`), // html body
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log(result);
    //  result?.response?.includes("OK");
    if (result.response?.includes("OK")) {
      return {
        otp,
        expiresAt: Date.now() + OTP_EXPIRATION_SECONDS * 1000,
        usingFor: "verifyEmail",
      };
    }
  } catch (error) {
    console.error("Error generating OTP:", error);
    return false;
  }
};

//verify otp middleware

export const verifyOtpMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { email, otp, usingFor } = req.body;

    // Validate email
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", required_field: "email" });
    }

    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email must be a string" });
    }

    // Validate OTP
    if (!otp) {
      return res
        .status(400)
        .json({ message: "OTP is required", required_field: "otp" });
    }

    // Validate usingFor
    if (!usingFor) {
      return res.status(400).json({
        message: "Using for is required",
        required_field: "usingFor",
        available_usingFor: usingForValues,
      });
    }

    const usingForValue = getUsingForValue(usingFor); // Cache the value for reuse
    if (!usingForValue) {
      return res.status(400).json({
        message: "Invalid using for",
        available_usingFor: usingForValues,
      });
    }

    // Verify OTP: Call the OTP verification logic asynchronously
    const otpData = await verifyOtp({ email, otp, usingFor });

    if (!otpData) {
      return res.status(400).json({
        message: "OTP not found. Please request a new OTP",
      });
    }

    // Handle already verified OTP
    if (otpData?.status === "approved") {
      return res.status(400).json({
        message: "OTP already verified. Please request for a new OTP",
      });
    }

    // Check OTP matching
    if (parseInt(otpData?.otp) !== parseInt(otp)) {
      return res.status(400).json({ message: "OTP does not match" });
    }

    // Check OTP expiration
    if (otpData.expireAt < new Date()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new OTP" });
    }

    // Mark the OTP as verified and pass data to the next middleware
    req.otpData = { verified: true };
    return next();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Failed to verify OTP", error });
  }
};

import generatePDFfromHTML from "../../PDF/generatePdf";
import { transporter } from "../mail";
import fs from "fs";

//send a pdf file in mail
export const sendPDFinMail = async ({
  email,
  mailSubject,
  fileName,
  htmlContent,
}: {
  email: string;
  fileName: string;
  mailSubject: string;
  htmlContent: string;
}) => {
  // console.log(HTML_TEMPLATE("HEllo, from mail sent"));
  //generate pdf from html
  const pdfName = fileName;
  const pdf = await generatePDFfromHTML(htmlContent, pdfName);
  // console.log(pdf);
  if (!pdf) {
    return { message: "Error generating PDF" };
  }
  //get file from document folder
  const file = fs.readFileSync(`document/${pdfName}.pdf`);

  if (!file) {
    return { message: "File not found" };
  }

  if (!email) {
    return { message: "Email not found" };
  }

  // console.log("email", email);
  try {
    const mailOptions = {
      from: process.env.MAIL_USER, // sender address
      to: email, // list of receivers
      subject: mailSubject,
      text: "Hello, from ByteBridge", // plain text body
      html: htmlContent, // html body
      attachments: [
        {
          filename: `${pdfName}.pdf`,
          content: file,
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log(result);

    //  result?.response?.includes("OK");
    if (result.response?.includes("OK")) {
      console.log("mail sent successfully");
      //remove the file after sending
      fs.unlink(`document/${pdfName}.pdf`, (err) => {
        if (err) {
          console.log("Error deleting file");
        } else {
          console.log("File deleted successfully");
        }
      });
      return {
        message: "PDF sent successfully",
      };
    }
  } catch (error) {
    console.error("Error sending PDF:", error);
    return false;
  }
};

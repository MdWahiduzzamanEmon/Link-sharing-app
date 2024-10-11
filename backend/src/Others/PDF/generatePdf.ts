import pdf from "html-pdf";
import fs from "fs";

const generatePDFfromHTML = async (htmlContent: any, fileName: string) => {
  const options = { format: "A4" } as any;
  const isExistFolder = fs.existsSync("document");
  if (!isExistFolder) {
    fs.mkdirSync("document");
  }
  const outputPath = "document/" + fileName + ".pdf";
  const pdfPromise = new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toFile(outputPath, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  return pdfPromise;
};

export default generatePDFfromHTML;

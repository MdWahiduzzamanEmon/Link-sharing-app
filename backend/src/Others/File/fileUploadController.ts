import multer from "multer";
import fs from "fs";
// Multer Configuration

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadFile");
  },
  filename: function (req, file, cb) {
    const modifyFileName = `${
      new Date().toISOString().split("T")[0]
    }-${Math.floor(Math.random() * 1000)}-${file.originalname}`;

    fs.exists("uploadFile", (exist) => {
      if (!exist) {
        return fs.mkdir("uploadFile", (error) => cb(null, modifyFileName));
      }
    });
    cb(null, modifyFileName);
  },
});

export const upload = multer({ storage: storage });

export const uploadMiddleware = async (req: any, res: any, next: any) => {
  const upload = multer({ storage: storage }).any();

  upload(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err });
    } else if (err) {
      return res.status(500).json({ message: err });
    }

    // send with field name and path
    req.fileUrl =
      req?.files?.length > 0
        ? req.files.map((file: any) => {
            return {
              // fieldname: file.fieldname,
              filename: file.filename,
              url: `${process.env.LIVE_URL}/media/${file.filename}`,
              extension: file?.mimetype.split("/")[1],
              size: file.size,
            };
          })
        : [];
    next();
  });
};

export const fileUploadAndGetUrlFunc = async (file: any) => {
  const { buffer, mimetype, originalname } = file;
  const fileName = `${new Date().toISOString().split("T")[0]}-${originalname}`;

  fs.writeFile(`uploadFile/${fileName}`, buffer, (err) => {
    if (err) {
      return { message: err.message };
    }
  });
  return {
    path: `${process.env.LIVE_URL}/media/${fileName}`,
    extension: mimetype.split("/")[1],
  };
};

//unlink file from folder

export const unlinkFile = async (path: any) => {
  // console.log(path);
  try {
    fs.unlink("uploadFile/" + path?.split("/")[4], (err) => {
      if (err) {
        return { message: "Error deleting file" };
      } else {
        console.log("File deleted successfully");
        return { message: "File deleted successfully" };
      }
    });
  } catch (err) {
    console.log(err);
    return { message: "Error deleting file" };
  }
};

//middleware for file unlink

export const unlinkFileMiddleware = async (req: any, res: any, next: any) => {
  const { fileUrl } = req as any;
  if (fileUrl) {
    try {
      fs.unlink("uploadFile/" + fileUrl?.[0]?.path.split("/")[4], (err) => {
        if (err) {
          return res.status(400).json({ message: "Error deleting file" });
        } else {
          console.log("File deleted successfully");
          next();
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error deleting file" });
    }
  } else {
    next();
  }
};

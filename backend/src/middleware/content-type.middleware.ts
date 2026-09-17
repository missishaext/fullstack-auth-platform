import {Request,Response,NextFunction} from "express";

export const requireJsonContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isJsonRequest = req.is("application/json");

  if (!isJsonRequest) {
    return res.status(415).json({
      success: false,
      error: {
        code: "UNSUPPORTED_MEDIA_TYPE",
        message:
          "Content-Type must be application/json"
      }
    });
  }

  next();
};
import {
  NextFunction,
  Request,
  Response
} from "express";

import { randomUUID } from "crypto";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = randomUUID();
  const startTime = Date.now();

  /*
    Request ID response header me bhi bhej rahe hain.
  */
  res.setHeader("X-Request-Id", requestId);

  /*
    Response complete hone par request log hoga.
  */
  res.on("finish", () => {
    const responseTimeMs =
      Date.now() - startTime;

    console.log(
      JSON.stringify({
        level: "info",
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs
      })
    );
  });

  next();
};
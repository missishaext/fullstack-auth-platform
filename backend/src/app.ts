import "dotenv/config";
import express, { NextFunction, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import {requestLogger} from "./middleware/request-logger.middleware";

/*
  Express body-parser errors me status aur type
  properties ho sakti hain.
*/
type ExpressBodyError = Error & {
  status?: number;
  type?: string;
};

const app = express();

app.use(helmet());
app.use(requestLogger);

app.use(
  cors({
    origin:process.env.FRONTEND_ORIGIN ||"http://localhost:5173",
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
  })
);

app.use(express.json({limit: "10kb" }));

app.get("/", (req: Request,res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Authentication backend is running"
  });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(( req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "Requested route was not found"
    }
  });
});


app.use((error: unknown,req: Request,res: Response,next: NextFunction) => {
  const requestError = error as ExpressBodyError;

  if (requestError instanceof SyntaxError &&requestError.status === 400) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_JSON",
        message: "Request body contains invalid JSON"
      }
    });
  }

  if (requestError.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      error: {
        code: "PAYLOAD_TOO_LARGE",
        message: "Request body must not exceed 10kb"
      }
    });
  }

  console.error("Unhandled application error:", {
    method: req.method,
    path: req.path,
    message: requestError.message
  });

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong"
    }
  });
});

export default app;

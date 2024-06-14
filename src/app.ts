import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors);

// routes
app.use('/api', ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});



export default app;

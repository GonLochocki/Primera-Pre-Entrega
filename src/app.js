import express from "express";
import { productRouter } from "./productRouter.js";

const app = express();
app.use(express.json());

app.use(express.static("./views"));

app.use("/api/productos", productRouter);

app.use((err, req, res, next) => {
  res.json({
    status: "error",
    descrip: err.message,
  });
});

const server = app.listen(8080, () => {
  console.log("Conectado al puerto 8080");
});

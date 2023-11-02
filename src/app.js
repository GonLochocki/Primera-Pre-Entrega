import express from "express";
import { productRouter } from "./productRouter.js";
import { cartRouter } from "./cartRouter.js";
import { ProductManager } from "./ProductManager.js";

const app = express();
app.use(express.json());

app.use("/api/productos", productRouter);
app.use("/api/cart", cartRouter);



app.use((err, req, res, next) => {
  res.json({
    status: "error",
    descrip: err.message,
  });
});

const server = app.listen(8080, () => {
  console.log("Conectado al puerto 8080");
  
});

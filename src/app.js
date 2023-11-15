import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { webRouter } from "./webRouter.js";
import { ProductManager } from "./ProductManager.js";

const app = express();
app.use(express.json());
app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/static", express.static("./static"));
// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
app.use("/", webRouter);

const pm = new ProductManager("listProducts.json");

const server = app.listen(8080, () => {
  console.log("PORT 8080 is conected!");
});

const ioServer = new Server(server);

app.use((req, res, next) => {
  req.io = ioServer;
  next();
});

ioServer.on("connection", (socket) => {
  socket.on("addProduct", (product) => {    
    req.io.sockets.emit("addProduct", product);
  });
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = await pm.addProduct(req.body);
    req.io.sockets.emit("addProduct", newProduct);
    res.json(newProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res)=>{
  const productId = parseInt(req.params.id);
  await pm.deleteProduct(productId);
  await pm.writeFile()
  await pm.readFile()
  const productos = await pm.getProducts()
  req.io.sockets.emit("deleteProduct", productos);  
  res.json(productos);  
})

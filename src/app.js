import express from "express";
import { productRouter } from "./productRouter.js";
import { cartRouter } from "./cartRouter.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { webRouter } from "./webRouter.js";

const app = express();
app.use(express.json());
app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/static", express.static("./static"));
// app.use("/api/products", productRouter);
// app.use("/api/cart", cartRouter);
app.use("/", webRouter);

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
    console.log(product);
    req.io.sockets.emit("addProduct", product);
  });
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  try {
    req.io.sockets.emit("addProduct", product);
    res.json(product)
  } catch (error) {
    res.json({ error: error.message });
  }
});

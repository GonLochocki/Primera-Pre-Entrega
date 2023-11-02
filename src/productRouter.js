import { Router } from "express"
import { ProductManager } from "./ProductManager.js";

export const productRouter = Router()

const pm = new ProductManager("./src/productos.json");
pm.init();

productRouter.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit);
    if (limit) {
      const productos = await pm.getProducts({ limit });
      res.json(productos);
    } else {
      res.json(await pm.getProducts());
    }
  });
  
  productRouter.get("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const buscado = await pm.getProductById(id);
    if (buscado) {
      res.json(buscado);
    } else {
      res.json({
        error: "El producto no se encuentra en el stock...",
      });
    }
  });
  
  productRouter.post("/", async (req, res) => {
    const productBody = req.body;
    const product = await pm.addProduct(productBody);
    res.json(product);
  });
  
  productRouter.put("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const anterior = await pm.getProductById(id);
    const productUpdate = req.body;
    const productoActualizado = await pm.updateProduct(id, productUpdate);
    res.json({
      Anterior: anterior,
      Actualizado: productoActualizado,
    });
  });
  
  productRouter.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const eliminado = await pm.getProductById(id);
    await pm.deleteProduct(id);
    res.json({
      Eliminado: eliminado,
    });
  });
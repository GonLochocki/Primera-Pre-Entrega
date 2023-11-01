import { ProductManager } from "./ProductManager.js";
import express from "express";

const app = express();
app.use(express.json());

const pm = new ProductManager("./src/productos.json");
pm.init()

app.get("/productos", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (limit) {
    const productos = await pm.getProducts({ limit });
    res.json(productos);
  } else {
    res.json(await pm.getProducts());
  }
});

app.get("/productos/:id", async (req, res)=> {
    let id = parseInt(req.params.id);
    const buscado = await pm.getProductById(id)
    if(buscado){
        res.json(buscado)
    }else {
        res.json({
            error: "El producto no se encuentra en el stock..."
        })
    }
})

app.post("/productos", async (req, res)=>{
    const productBody = req.body;
    const product = await pm.addProduct(productBody)
    res.json(product)
})

app.put("/productos/:id", async (req, res)=>{
    let id = parseInt(req.params.id);
    const anterior = await pm.getProductById(id);
    const productUpdate = req.body;
    const productoActualizado = await pm.updateProduct(id, productUpdate)
    res.json({
        "Anterior": anterior,
        "Actualizado": productoActualizado
    });
})

app.delete("/productos/:id", async (req, res)=>{
    let id = parseInt(req.params.id);
    const eliminado = await pm.getProductById(id)
    await pm.deleteProduct(id);
    res.json({
        "Eliminado": eliminado
    })
})

const server = app.listen(8080, () => {
  console.log("Conectado al puerto 8080");
});


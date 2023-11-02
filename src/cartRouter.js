import { Router} from "express"
import { cartManager } from "./cartManager.js"

export const cartRouter = Router()
const cm = new cartManager("./src/carts.json")


cartRouter.post("/", async (req, res)=> {
   await cm.init() 
   const cart = await cm.agregarCarrito()
   res.json({
    Carrito: cart
   }); 
})

cartRouter.get("/api/cart", (res, req)=>{
    
})
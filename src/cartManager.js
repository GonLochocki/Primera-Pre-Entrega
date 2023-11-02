import * as fs from "fs/promises";

export class cartManager {
  constructor(ruta) {
    this.ruta = ruta;
    this.carts = [];
  }

  static id = 0;

  async getId() {
    return ++cartManager.id;
  }

  async init() {
    return await this.escribirArchivo();
  }

  async escribirArchivo() {
    return fs.writeFile(this.ruta, JSON.stringify(this.carts));
  }

  async leerArchivo() {
    const carts = await fs.readFile(this.ruta, "utf-8");
    this.carts = JSON.parse(carts);
    return this.carts;
  }

  async agregarCarrito() {
    const carts = await this.leerArchivo();
    let id = await this.getId();
    const cart = carts.push({
      id,
      productos: [],
    });
    await this.escribirArchivo();
    return cart;
  }
}

import * as fs from "fs/promises";

class Product {
  constructor(title, description, price, thumbnail, stock, code, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = code;
    this.id = id;
  }
}

export class ProductManager {
  static lastId = 0;
  static lastCode = 0;

  constructor(ruta) {
    this.products = [];
    this.ruta = ruta;
  }

  static getId() {
    return ++ProductManager.lastId;
  }

  static getCode() {
    return (ProductManager.lastCode += Math.random());
  }

  async init() {
    await this.escribirArchivo();
  }

  async escribirArchivo() {
    await fs.writeFile(this.ruta, JSON.stringify(this.products));
  }

  async leerArchivo() {
    const products = await fs.readFile(this.ruta, "utf-8");
    this.products = JSON.parse(products);
    return this.products;
  }

  async addProduct({ title, description, price, thumbnail, stock }) {
    if (!title || !description || !price || !thumbnail || !stock) {
      throw new Error("Debe completar todos los campos.");
    }

    const code = ProductManager.getCode();

    const productoExistente = this.products.find((p) => p.code === code);

    if (!productoExistente) {
      const id = ProductManager.getId();
      const product = new Product(
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        id
      );
      await this.leerArchivo();
      this.products.push(product);
      await this.escribirArchivo();
      return product;
    } else {
      console.log(
        "Existe un producto con el mismo codigo en la coleccion. Por favor Ingresar uno nuevo"
      );
    }
  }

  async getProducts(query = {}) {
    const products = await this.leerArchivo();

    if (query.limit) {
      const limit = parseInt(query.limit);
      if (limit < products.length) return products.slice(0, limit);
    }
    return products;
  }

  async getProductById(id) {
    await this.leerArchivo();
    const existe = this.products.find((p) => p.id === id);
    if (existe) {
      return existe;
    } else {
      console.log("No se encuentra en la coleccion");
    }
  }

  async updateProduct(id, datoActualizado) {
    await this.leerArchivo();
    const indiceProducto = this.products.findIndex((p) => p.id === id);
    if (indiceProducto !== -1) {
      const productoActualizado = {
        ...this.products[indiceProducto],
        ...datoActualizado,
      };
      this.products[indiceProducto] = productoActualizado;
      await this.escribirArchivo();
      return productoActualizado;
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const item = await this.getProductById(id);
    const nuevoArreglo = this.products.filter((p) => p.id !== item.id);
    await fs.unlink(this.ruta);
    await this.init();
    await this.leerArchivo();
    this.products = nuevoArreglo;
    await this.escribirArchivo();
  }
}

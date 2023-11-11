const socket = io()

const listProducts = document.querySelector("#products");

socket.on("addProduct", product => {
    const item = document.createElement("li");
    item.innerHTML = product;
    item.textContent = JSON.stringify(product)
    listProducts.appendChild(item);
})

socket.on("deleteProduct", (productos) => {
    
    listProducts.innerHTML = ""
    productos.forEach((p)=> {
        const item = document.createElement("li")
        item.innerHTML = p
        item.textContent = JSON.stringify(p)
        listProducts.appendChild(item)
    })
    
})
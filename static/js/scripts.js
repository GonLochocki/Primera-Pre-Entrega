const socket = io()

const listProducts = document.querySelector("#products");

socket.on("addProduct", product => {
    const item = document.createElement.("li");
    item.innerHTML = product;
    listProducts.appendChild(item);
})
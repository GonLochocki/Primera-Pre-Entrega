const socket = io()

const listProducts = document.querySelector("#products");

socket.on("addProduct", product => {
    const item = document.createElement("li");
    item.innerHTML = product;
    item.textContent = JSON.stringify(product)
    listProducts.appendChild(item);
})

socket.on("deleteProduct", () => {
    const listItems = listProducts.getElementsByTagName("li")
    const totalItems = listItems.length;
    if(listItems.length > 0){
        const lastItem = listProducts[totalItems -1]
        listProducts.removeChild(lastItem)
    }else{
        console.log("The list are empty...")
    }
})
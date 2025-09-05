
const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 75 }
]


let cart = []



const productsList = document.getElementById("products-list")

const cartItems = document.getElementById("cart-items")

const cartTotal = document.getElementById("cart-total")

const clearCartBtn = document.getElementById("clear-cart-btn")




function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    cart = savedCart
}


function renderProducts() {
    productsList.innerHTML = "" 


    products.forEach((product) => {
        const div = document.createElement("div")
        div.className = "product-item"
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>

        `
        productsList.appendChild(div)
    })
}


function renderCart() {
    cartItems.innerHTML = "" 

    let total = 0

    cart.forEach((product) => {
        const li = document.createElement("li")
        li.className = "cart-item"
        li.innerHTML = `
            ${product.name} - $${product.price}
            <button class="remove-btn" data-id="${product.id}">Eliminar</button>
        `
        cartItems.appendChild(li)
        total += product.price
    })

    cartTotal.textContent = total.toFixed(2)
}



productsList.addEventListener("click", (e) => {

    if (e.target.classList.contains("add-to-cart-btn")) {
        const id = parseInt(e.target.dataset.id)
        const product = products.find(p => p.id === id)
        cart.push(product)

        saveCart()

        renderCart()
    }
})


cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const id = parseInt(e.target.dataset.id)
        cart = cart.filter(p => p.id !== id)

        saveCart()

        renderCart()
    }
})


clearCartBtn.addEventListener("click", () => {
    cart = []
    saveCart()
    renderCart()
})


loadCart()
renderProducts()
renderCart()

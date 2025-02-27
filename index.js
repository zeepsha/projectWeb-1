let cart = [];

function toggleCart() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-300px"; // Menutup sidebar
    } else {
        sidebar.style.right = "0px"; // Membuka sidebar
    }
    
    sidebar.classList.toggle("open"); // Toggle class untuk animasi smooth
}

function addToCart(itemName, price) {
    let item = cart.find(product => product.name === itemName);
    if (item) {
        item.quantity += 1;
        document.getElementById("sidebar").style.right = "0px";
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCart();
    showNotification(`${itemName} berhasil ditambahkan ke keranjang!`);
    
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>Rp ${item.price * item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalElement.innerText = total.toLocaleString();
}
// Tutup sidebar jika klik di luar area sidebar
document.addEventListener("click", function (event) {
    let sidebar = document.getElementById("sidebar");
    let cartButton = document.getElementById("cart-toggle");

    if (sidebar.style.right === "0px" && !sidebar.contains(event.target) && event.target !== cartButton) {
        sidebar.style.right = "-600px";
    }
});

function showNotification(message) {
    let notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "#28a745";
    notification.style.color = "white";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}


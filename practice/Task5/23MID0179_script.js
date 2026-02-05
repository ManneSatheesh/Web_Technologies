// Product Data
const products = [
	{
		id: 1,
		name: "Laptop",
		category: "Electronics",
		price: 50000,
		image: "📱"
	},
	{
		id: 2,
		name: "Mouse",
		category: "Electronics",
		price: 500,
		image: "🖱️"
	},
	{
		id: 3,
		name: "Keyboard",
		category: "Electronics",
		price: 1500,
		image: "⌨️"
	},
	{
		id: 4,
		name: "USB Cable",
		category: "Accessories",
		price: 200,
		image: "🔌"
	},
	{
		id: 5,
		name: "Phone Stand",
		category: "Accessories",
		price: 300,
		image: "📱"
	},
	{
		id: 6,
		name: "Headphones",
		category: "Electronics",
		price: 2000,
		image: "🎧"
	}
];


let cart = [];
let discountApplied = 0;
let validCoupons = {
	"SAVE10": 10,
	"SAVE20": 20,
	"SAVE50": 50
};

document.addEventListener("DOMContentLoaded", function() {
	displayProducts(products);
	setupCategoryFilter();
});


function displayProducts(filteredProducts) {
	const productList = document.getElementById("pdtlist");
	productList.innerHTML = "";

	filteredProducts.forEach(product => {
		const productDiv = document.createElement("div");
		productDiv.className = "product";
		productDiv.innerHTML = `
			<div style="font-size: 40px;">${product.image}</div>
			<h3>${product.name}</h3>
			<p>Category: ${product.category}</p>
			<p class="price">Rs. ${product.price}</p>
			<button onclick="addToCart(${product.id})">Add to Cart</button>
		`;
		productList.appendChild(productDiv);
	});
}


function setupCategoryFilter() {
	const categoryFilter = document.getElementById("categoryfilter");
	categoryFilter.addEventListener("change", function() {
		const selectedCategory = this.value;
		if (selectedCategory === "All") {
			displayProducts(products);
		} else {
			const filtered = products.filter(product => product.category === selectedCategory);
			displayProducts(filtered);
		}
	});
}

function addToCart(productId) {
	const product = products.find(p => p.id === productId);
	
	const existingItem = cart.find(item => item.id === productId);
	
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.push({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1
		});
	}
	
	updateCart();
	alert(`${product.name} added to cart!`);
}

function updateCart() {
	const cartItemsDiv = document.getElementById("cartItems");
	cartItemsDiv.innerHTML = "";

	if (cart.length === 0) {
		cartItemsDiv.innerHTML = "<p style='color: #999;'>Your cart is empty</p>";
	} else {
		cart.forEach(item => {
			const cartItem = document.createElement("div");
			cartItem.className = "cart-item";
			const itemTotal = item.price * item.quantity;
			cartItem.innerHTML = `
				<span>${item.name} x${item.quantity}</span>
				<span>Rs. ${itemTotal}</span>
				<button onclick="removeFromCart(${item.id})">Remove</button>
			`;
			cartItemsDiv.appendChild(cartItem);
		});
	}

	updateTotals();
}

function removeFromCart(productId) {
	cart = cart.filter(item => item.id !== productId);
	updateCart();
}

function updateTotals() {
	let subtotal = 0;
	cart.forEach(item => {
		subtotal += item.price * item.quantity;
	});

	const discount = subtotal * (discountApplied / 100);
	const total = subtotal - discount;

	document.getElementById("subtotal").textContent = subtotal;
	document.getElementById("discount").textContent = discount.toFixed(2);
	document.getElementById("total").textContent = total.toFixed(2);
}

function applycoupon() {
	const couponInput = document.getElementById("coupon").value.toUpperCase();
	
	if (cart.length === 0) {
		alert("Your cart is empty!");
		return;
	}

	if (validCoupons.hasOwnProperty(couponInput)) {
		discountApplied = validCoupons[couponInput];
		alert(`Coupon "${couponInput}" applied! ${discountApplied}% discount`);
		document.getElementById("coupon").value = "";
		updateTotals();
	} else {
		alert("Invalid coupon code!");
		discountApplied = 0;
		document.getElementById("coupon").value = "";
		updateTotals();
	}
}

function checkout() {
	if (cart.length === 0) {
		alert("Your cart is empty!");
		return;
	}
	const total = document.getElementById("total").textContent;
	const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	alert(`Order confirmed!\nTotal Items: ${itemCount}\nTotal Amount: Rs. ${total}\n\nThank you for your purchase!`);
	cart = [];
	discountApplied = 0;
	document.getElementById("coupon").value = "";
	updateCart();
}
let quries = new URLSearchParams(window.location.search);
let id = quries.get("id");

async function getProductDetails() {
	let response = await fetch(`http://dummyjson.com/products/${id}`);
	let data = await response.json();
	return data;
}
document.addEventListener("DOMContentLoaded", async function () {
	let product = await getProductDetails();
	document.querySelector(".card").innerHTML = `
    <h3>${product.title}</h3>
    <img src="${product.thumbnail}" alt="product image">
    <p>${product.price} EGP</p>
    <p>${product.description}</p>
    `;
});

async function getData() {
	let response = await fetch("http://dummyjson.com/products");
	let data = await response.json();
	return [...data?.products];
}

getData().then(data => {
	console.log(data);
	data.forEach(function (product) {
		document.querySelector("body").innerHTML += `
        <div class="card">
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}" alt="product image">
        <p>${product.price} EGP</p>
        <p>${product.description}</p>
        <a href="./productDetails.html?id=${product.id}">View Details</a>
        </div>
        `;
	});
});

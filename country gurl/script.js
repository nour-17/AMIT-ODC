let bigImg = document.querySelector(".big-img");
let smallImgs = document.querySelectorAll(".small-imgs");

smallImgs.forEach(smallImg => {
	smallImg.addEventListener("click", function () {
		bigImg.src = smallImg.src;
	});
});

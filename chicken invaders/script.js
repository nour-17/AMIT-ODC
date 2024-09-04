const rocket = document.getElementById("rocket");
const chickensArea = document.getElementById("chickens_area");
const rocketSpeed = 5;
const bulletSpeed = 5;

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowLeft: false,
	ArrowRight: false,
	" ": false, // Spacebar for firing bullets
};

// Track key presses and releases
document.addEventListener("keydown", e => {
	if (keys.hasOwnProperty(e.key)) {
		keys[e.key] = true;
	}
});

document.addEventListener("keyup", e => {
	if (keys.hasOwnProperty(e.key)) {
		keys[e.key] = false;
	}
});

function moveRocket() {
	const rect = rocket.getBoundingClientRect();

	if (keys.ArrowUp && rect.top > 0) {
		rocket.style.top = `${rect.top - rocketSpeed}px`;
	}
	if (keys.ArrowDown && rect.bottom < window.innerHeight) {
		rocket.style.top = `${rect.top + rocketSpeed}px`;
	}
	if (keys.ArrowLeft && rect.left > 0) {
		rocket.style.left = `${rect.left - rocketSpeed}px`;
	}
	if (keys.ArrowRight && rect.right < window.innerWidth) {
		rocket.style.left = `${rect.left + rocketSpeed}px`;
	}
}

function fireBullet() {
	const rect = rocket.getBoundingClientRect();
	const bulletX = rect.left + rect.width / 2 - 15; // Center bullet horizontally relative to rocket
	const bulletY = rect.top;
	createBullet(bulletX, bulletY);
	keys[" "] = false; // Prevent continuous shooting
}

function createBullet(x, y) {
	const bullet = document.createElement("div");
	bullet.classList.add("bullet");
	bullet.style.left = `${x}px`;
	bullet.style.top = `${y}px`;
	chickensArea.appendChild(bullet);

	const interval = setInterval(() => {
		const bulletRect = bullet.getBoundingClientRect();
		bullet.style.top = `${bulletRect.top - bulletSpeed}px`;

		// Check for collision with chickens
		const chickens = document.querySelectorAll(".chicken");
		chickens.forEach(chicken => {
			if (isCollide(bullet, chicken)) {
				chickensArea.removeChild(chicken);
				chickensArea.removeChild(bullet);
				clearInterval(interval);
			}
		});

		// Remove bullet if it leaves the screen
		if (bulletRect.top < 0) {
			chickensArea.removeChild(bullet);
			clearInterval(interval);
		}
	}, 20);
}

function isCollide(elem1, elem2) {
	const rect1 = elem1.getBoundingClientRect();
	const rect2 = elem2.getBoundingClientRect();

	return !(
		rect1.top > rect2.bottom ||
		rect1.bottom < rect2.top ||
		rect1.left > rect2.right ||
		rect1.right < rect2.left
	);
}

function gameLoop() {
	moveRocket();
	if (keys[" "]) {
		fireBullet();
	}
	requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the game loop

// Initialize rocket's position
let rocketPosition = {
	top: window.innerHeight - 80, // 10px from bottom
	left: window.innerWidth / 2 - 30, // Center horizontally
};

// Set initial position
rocket.style.top = `${rocketPosition.top}px`;
rocket.style.left = `${rocketPosition.left}px`;

// Handle window resize to adjust boundaries
window.addEventListener("resize", () => {
	// Update positions if needed
	if (rocketPosition.left + rocket.offsetWidth > window.innerWidth) {
		rocketPosition.left = window.innerWidth - rocket.offsetWidth;
		rocket.style.left = `${rocketPosition.left}px`;
	}
	if (rocketPosition.top + rocket.offsetHeight > window.innerHeight) {
		rocketPosition.top = window.innerHeight - rocket.offsetHeight;
		rocket.style.top = `${rocketPosition.top}px`;
	}
});

// Function to create a chicken
function createChicken(x, y) {
	const chicken = document.createElement("div");
	chicken.classList.add("chicken");
	chicken.style.left = `${x}px`;
	chicken.style.top = `${y}px`;
	chickensArea.appendChild(chicken);
}

// Create multiple chickens in random positions
function spawnChickens(count) {
	for (let i = 0; i < count; i++) {
		const x = Math.random() * (window.innerWidth - 60);
		const y = Math.random() * (window.innerHeight / 2 - 70);
		createChicken(x, y);
	}
}

spawnChickens(10);

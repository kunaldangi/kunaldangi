const audio = document.getElementById("myAudio");
audio.volume = 0.2;
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 4 + 1;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        snowflakes.push(new Snowflake());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach((flake) => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animate);
}

createSnowflakes();
animate();
let autoplayBlocked = false;

window.addEventListener("resize", () => {
    location.reload(); // Reloads the page on window resize in order to reinitialize the canvas size (height and width)
    autoplayBlocked = false; // Reset the autoplayBlocked flag
    document.getElementById("id-audio--play").style.display = "none";
    document.getElementById("id-audio--pause").style.display = "block";
});

document.addEventListener('DOMContentLoaded', function () {
    audio.play().catch((error) => {
        console.log("Autoplay failed:", error);
        autoplayBlocked = true;
        document.getElementById("id-audio--play").style.display = "none";
        document.getElementById("id-audio--pause").style.display = "block";
    });
    
    // Listen for user interaction (Disable Audio! at interaction)
    // document.addEventListener("click", () => playAfterInteraction("click"));
    // document.addEventListener("keydown", () => playAfterInteraction("keydown"));
    // document.addEventListener("touchstart", () => playAfterInteraction("touchstart"));
});

function playAudio() {
    if (audio.paused) {
        audio.play();
        document.getElementById("id-audio--play").style.display = "block";
        document.getElementById("id-audio--pause").style.display = "none";
    }
    else {
        audio.pause();
        document.getElementById("id-audio--play").style.display = "none";
        document.getElementById("id-audio--pause").style.display = "block";
    }
}


function playAfterInteraction(event) {
    if (autoplayBlocked) {
        autoplayBlocked = false;
        playAudio();
    }

    // Remove listeners once triggered
    document.removeEventListener("click", playAfterInteraction);
    document.removeEventListener("keydown", playAfterInteraction);
    document.removeEventListener("touchstart", playAfterInteraction);
}

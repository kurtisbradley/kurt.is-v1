/*--------------------------------------------------------------
Create Magic
--------------------------------------------------------------*/

// variables
const MAX_CANVAS_WIDTH = 400;
const MAX_CANVAS_HEIGHT = 1500;
const NUM_PARTICLES = 200;
const PARTICLE_COLOURS = [
    "#6272a4",
    "#8be9fd",
    "#50fa7b",
    "ffb86c",
    "#ff79c6",
    "#bd93f9",
    "#f1fa8c"
];
//const PARTICLE_COLOURS = ["#282a36", "#6272a4", "#8be9fd", "#50fa7b", "ffb86c", "#ff79c6", "#bd93f9", "#ff5555", "#f1fa8c"];

// create magic when the user demands it
function createMagic() {
    // magic element
    const magic = document.querySelector(".magic-create");

    // get center of element
    const originX = magic.offsetLeft + magic.offsetWidth / 2.0;
    const originY = magic.offsetTop + magic.offsetHeight / 2.0;

    // determine dimensions, ensuring it doesn't exceed screen bounds
    const bounds = (window.screen.width - (magic.offsetLeft + magic.offsetWidth) + magic.offsetWidth / 2) * 2;
    const width = Math.min(MAX_CANVAS_WIDTH, window.screen.width - 1, bounds);
    const bottom = window.scrollY + window.innerHeight;
    const height = Math.min(MAX_CANVAS_HEIGHT, (bottom - originY) * 2);

    // create and position the canvas
    let c = document.createElement("canvas");
    c.style.position = "absolute";
    c.style.left = `${originX - width / 2.0}px`;
    c.style.top = `${originY - height / 2.0}px`;
    c.style.pointerEvents = "none";
    c.style.width = `${width}px`;
    c.style.height = `${height}px`;
    c.style.zIndex = 1;

    // canvas draw area is multiplied by the device pixel ratio.
    let ratio = window.devicePixelRatio;
    c.width = width * ratio;
    c.height = height * ratio;

    // Add canvas to the document
    document.body.appendChild(c);

    // generate the particles
    let particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
            x: c.width / 2.0,
            y: c.height / 2.0 + (Math.random() * 30 + 15),
            radius: rand(3, 10),
            color:
                PARTICLE_COLOURS[
                    Math.floor(Math.random() * PARTICLE_COLOURS.length)
                ],
            rotation: rand(0, 360, true),
            speed: rand(6, 12),
            friction: 0.99,
            fade: 0.3,
            opacity: rand(150, 150, true),
            yVel: 3,
            gravity: 1
        });
    }

    renderParticles(particles, c);
    setTimeout(() => document.body.removeChild(c), 500);
}

// render a frame of the particles
function renderParticles(particles, canvas) {
    if (document.body.contains(canvas)) {
        requestAnimationFrame(() => renderParticles(particles, canvas));
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
        p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
        p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

        p.opacity -= 0.005;
        p.speed *= p.friction;
        p.radius -= p.fade;
        p.yVel += p.gravity;
        p.y += p.yVel;

        if (p.opacity < 0 || p.radius < 0) return;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    });

    return ctx;
}

// helper to generate a random number in a range
function rand(a, b, c) {
    return parseFloat(
        (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
            c ? c : 0
        )
    );
}

export { createMagic };

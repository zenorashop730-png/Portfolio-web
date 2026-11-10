// Existing functions
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".details-container").forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 98%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power2.out"
    });
});

gsap.from(".section__text__p1, .section__text, .title, .section__pic-container", {
    scrollTrigger: {
        trigger: ".section__text__p1",
        start: "top 90%",
    },
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out"
});

document.querySelectorAll(".details-container, .contact-info-upper-container").forEach((card) => {
    card.style.transformStyle = "preserve-3d";
    card.style.transformOrigin = "center";

    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -10,
            scale: 1.03,
            rotationX: 4,
            rotationY: -4,
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
            ease: "power3.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.05)",
            duration: 0.5,
            ease: "power3.out"
        });
    });
});

// === Floating Lines Background (added at the end) ===
(function () {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let lines = [];

    const config = {
        lineCount: 5,
        lineDistance: 5,
        enabledWaves: { top: true, middle: true, bottom: true },
        colors: [
            'rgba(180, 180, 180, 0.5)',
            'rgba(150, 150, 150, 0.5)',
            'rgba(120, 120, 120, 0.5)',
            'rgba(90, 90, 90, 0.5)',
            'rgba(70, 70, 70, 0.5)'
        ]
    };

    class Wave {
        constructor(y, amplitude, frequency, speed, color) {
            this.y = y;
            this.amplitude = amplitude;
            this.frequency = frequency;
            this.speed = speed;
            this.color = color;
            this.phase = Math.random() * Math.PI * 2;
        }
        update() {
            this.phase += this.speed * 0.02;
        }
        draw(ctx, width) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            for (let x = 0; x <= width; x += 5) {
                const y = this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    function initLines() {
        lines = [];
        const spacing = config.lineDistance * 10;
        for (let i = 0; i < config.lineCount; i++) {
            let y;
            const section = Math.floor(i / (config.lineCount / 3));
            if (section === 0 && config.enabledWaves.top) {
                y = height * 0.2 + i * spacing;
            } else if (section === 1 && config.enabledWaves.middle) {
                y = height * 0.5 + (i - Math.floor(config.lineCount / 3)) * spacing;
            } else if (section === 2 && config.enabledWaves.bottom) {
                y = height * 0.8 + (i - Math.floor(2 * config.lineCount / 3)) * spacing;
            } else {
                y = height * 0.5 + (i - config.lineCount / 2) * spacing;
            }
            lines.push(new Wave(
                y,
                30 + Math.random() * 20,
                0.0015 + Math.random() * 0.001,
                0.4 + Math.random() * 0.6,
                config.colors[i % config.colors.length]
            ));
        }
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initLines();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        lines.forEach(line => {
            line.update();
            line.draw(ctx, width);
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
})();
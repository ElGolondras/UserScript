// ==UserScript==
// @name         ElGolondras GitHub FX
// @namespace    https://github.com/ElGolondras
// @version      1.0
// @description  Efectos visuales en el perfil de GitHub: partículas, Matrix, cursor y glow
// @author       ElGolondras
// @match        https://github.com/ElGolondras
// @match        https://github.com/ElGolondras/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ─────────────────────────────────────────────
    //  1. CURSOR PERSONALIZADO
    // ─────────────────────────────────────────────
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    cursorOuter.id = 'cursor-outer';
    cursorInner.id = 'cursor-inner';
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorInner.style.left = mouseX + 'px';
        cursorInner.style.top  = mouseY + 'px';
    });

    // Suavizar movimiento del cursor exterior
    function animateCursor() {
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top  = outerY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOuter.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOuter.classList.remove('hover'));
    });

    // ─────────────────────────────────────────────
    //  2. PARTÍCULAS FLOTANTES
    // ─────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = document.body.scrollHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const PARTICLE_COUNT = 90;
    const particles = [];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x     = Math.random() * canvas.width;
            this.y     = Math.random() * canvas.height;
            this.size  = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.alpha  = Math.random() * 0.6 + 0.1;
            this.color  = Math.random() > 0.5 ? '37,99,235' : '148,163,184';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    // Conectar partículas cercanas con líneas
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(37,99,235,${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ─────────────────────────────────────────────
    //  3. EFECTO MATRIX EN EL HEADER
    // ─────────────────────────────────────────────
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-canvas';
    document.body.prepend(matrixCanvas);
    const mctx = matrixCanvas.getContext('2d');

    function resizeMatrix() {
        matrixCanvas.width  = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);

    const chars    = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789</>{}[]';
    const fontSize = 13;
    let cols  = Math.floor(matrixCanvas.width / fontSize);
    let drops = Array(cols).fill(1);

    window.addEventListener('resize', () => {
        cols  = Math.floor(matrixCanvas.width / fontSize);
        drops = Array(cols).fill(1);
    });

    function drawMatrix() {
        mctx.fillStyle = 'rgba(0,0,0,0.04)';
        mctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            mctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#2563EB';
            mctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 45);

    // ─────────────────────────────────────────────
    //  4. GLOW EN EL AVATAR
    // ─────────────────────────────────────────────
    const GIF_URL = 'https://raw.githubusercontent.com/ElGolondras/ElGolondras/main/avatar.gif';

    function applyAvatarGlow() {
        const avatar = document.querySelector('.avatar, .avatar-user, img[alt="@ElGolondras"]');
        if (avatar) {
            // Reemplazar imagen estática por GIF animado
            avatar.src = GIF_URL;
            avatar.style.borderRadius = '50%';
            avatar.style.animation    = 'avatarPulse 2s ease-in-out infinite';
            avatar.style.objectFit    = 'cover';

            // Forzar también el srcset para que no lo sobreescriba GitHub
            avatar.removeAttribute('srcset');

            avatar.addEventListener('mouseenter', () => {
                avatar.style.animation  = 'none';
                avatar.style.transform  = 'scale(1.12)';
                avatar.style.boxShadow  = '0 0 40px rgba(37,99,235,1), 0 0 80px rgba(37,99,235,0.6)';
                avatar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            avatar.addEventListener('mouseleave', () => {
                avatar.style.transform  = 'scale(1)';
                avatar.style.boxShadow  = '';
                avatar.style.transition = '';
                avatar.style.animation  = 'avatarPulse 2s ease-in-out infinite';
            });

            // Observar cambios por si GitHub recarga la imagen
            const observer = new MutationObserver(() => {
                if (avatar.src !== GIF_URL) {
                    avatar.src = GIF_URL;
                    avatar.removeAttribute('srcset');
                }
            });
            observer.observe(avatar, { attributes: true, attributeFilter: ['src', 'srcset'] });
        }
    }
    setTimeout(applyAvatarGlow, 1500);

    // ─────────────────────────────────────────────
    //  5. ESTILOS CSS
    // ─────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        * { cursor: none !important; }

        /* Canvas de partículas — fondo de toda la página */
        #particles-bg {
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 0;
            opacity: 0.5;
        }

        /* Canvas Matrix — pantalla completa */
        #matrix-canvas {
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1;
            opacity: 0.18;
        }

        /* Cursor exterior (anillo) */
        #cursor-outer {
            position: fixed;
            width: 36px;
            height: 36px;
            border: 2px solid rgba(37,99,235,0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 99999;
            transition: width 0.2s, height 0.2s, border-color 0.2s;
            mix-blend-mode: difference;
        }
        #cursor-outer.hover {
            width: 56px;
            height: 56px;
            border-color: rgba(255,255,255,0.9);
        }

        /* Cursor interior (punto) */
        #cursor-inner {
            position: fixed;
            width: 6px;
            height: 6px;
            background: #2563EB;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 99999;
            box-shadow: 0 0 8px rgba(37,99,235,0.8);
        }

        /* Animación pulso avatar */
        @keyframes avatarPulse {
            0%   { box-shadow: 0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.2); transform: scale(1); }
            50%  { box-shadow: 0 0 25px rgba(37,99,235,0.9), 0 0 50px rgba(37,99,235,0.5), 0 0 80px rgba(37,99,235,0.2); transform: scale(1.05); }
            100% { box-shadow: 0 0 10px rgba(37,99,235,0.4), 0 0 20px rgba(37,99,235,0.2); transform: scale(1); }
        }

        /* Asegurar que el contenido quede por encima del canvas */
        .application-main,
        .Layout,
        header,
        .AppHeader {
            position: relative;
            z-index: 10;
        }
    `;
    document.head.appendChild(style);

})();
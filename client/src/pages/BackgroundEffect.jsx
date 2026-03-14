import React, { useRef, useEffect } from 'react';

const BackgroundEffect = ({isDarkMode}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        
        const logoSources = ['Render.svg', 'Vercel.svg', 'Netlify.svg', 'Aiven.svg'];
        const mouse = { x: null, y: null, radius: 150 };
        const images = [];
        let loadedCount = 0;

        const theme = {
            line: isDarkMode ? 'rgba(56, 189, 248, 0.15+)' : 'rgba(33, 53, 71, 0.08)',
            glow: isDarkMode ? 'rgba(56, 189, 248, 0.5)' : 'transparent',
            mouseLine: isDarkMode ? 'rgba(56, 189, 248, 0.3)' : 'rgba(33, 53, 71, 0.2)'
        };

       

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = window.innerWidth < 768 ? 14 : 18; 
                this.img = images[Math.floor(Math.random() * images.length)];
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.angle = 0;
                this.spin = Math.random() * 0.02 - 0.01;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.angle += this.spin;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                if (this.img.complete && this.img.naturalWidth !== 0) {
                    ctx.save();
                    
                    // Hover Glow Logic
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (isDarkMode) {
                        ctx.shadowBlur = dist < mouse.radius ? 10 : 0;
                        ctx.shadowColor = theme.glow;
                    }

                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);
                    ctx.globalAlpha = dist < mouse.radius ? 0.8 : 0.2; // Brighten on hover
                    ctx.drawImage(this.img, - this.size/2, - this.size/2, this.size, this.size);
                    ctx.restore();
                }
            }
        }

        const init = () => {
            particles = [];
            const count = window.innerWidth < 768 ? 12 : 25;
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        logoSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === logoSources.length) {
                    init();
                    animate();
                }
            };
            img.onerror = () => { loadedCount++; };
            images.push(img);
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.strokeStyle = theme.line;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse Connection
                if (mouse.x) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        ctx.strokeStyle = theme.mouseLine;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resize();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`fixed inset-0 -z-10 transition-colors duration-500bg-transparent`}
        />
    );
};

export default BackgroundEffect;
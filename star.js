 // --- Star Canvas Animation (replaces floating icons) ---
        const canvas = document.getElementById('stars');
        const ctx = canvas.getContext('2d');
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        let stars = [];
        function createStar() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.2 + 0.3,
                color: `rgba(255,255,255,${Math.random() * 0.5 + 0.3})`,
                speedX: (Math.random() - 0.5) * 0.08,
                speedY: (Math.random() - 0.5) * 0.08,
                opacity: Math.random() * 0.7 + 0.3
            };
        }
        const numStars = 160;
        function populateStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push(createStar());
            }
        }
        populateStars();
        function drawStar(star) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.fill();
            ctx.closePath();
        }
        function updateStar(star) {
            star.x += star.speedX;
            star.y += star.speedY;
            if (star.x > canvas.width) star.x = 0;
            if (star.x < 0) star.x = canvas.width;
            if (star.y > canvas.height) star.y = 0;
            if (star.y < 0) star.y = canvas.height;
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < stars.length; i++) {
                drawStar(stars[i]);
                updateStar(stars[i]);
            }
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', () => {
            resizeCanvas();
            populateStars();
        });

        // --- Floating FontAwesome Icon "Stars" ---
        const iconList = [
            'fa-chart-line', 'fa-globe', 'fa-microchip', 'fa-database', 'fa-key',
            'fa-network-wired', 'fa-atom', 'fa-robot', 'fa-microscope',
            'fa-brain', 'fa-lightbulb', 'fa-comments', 'fa-cogs', 'fa-shield-alt', 'fa-comment-dots', 
        ];
        const iconCount = 18;
        function generateIconPositions(n, min=8, max=92, minDist=12) {
            const points = [];
            let attempts = 0;
            while (points.length < n && attempts < n * 100) {
                const x = min + Math.random() * (max - min);
                const y = min + Math.random() * (max - min);
                let ok = true;
                for (const p of points) {
                    const dx = x - p.x;
                    const dy = y - p.y;
                    if (Math.sqrt(dx*dx + dy*dy) < minDist) {
                        ok = false;
                        break;
                    }
                }
                if (ok) points.push({x, y});
                attempts++;
            }
            while (points.length < n) {
                points.push({
                    x: min + Math.random() * (max - min),
                    y: min + Math.random() * (max - min)
                });
            }
            return points;
        }
        function createIconStars() {
            const iconStarsDiv = document.getElementById('icon-stars');
            iconStarsDiv.innerHTML = '';
            iconStarsDiv.style.position = 'fixed';
            iconStarsDiv.style.top = '0';
            iconStarsDiv.style.left = '0';
            iconStarsDiv.style.width = '100vw';
            iconStarsDiv.style.height = '100vh';
            iconStarsDiv.style.pointerEvents = 'none';
            iconStarsDiv.style.zIndex = '-1';
            const positions = generateIconPositions(iconCount, 8, 92, 12);
            const styleSheet = document.createElement('style');
            document.head.appendChild(styleSheet);
            for (let i = 0; i < iconCount; i++) {
                const icon = document.createElement('i');
                icon.className = `fas ${iconList[i % iconList.length]}`;
                icon.style.position = 'absolute';
                icon.style.top = `${positions[i].y}%`;
                icon.style.left = `${positions[i].x}%`;
                icon.style.fontSize = `${(Math.random() * 1.1 + 0.7).toFixed(2)}rem`;
                icon.style.color = 'rgba(255,255,255,0.23)';
                icon.style.opacity = (Math.random() * 0.4 + 0.5).toFixed(2);
                icon.style.filter = 'drop-shadow(0 0 6px rgba(255,255,255,0.18))';
                icon.style.pointerEvents = 'none';
                const animName = `iconFloat${i}`;
                const duration = (16 + Math.random() * 8).toFixed(2);
                const delay = (Math.random() * 8).toFixed(2);
                icon.style.animation = `${animName} ${duration}s ease-in-out ${delay}s infinite alternate`;
                function randOffset() {
                    return (Math.random() * 16 - 8).toFixed(1);
                }
                const kf = `
                    @keyframes ${animName} {
                        0%   { transform: translate(0px, 0px) scale(1);}
                        30%  { transform: translate(${randOffset()}px, ${randOffset()}px) scale(1.05);}
                        60%  { transform: translate(${randOffset()}px, ${randOffset()}px) scale(0.97);}
                        100% { transform: translate(0px, 0px) scale(1);}
                    }
                `;
                styleSheet.sheet.insertRule(kf, styleSheet.sheet.cssRules.length);
                iconStarsDiv.appendChild(icon);
            }
        }
        createIconStars();
        window.addEventListener('resize', createIconStars);



       
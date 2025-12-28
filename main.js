        // --- CONFIGURATION (EDIT HERE) ---
        const CONFIG = {
            password: "love123",
            startDate: "2025-08-24", // Your Anniversary Date (YYYY-MM-DD)
            introTexts: [
                "Every love story is beautiful, but ours is my favorite 📖",
                "You are the source of my joy and the center of my world 🌎",
                "I love you more than yesterday, but less than tomorrow 📈",
                "You are my sun, my moon, and all my stars ✨",
                "Being with you is the best feeling in the world ❤️"
            ],
            images: [
                "https://drive.google.com/thumbnail?id=1ZrqSYb-cSUZ8hqQwfKnxQMsHCpXIpnK2&sz=w1000",
                "https://drive.google.com/thumbnail?id=1uauSzWxg486-l6YSneM_W0ZUpfxYHXo1&sz=w1000",
                "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500"
            ]
        };

        // --- 1. LOGIN LOGIC ---
        function checkPass() {
            const input = document.getElementById('password');
            const error = document.getElementById('error');
            if (input.value === CONFIG.password) {
                document.getElementById('login-gate').style.opacity = 0;
                setTimeout(() => {
                    document.getElementById('login-gate').style.display = 'none';
                    startIntro();
                }, 800);
            } else {
                error.style.display = 'block';
                input.style.borderColor = 'red';
                // Shake animation
                input.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 300 });
            }
        }

        // --- 2. INTRO SEQUENCE ---
        function startIntro() {
            const overlay = document.getElementById('intro-overlay');
            const bg = document.getElementById('intro-bg');
            const textEl = document.getElementById('typing-text');
            const audio = document.getElementById('bg-music');

            overlay.style.display = 'flex';
            audio.volume = 0.5;
            audio.play().catch(() => console.log("User must interact first"));
            document.getElementById('music-btn').classList.add('playing');

            let step = 0;
            
            function nextSlide() {
                if (step >= CONFIG.introTexts.length) {
                    skipIntro();
                    return;
                }
                
                // Change BG Randomly
                bg.src = CONFIG.images[step % CONFIG.images.length];
                
                // Typewriter Effect
                textEl.innerHTML = "";
                let txt = CONFIG.introTexts[step];
                let i = 0;
                let typeInterval = setInterval(() => {
                    if(i < txt.length) {
                        textEl.innerHTML += txt.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                        setTimeout(nextSlide, 3000); // Wait 3s before next
                    }
                }, 100); // Typing speed
                
                step++;
            }
            nextSlide();
        }

        function skipIntro() {
            const overlay = document.getElementById('intro-overlay');
            const main = document.getElementById('main-app');
            
            overlay.style.transition = 'opacity 1s';
            overlay.style.opacity = 0;
            
            setTimeout(() => {
                overlay.style.display = 'none';
                main.style.display = 'block';
                setTimeout(() => main.style.opacity = 1, 100);
                initGallery();
            }, 1000);
        }

        // --- 3. TIME TOGETHER COUNTER ---
        function updateTimer() {
            const start = new Date(CONFIG.startDate + "T00:00:00");
            const now = new Date();

            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();

            if (days < 0) {
                months--;
                days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const diff = now - start;
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById('years').innerText = years;
            document.getElementById('months').innerText = months;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
        }
        setInterval(updateTimer, 1000);

        // --- 4. GALLERY & LIGHTBOX ---
        function initGallery() {
            const container = document.getElementById('gallery-container');
            // Shuffle
            const shuffled = CONFIG.images.sort(() => 0.5 - Math.random());
            
            shuffled.forEach(src => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.onclick = () => openLightbox(src);
                div.innerHTML = `<img src="${src}" loading="lazy">`;
                container.appendChild(div);
            });
        }

        function openLightbox(src) {
            const lb = document.getElementById('lightbox');
            const img = document.getElementById('lightbox-img');
            img.src = src;
            lb.style.display = 'flex';
        }

        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }

        // --- 5. INTERACTIVE HEARTS ---
        function createHeart(e) {
            // Don't spawn if clicking button/input
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;

            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1000);
        }

        // --- 6. MUSIC CONTROL ---
        function toggleMusic() {
            const audio = document.getElementById('bg-music');
            const btn = document.getElementById('music-btn');
            if (audio.paused) {
                audio.play();
                btn.classList.add('playing');
            } else {
                audio.pause();
                btn.classList.remove('playing');
            }
        }
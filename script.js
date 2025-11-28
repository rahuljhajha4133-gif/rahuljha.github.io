document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU LOGIC (FIXED) ---
    
    // हम function को 'window' के साथ जोड़ रहे हैं ताकि HTML उसे पढ़ सके
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('navMenu');
        const icon = document.getElementById('mobileMenuBtn');
        
        // Menu ko On/Off karo
        menu.classList.toggle('active');

        // Icon badlo (☰ se ✕)
        if (menu.classList.contains('active')) {
            icon.innerHTML = '&#10005;'; // Cross (X) Sign
        } else {
            icon.innerHTML = '&#9776;'; // 3 Lines (Hamburger)
        }
    };

    // Link par click karne se menu band ho jaye
    window.closeMenu = function() {
        const menu = document.getElementById('navMenu');
        const icon = document.getElementById('mobileMenuBtn');
        
        menu.classList.remove('active');
        icon.innerHTML = '&#9776;'; // Wapas 3 lines
    };

    // --- 2. GALLERY LOGIC (Saree Photos) ---
    const products = {
        'saree1': { 
            name: 'Emerald Green Royal Silk', 
            price: '1200', 
            desc: 'Perfect for weddings with heavy Zari work.', 
            images: ['saree1.jpg', 'saree1-1.jpg',] 
        },
        'saree2': { 
            name: 'Regal Purple Silk', 
            price: '1500', 
            desc: 'Elegant evening wear with intricate embroidery.', 
            images:  ['saree2.jpg', 'saree2-2.jpg',]
        },
        'saree3': { 
            name: 'Lavender Leaf Embroidery', 
            price: '1000', 
            desc: 'Lightweight modern georgette.', 
            images: ['saree3.jpg', 'saree3-3.jpg',]
        },
        'saree4': { 
            name: 'Peach Soft Silk Designer', 
            price: '999', 
            desc: 'Festive special edition.', 
            images: ['saree4.jpg', 'saree4-4.jpg',] 
        }
    };

    window.openGallery = function(id) {
        const p = products[id];
        if(!p) return;

        document.getElementById('galleryTitle').innerText = p.name;
        document.getElementById('galleryDesc').innerText = p.desc;
        document.getElementById('galleryPrice').innerText = '₹' + p.price;
        document.getElementById('mainImg').src = p.images[0];
        
        document.getElementById('whatsappBtn').onclick = function() {
            let url = `https://wa.me/916268281490?text=I want to buy: ${p.name} Price: ₹${p.price}`;
            window.open(url, '_blank');
        };

        const container = document.getElementById('thumbContainer');
        container.innerHTML = '';
        p.images.forEach(imgSrc => {
            let img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'thumb';
            img.onclick = function() { document.getElementById('mainImg').src = imgSrc; };
            container.appendChild(img);
        });

        openModal('modal-gallery');
    };

    // --- 3. MODAL LOGIC (Popups) ---
    window.openModal = function(id) { 
        const modal = document.getElementById(id);
        if(modal) {
            modal.classList.add('open'); 
            document.body.style.overflow='hidden'; 
        }
    };

    window.closeModal = function(id) { 
        const modal = document.getElementById(id);
        if(modal) {
            modal.classList.remove('open'); 
            document.body.style.overflow='auto'; 
        }
    };

    // Bahar click karne par band ho
    window.onclick = function(e) { 
        if(e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('open'); 
            document.body.style.overflow='auto';
        } 
    };

    // --- 4. CHATBOT ---
    window.toggleChat = function() {
        const w = document.getElementById('chatWindow');
        w.style.display = (w.style.display === 'flex') ? 'none' : 'flex';
    };

    window.sendMessage = function() {
        const input = document.getElementById('chatInput');
        const body = document.getElementById('chatBody');
        const txt = input.value.toLowerCase();
        if(!txt) return;

        body.innerHTML += `<div class="user-msg">${input.value}</div>`;
        input.value = '';

        setTimeout(() => {
            let reply = "Contact WhatsApp: +91 6268281490";
            if(txt.includes('price') || txt.includes('kitne')) reply = "Starting ₹899.";
            else if(txt.includes('hi') || txt.includes('hello')) reply = "Namaste!";
            else if(txt.includes('return')) reply =  "Thank you so much for choosing us! We follow a no-return policy because each item is prepared and quality-checked individually. But don't worry — if there is any issue (wrong product, damage, size mismatch), just contact us within 24 hours and we'll help you immediately. 😊";
            
            body.innerHTML += `<div class="bot-msg">${reply}</div>`;
            body.scrollTop = body.scrollHeight;
        }, 800);
    };

    // --- 5. EXTRAS (Scroll & WhatsApp) ---
    window.buyOnWhatsapp = function(sareeName, price) {
        let url = `https://wa.me/916268281490?text=I want to buy: ${sareeName} Price: ₹${price}`;
        window.open(url, '_blank');
    };

    // Scroll Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
    });
    revealElements.forEach(el => observer.observe(el));

    // Back to Top & Navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        const backBtn = document.getElementById('backToTop');
        
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 1)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        }

        if(backBtn) {
            backBtn.style.opacity = window.scrollY > 500 ? '1' : '0';
        }
    });

    const backBtn = document.getElementById('backToTop');
    if(backBtn) {
        backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }
});
// --- LOGIN & SIGNUP SYSTEM (Local Storage) ---

    // 1. SIGN UP (Account Banana)
    const signupForm = document.getElementById('signupForm');
    if(signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Page reload roko
            
            // User ka data uthao
            let name = document.getElementById('signName').value;
            let email = document.getElementById('signEmail').value;
            let pass = document.getElementById('signPass').value;

            // Browser me save karo (Local Storage)
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPass', pass);
            localStorage.setItem('isLoggedIn', 'true'); // Auto login

            alert('Account Created! Welcome ' + name);
            closeModal('modal-signup');
            updateUserUI(); // Screen update karo
        });
    }

    // 2. LOGIN (Purana account kholna)
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let email = document.getElementById('loginEmail').value;
            let pass = document.getElementById('loginPass').value;

            // Check karo ki sahi hai ya nahi
            let storedEmail = localStorage.getItem('userEmail');
            let storedPass = localStorage.getItem('userPass');
            let storedName = localStorage.getItem('userName');

            if(email === storedEmail && pass === storedPass) {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login Successful! Welcome back, ' + storedName);
                closeModal('modal-login');
                updateUserUI();
            } else {
                // Agar account nahi hai to bhi Guest banke login kar do (Demo ke liye)
                alert('Login Successful (Guest Mode)');
                localStorage.setItem('userName', 'Guest');
                localStorage.setItem('isLoggedIn', 'true');
                closeModal('modal-login');
                updateUserUI();
            }
        });
    }

    // 3. LOGOUT (Bahar nikalna)
    window.logoutUser = () => {
        localStorage.removeItem('isLoggedIn'); // Login hatao
        alert('Logged Out Successfully.');
        updateUserUI(); // Screen wapas purani karo
    };

    // 4. CHECK STATUS (Page khulte hi dekhna ki login hai ya nahi)
    function updateUserUI() {
        const authBtns = document.getElementById('auth-buttons');
        const userProfile = document.getElementById('user-profile');
        const displayName = document.getElementById('display-name');
        
        // Agar Login hai to...
        if (localStorage.getItem('isLoggedIn') === 'true') {
            if(authBtns) authBtns.style.display = 'none'; // Buttons chupao
            if(userProfile) {
                userProfile.style.display = 'flex'; // Naam dikhao
                displayName.textContent = localStorage.getItem('userName') || 'User';
            }
        } else {
            // Agar Login nahi hai to...
            if(authBtns) authBtns.style.display = 'flex'; // Buttons dikhao
            if(userProfile) userProfile.style.display = 'none'; // Naam chupao
        }
    }

    // Page load hote hi check karo
    updateUserUI();

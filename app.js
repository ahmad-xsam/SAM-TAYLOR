document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax Effect for Hero Background
        if (heroBg && scrollY <= window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.classList.remove('active');
            
            // Smooth scroll for anchor links
            if(link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if(targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .catalog-item');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Catalog Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const catalogItems = document.querySelectorAll('.catalog-item');

    // Show all items initially
    catalogItems.forEach(item => item.classList.add('show'));

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            catalogItems.forEach(item => {
                item.classList.remove('show');
                
                // Small timeout for animation effect
                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.add('show');
                    }
                }, 50);
            });
        });
    });

    // Studio Pola (Interactive Pattern Studio)
    const genderSelect = document.getElementById('gender-select');
    const modelSelect = document.getElementById('model-select');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const patternSwatches = document.querySelectorAll('.pattern-swatch');
    const clothingMask = document.getElementById('clothing-mask');
    const accManik = document.getElementById('acc-manik');
    const accBordir = document.getElementById('acc-bordir');
    const accLayer = document.getElementById('acc-layer');

    const modelsData = {
        wanita: [
            { name: 'Abaya', path: 'assets/images/pattern_abaya.png' },
            { name: 'Gamis', path: 'assets/images/pattern_abaya.png' }, // Reusing outline for demo
            { name: 'Blus Wanita', path: 'assets/images/pattern_blus.png' }
        ],
        pria: [
            { name: 'Jas Pria', path: 'assets/images/pattern_jas.png' },
            { name: 'Kemeja Pria', path: 'assets/images/pattern_kemeja.png' },
            { name: 'Batik Pria', path: 'assets/images/pattern_kemeja.png' } // Reusing for batik pattern
        ]
    };

    function populateModels() {
        const gender = genderSelect.value;
        const models = modelsData[gender];
        
        modelSelect.innerHTML = '';
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.path;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });

        // Trigger change to update mask
        modelSelect.dispatchEvent(new Event('change'));
    }

    genderSelect.addEventListener('change', populateModels);

    // Change Model Pattern
    modelSelect.addEventListener('change', (e) => {
        const selectedModel = e.target.value;
        clothingMask.style.webkitMaskImage = `url('${selectedModel}')`;
        clothingMask.style.maskImage = `url('${selectedModel}')`;
        accLayer.style.webkitMaskImage = `url('${selectedModel}')`;
    });

    // Initialize models
    populateModels();

    // Change Color
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            const color = swatch.getAttribute('data-color');
            clothingMask.style.backgroundColor = color;
        });
    });

    // Change Pattern (Batik)
    patternSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            patternSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            const pattern = swatch.getAttribute('data-pattern');
            if (pattern === 'none') {
                clothingMask.style.backgroundImage = 'none';
            } else {
                clothingMask.style.backgroundImage = `url('${pattern}')`;
            }
        });
    });

    // Toggle Accessories
    function updateAccessories() {
        if (accManik.checked || accBordir.checked) {
            accLayer.classList.add('show');
            // Simplified logic: just showing a golden dotted layer to represent accessories
            if (accBordir.checked && !accManik.checked) {
                accLayer.style.backgroundImage = 'linear-gradient(45deg, transparent 45%, rgba(212,175,55,0.8) 45%, rgba(212,175,55,0.8) 55%, transparent 0)';
                accLayer.style.backgroundSize = '10px 10px';
            } else if (accManik.checked && !accBordir.checked) {
                accLayer.style.backgroundImage = 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.8) 2px, transparent 3px)';
                accLayer.style.backgroundSize = '15px 15px';
            } else {
                accLayer.style.backgroundImage = 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.8) 2px, transparent 3px), linear-gradient(45deg, transparent 45%, rgba(212,175,55,0.4) 45%, rgba(212,175,55,0.4) 55%, transparent 0)';
            }
        } else {
            accLayer.classList.remove('show');
        }
    }

    accManik.addEventListener('change', updateAccessories);
    accBordir.addEventListener('change', updateAccessories);
});

// Declercq Stortbeton - Main JavaScript

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.style.opacity = '1';
            } else {
                slide.classList.remove('active');
                slide.style.opacity = '0';
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance slider every 5 seconds
    let sliderInterval = setInterval(nextSlide, 5000);
    
    // Slider controls
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(sliderInterval);
            prevSlide();
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(sliderInterval);
            nextSlide();
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-scroll elements
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observe counter elements
    const counterSections = document.querySelectorAll('.counter');
    counterSections.forEach(counter => {
        const parent = counter.closest('section') || counter.closest('div');
        if (parent && !parent.classList.contains('observed')) {
            parent.classList.add('observed');
            observer.observe(parent);
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSlides = document.querySelectorAll('.hero-slide img');
        
        heroSlides.forEach(slide => {
            const speed = 0.5;
            slide.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', function() {
                img.classList.remove('loading');
            });
        }
    });
    
    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Gelieve alle verplichte velden in te vullen.');
            }
        });
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add animation to buttons on hover
    const buttons = document.querySelectorAll('a[class*="bg-declercq-green"], button[class*="bg-declercq-green"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 86, 63, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Beton Calculator
    const calcButton = document.getElementById('calc-button');
    const calcReset = document.getElementById('calc-reset');
    const calcLength = document.getElementById('calc-length');
    const calcWidth = document.getElementById('calc-width');
    const calcDepth = document.getElementById('calc-depth');
    const calcMargin = document.getElementById('calc-margin');
    const calcResult = document.getElementById('calc-result');
    const calcResultValue = document.getElementById('calc-result-value');
    const calcResultMargin = document.getElementById('calc-result-margin');
    
    if (calcButton) {
        calcButton.addEventListener('click', function() {
            const length = parseFloat(calcLength.value);
            const width = parseFloat(calcWidth.value);
            const depth = parseFloat(calcDepth.value);
            const margin = parseFloat(calcMargin.value);
            
            if (isNaN(length) || isNaN(width) || isNaN(depth)) {
                alert('Gelieve alle velden in te vullen met geldige getallen.');
                return;
            }
            
            if (length <= 0 || width <= 0 || depth <= 0) {
                alert('Alle waarden moeten groter zijn dan 0.');
                return;
            }
            
            // Calculate volume: length (m) * width (m) * depth (cm) / 100
            const baseVolume = length * width * (depth / 100);
            const volumeWithMargin = baseVolume * (1 + margin / 100);
            
            // Display result with animation
            calcResultValue.textContent = volumeWithMargin.toFixed(2);
            calcResultMargin.textContent = margin;
            calcResult.classList.remove('hidden');
            
            // Animate the result
            calcResult.style.opacity = '0';
            calcResult.style.transform = 'translateY(20px)';
            setTimeout(() => {
                calcResult.style.transition = 'all 0.5s ease-out';
                calcResult.style.opacity = '1';
                calcResult.style.transform = 'translateY(0)';
            }, 10);
            
            // Animate the number
            animateValue(calcResultValue, 0, volumeWithMargin, 1000);
        });
    }
    
    if (calcReset) {
        calcReset.addEventListener('click', function() {
            calcLength.value = '';
            calcWidth.value = '';
            calcDepth.value = '';
            calcMargin.value = '5';
            calcResult.classList.add('hidden');
        });
    }
    
    // Animate value counting up
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const startValue = start;
        const endValue = end;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuad = progress * (2 - progress);
            const currentValue = startValue + (endValue - startValue) * easeOutQuad;
            
            element.textContent = currentValue.toFixed(2);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Console message
    console.log('%c Declercq Stortbeton ', 'background: #00563F; color: white; font-size: 20px; padding: 10px;');
    console.log('Website gebouwd met HTML, CSS, JavaScript en Tailwind CSS');
    
    // Performance monitoring
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
    
    // Add click tracking (for analytics)
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (target) {
            const text = target.textContent.trim();
            const href = target.getAttribute('href');
            console.log('Click:', text, href);
            // Here you could send to analytics
        }
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s';
            setTimeout(() => {
                document.body.style.transform = '';
            }, 2000);
            console.log('🎉 Konami code activated!');
        }
    });
    
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for external use
window.DeclercqWebsite = {
    version: '1.0.0',
    init: function() {
        console.log('Declercq Website initialized');
    }
};

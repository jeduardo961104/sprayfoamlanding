// main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked (for better UX)
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Navbar Scroll Effect (Adds a shadow and solidifies background when scrolling down)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Optional: Form Submission Prevent Default for Demonstration
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulario de prueba enviado con éxito.');
        });
    }

    // 4. Smooth Scrolling for Anchor Links (with navbar offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 5. Scroll Reveal Animation (Efecto de deslizamiento)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animamos títulos, tarjetas, beneficios y detalles de contacto
    const animatedElements = document.querySelectorAll('.section-title, .card, .benefit-item, .features-list li, .contact-detail');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Pequeño retraso en cascada para que no aparezcan todos al mismo tiempo
        el.style.transitionDelay = `${(index % 5) * 0.1}s`;
        observer.observe(el);
    });

    // 6. Dark/Light Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                // Switch to Dark
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                // Switch to Light
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        });
    }

    // 7. Hero Background Carousel
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

});


// Default configuration
const defaultConfig = {
    hero_title: 'Arian',
    hero_subtitle: 'Full Stack Web Developer',
    hero_description: 'Crafting exceptional digital experiences with clean code and creative design. Transforming ideas into powerful, scalable web applications. Let\'s build something amazing together!',
    phone_number: '03286575000',
    service_1_title: 'Web Development',
    service_2_title: 'Mobile Apps',
    service_3_title: 'Backend Solutions',
    cta_text: 'Get Started Now',
    background_color: '#0a0a0f',
    surface_color: '#13131a',
    text_color: '#f4f4f5',
    accent_primary: '#6366f1',
    accent_secondary: '#22d3ee',
    font_family: 'Outfit',
    font_size: 16
};

// Mobile menu functionality (Dead code removed)

// Config change handler
async function onConfigChange(config) {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroDescription = document.getElementById('heroDescription');
    const phoneLink = document.getElementById('phoneLink');
    const ctaButton = document.getElementById('ctaButton');

    // Services Config
    const service1 = document.getElementById('service_1_title');
    const service2 = document.getElementById('service_2_title');
    const service3 = document.getElementById('service_3_title');

    if (heroTitle) {
        heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
    }

    if (heroSubtitle) {
        heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    }

    if (heroDescription) {
        heroDescription.textContent = config.hero_description || defaultConfig.hero_description;
    }

    if (phoneLink) {
        const phone = config.phone_number || defaultConfig.phone_number;
        phoneLink.href = `tel:${phone}`;
    }

    if (service1) service1.textContent = config.service_1_title || defaultConfig.service_1_title;
    if (service2) service2.textContent = config.service_2_title || defaultConfig.service_2_title;
    if (service3) service3.textContent = config.service_3_title || defaultConfig.service_3_title;

    if (ctaButton) {
        ctaButton.textContent = (config.cta_text || defaultConfig.cta_text) + ' ';
        const icon = document.createElement('i');
        icon.className = 'fas fa-arrow-right';
        ctaButton.appendChild(icon);
    }

    // Apply colors
    const bgColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const accentPrimary = config.accent_primary || defaultConfig.accent_primary;
    const accentSecondary = config.accent_secondary || defaultConfig.accent_secondary;

    document.documentElement.style.setProperty('--bg-primary', bgColor);
    document.documentElement.style.setProperty('--surface', surfaceColor);
    document.documentElement.style.setProperty('--text-primary', textColor);
    document.documentElement.style.setProperty('--accent-primary', accentPrimary);
    document.documentElement.style.setProperty('--accent-secondary', accentSecondary);

    document.body.style.background = bgColor;
    document.body.style.color = textColor;

    // Apply font
    const fontFamily = config.font_family || defaultConfig.font_family;
    const baseFontStack = 'system-ui, sans-serif';
    document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

    // Apply font size
    const baseSize = config.font_size || defaultConfig.font_size;
    document.documentElement.style.fontSize = `${baseSize}px`;
}

// Map config to capabilities
function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                }
            },
        ],
    };
}

// Initialize SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities
    });
}

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length === 0) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileBottomLinks = document.querySelectorAll('.mobile-nav-item');

    if (sections.length === 0) return;

    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        mobileBottomLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
});

// Highlight active page in bottom nav based on URL if not scrolling (initial load)
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    const mobileBottomLinks = document.querySelectorAll('.mobile-nav-item');
    mobileBottomLinks.forEach(link => {
        if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Custom Animation Observer (Replacing AOS)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial check for elements with data-aos
    const animatedElements = document.querySelectorAll('[data-aos], .reveal-text');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ------------------------------------
    // Blog Filtering Logic
    // ------------------------------------
    const searchInput = document.getElementById('searchInput');
    const articlesGrid = document.getElementById('articlesGrid');

    if (searchInput && articlesGrid) {
        const tagButtons = document.querySelectorAll('.btn-tag');
        const articleCards = document.querySelectorAll('.article-card');
        const noResults = document.getElementById('noResults');
        let currentTag = 'all';

        function filterArticles() {
            const searchTerm = searchInput.value.toLowerCase();
            let visibleCount = 0;

            articleCards.forEach((card) => {
                const articleTag = card.getAttribute('data-tag');
                const titleEl = card.querySelector('.article-title');
                const excerptEl = card.querySelector('.article-excerpt');

                const titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
                const excerptText = excerptEl ? excerptEl.textContent.toLowerCase() : '';

                const matchesSearch = titleText.includes(searchTerm) || excerptText.includes(searchTerm);
                const matchesTag = currentTag === 'all' || articleTag === currentTag;

                if (matchesSearch && matchesTag) {
                    card.style.display = 'flex';
                    card.classList.remove('active');
                    void card.offsetWidth;
                    card.classList.add('active');

                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                if (noResults) noResults.style.display = 'block';
                articlesGrid.style.gridTemplateColumns = '1fr';
            } else {
                if (noResults) noResults.style.display = 'none';
                articlesGrid.style.gridTemplateColumns = '';
            }
        }

        searchInput.addEventListener('input', filterArticles);

        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentTag = button.getAttribute('data-tag');
                filterArticles();
            });
        });
    }

    // ------------------------------------
    // Portfolio Filtering Logic
    // ------------------------------------
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {
        const filterButtons = document.querySelectorAll('.btn-filter');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    // Reset styling for non-active buttons (optional, handled by CSS mostly)
                    if (btn !== button) {
                        btn.style.backgroundColor = 'transparent';
                        btn.style.color = '#9ca3af'; // gray-400
                        btn.style.borderColor = '#374151'; // gray-700
                    }
                });

                button.classList.add('active');
                // Apply active styling dynamically if CSS classes aren't enough or need overrides
                button.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                button.style.borderColor = '#6366f1';
                button.style.color = '#ffffff';

                const filterValue = button.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger animation
                        card.classList.remove('active');
                        void card.offsetWidth;
                        card.classList.add('active');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ------------------------------------
    // FAQ Accordion Logic
    // ------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('i');

        if (button && content && icon) {
            button.addEventListener('click', () => {
                const isOpen = content.style.maxHeight;

                // Close all others (optional - for accordion effect)
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('i');
                    if (otherContent !== content) {
                        otherContent.style.maxHeight = null;
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                if (isOpen) {
                    content.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

});

// ------------------------------------
// Liquid Mobile Navigation Logic
// ------------------------------------
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const indicator = document.querySelector('.mobile-nav-indicator');

function moveIndicator(item) {
    if (!indicator || !item) return;

    // Calculate position relative to container
    // Since it's flex, we can just use offsetLeft + width/2
    const itemRect = item.getBoundingClientRect();
    const containerRect = item.parentElement.getBoundingClientRect();

    const offsetLeft = itemRect.left - containerRect.left;
    const centerPos = offsetLeft + (itemRect.width / 2) - (indicator.offsetWidth / 2);

    indicator.style.left = `${centerPos}px`;
}

// Initialize position on load
const activeItem = document.querySelector('.mobile-nav-item.active');

function updateIndicator() {
    const active = document.querySelector('.mobile-nav-item.active');
    if (active) moveIndicator(active);
}

if (activeItem) {
    // Multiple checks to ensure layout is settled
    setTimeout(updateIndicator, 50);
    setTimeout(updateIndicator, 200);
    setTimeout(updateIndicator, 500);

    // Also move on resize and orientation change
    window.addEventListener('resize', updateIndicator);
    window.addEventListener('orientationchange', () => setTimeout(updateIndicator, 100));
}

mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Remove active from all
        mobileNavItems.forEach(nav => nav.classList.remove('active'));
        // Add to clicked
        item.classList.add('active');
        moveIndicator(item);
    });
});

// ------------------------------------
// Custom Cursor Logic
// ------------------------------------
// Create elements
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    document.body.appendChild(cursorOutline);

    // Movement
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (handled by CSS transition or simple JS animate)
        // For smoother performance, we use keyframes or just direct update with CSS transition
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Hover Effects
    const hoverables = document.querySelectorAll('a, button, .clickable, .mobile-nav-item, .portfolio-card, .service-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });
}

// ------------------------------------
// Typing Animation Logic
// ------------------------------------
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        if (!text) return;

        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50); // Typing speed
            }
        }

        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

// ------------------------------------
// Stats Counter Logic
// ------------------------------------
function initStatsCounter() {
    const stats = document.querySelectorAll('.counter-stat');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (isNaN(target)) return;

                const duration = 2000; // Animation duration in ms
                const step = Math.max(1, Math.ceil(target / (duration / 16))); // Ensure at least 1
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = current;
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize Animations on Load
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initStatsCounter();
});



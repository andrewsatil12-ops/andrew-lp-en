document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const gridItems = document.querySelectorAll('.grid-item');
    const backToTopBtn = document.getElementById('back-to-top');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const logoLink = document.querySelector('.logo-link');

    // Mobile Menu Toggle Logic
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('mobile-active');
        });
    }

    // Core Tab Switcher Function
    function activateTab(btn, pushToHistory = true) {
        if (!btn) return;

        const targetViewId = btn.getAttribute('data-target');
        const filterValue = btn.getAttribute('data-filter');
        const path = btn.getAttribute('data-path') || '/';

        // 1. Update Active State on Buttons
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Close mobile menu on nav click
        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('mobile-active');
        }

        // 2. View Switching
        views.forEach(view => {
            if (view.id === `view-${targetViewId}`) {
                view.classList.add('active-view');
            } else {
                view.classList.remove('active-view');
            }
        });

        // 3. Grid Filtering (if target is home)
        if (targetViewId === 'home') {
            gridItems.forEach(item => {
                if (filterValue === 'all') {
                    // On Home view, only show items with data-featured="true"
                    if (item.getAttribute('data-featured') === 'true') {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                }
            });

            // 4. Tab CTA Filtering
            const tabCtas = document.querySelectorAll('.tab-cta');
            tabCtas.forEach(cta => {
                const targetFilter = cta.getAttribute('data-filter-target');
                if (targetFilter === filterValue) {
                    cta.classList.remove('hide');
                } else {
                    cta.classList.add('hide');
                }
            });
        }

        // 5. History API Push State
        if (pushToHistory && window.location.pathname !== path) {
            history.pushState({ path }, '', path);
        }

        // Scroll to top when changing views
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Path Router (Maps URL pathname to nav button)
    function routeFromLocation(pushToHistory = false) {
        const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
        
        let matchingBtn = document.querySelector(`.nav-btn[data-path="${rawPath}"]`);
        
        if (!matchingBtn) {
            // Fallback match for root or index.html
            matchingBtn = document.querySelector('.nav-btn[data-path="/"]');
        }

        if (matchingBtn) {
            activateTab(matchingBtn, pushToHistory);
        }
    }

    // Navigation Buttons Click Handlers
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(btn, true);
        });
    });

    // Logo Click Handler (Navigates to Home)
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const homeBtn = document.querySelector('.nav-btn[data-path="/"]');
            if (homeBtn) activateTab(homeBtn, true);
        });
    }

    // Browser Back / Forward Button Handler (popstate)
    window.addEventListener('popstate', () => {
        routeFromLocation(false);
    });

    // Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize Active View based on Current URL Path on Page Load
    routeFromLocation(false);

    // Auto-Crossfade Slideshow Logic (Viewport-Aware via IntersectionObserver)
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const slides = container.querySelectorAll('.slideshow-img');
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        let intervalId = null;

        const startSlideshow = () => {
            if (intervalId) return;
            intervalId = setInterval(() => {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }, 2000); // 2000ms = 2s interval
        };

        const stopSlideshow = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startSlideshow();
                    } else {
                        stopSlideshow();
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(container);
        } else {
            startSlideshow();
        }
    });
});

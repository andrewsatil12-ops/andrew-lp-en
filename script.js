document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const gridItems = document.querySelectorAll('.grid-item');
    const backToTopBtn = document.getElementById('back-to-top');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Mobile Menu Toggle Logic
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('mobile-active');
        });
    }

    // Navigation and Filtering Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Update Active State on Buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Close mobile menu on nav click
            if (mobileMenuToggle && mainNav) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('mobile-active');
            }

            // 2. View Switching
            const targetViewId = btn.getAttribute('data-target');
            views.forEach(view => {
                if (view.id === `view-${targetViewId}`) {
                    view.classList.add('active-view');
                } else {
                    view.classList.remove('active-view');
                }
            });

            // 3. Grid Filtering (if target is home)
            if (targetViewId === 'home') {
                const filterValue = btn.getAttribute('data-filter');
                
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
            }
            
            // Scroll to top when changing views
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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

    // Initialize filter state on page load
    const initialActiveBtn = document.querySelector('.nav-btn.active');
    if (initialActiveBtn) {
        initialActiveBtn.click();
    }

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

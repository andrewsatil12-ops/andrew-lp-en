// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// --- Hero Sequence (Scroll-Driven Frame Animation) ---
const canvas = document.getElementById('hero-canvas');
const heroOverlay = document.querySelector('.hero-dark-overlay');
const heroTextBlock = document.querySelector('.hero-overlay');

if (canvas) {
    const ctx = canvas.getContext('2d');
    const frameCount = 152; // Total frames found in ./Hero shoot/
    let framesLoaded = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frames = [];
    const loadingBar = document.getElementById('hero-loading');

    // Preload frames
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `./Hero/frame_${String(i).padStart(3, '0')}_delay-0.033s.jpg`;
        img.onload = () => {
            framesLoaded++;
            if (loadingBar) {
                loadingBar.style.width = `${(framesLoaded / frameCount) * 100}%`;
            }
            // Draw first frame immediately when it loads
            if (i === 0) {
                drawImageCover(ctx, img, canvas.width, canvas.height);
            }
            if (framesLoaded === frameCount && loadingBar) {
                setTimeout(() => { loadingBar.style.opacity = '0'; }, 500);
            }
        };
        frames.push(img);
    }

    function drawImageCover(ctx, img, canvasW, canvasH) {
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasW / canvasH;
        let drawW, drawH, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawH = canvasH;
            drawW = img.width * (canvasH / img.height);
            offsetX = (canvasW - drawW) / 2;
            offsetY = 0;
        } else {
            drawW = canvasW;
            drawH = img.height * (canvasW / img.width);
            offsetX = 0;
            offsetY = (canvasH - drawH) / 2;
        }
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }

    function getScrollProgress() {
        const section = document.getElementById('hero-sequence');
        if (!section) return 0;
        const scrollTop = window.scrollY - section.offsetTop;
        const maxScroll = section.offsetHeight - window.innerHeight;
        return Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    }

    function drawFrame(index) {
        const img = frames[index];
        if (img && img.complete) {
            drawImageCover(ctx, img, canvas.width, canvas.height);
        }
    }

    function updateOpacities(progress) {
        if (heroOverlay) {
            let overlayOpacity;
            if (progress < 0.25) {
                overlayOpacity = 0.40;
            } else if (progress < 0.45) {
                const t = (progress - 0.25) / 0.20;
                overlayOpacity = 0.40 * (1 - t);
            } else {
                overlayOpacity = 0;
            }
            heroOverlay.style.background = `rgba(0, 0, 0, ${overlayOpacity})`;
        }

        if (heroTextBlock) {
            let textOpacity;
            if (progress < 0.15) {
                textOpacity = 1;
            } else if (progress < 0.30) {
                textOpacity = 1 - ((progress - 0.15) / 0.15);
            } else {
                textOpacity = 0;
            }
            heroTextBlock.style.opacity = textOpacity;
        }
    }

    window.addEventListener('scroll', () => {
        const progress = getScrollProgress();
        const frameIndex = Math.min(
            Math.floor(progress * (frameCount - 1)),
            frameCount - 1
        );
        requestAnimationFrame(() => drawFrame(frameIndex));
        updateOpacities(progress);
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const progress = getScrollProgress();
        const frameIndex = Math.min(
            Math.floor(progress * (frameCount - 1)),
            frameCount - 1
        );
        drawFrame(frameIndex);
        updateOpacities(progress);
    });
}

if (!prefersReducedMotion) {
    // 1.5. Canvas Fade Out
    gsap.to('#hero-canvas', {
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '#hero-sequence',
            start: '80% top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // 2. Generic Section Fade Ups
    const sections = gsap.utils.toArray('.fade-up-section');
    sections.forEach(sec => {
        gsap.fromTo(sec, 
            { y: 30, opacity: 0 },
            { 
                y: 0, opacity: 1, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 3. Process Cards Stagger
    gsap.fromTo('.process-card',
        { y: 30, opacity: 0 },
        {
            y: 0, opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.process-cards',
                start: "top 75%",
            }
        }
    );
}

// --- Netflix-style Cases Section ---
const MICROLINK = url =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

const FALLBACK_COLORS = {
  'ui': ['#1A0810', '#4A0F1E'],
  'product': ['#080F1A', '#0F2A40'],
  'shooting': ['#100A1A', '#2A0F40'],
  'ugc': ['#180808', '#420F0F'],
  'meta': ['#080F0A', '#0F2A14'],
};

const categories = [
  {
    id: 'ui',
    label: 'UI/UX & Landing Pages',
    items: [
      {
        name: 'Sakura Void — 25h',
        tag: 'Landing Page · Brand Identity',
        desc: 'Scroll-driven brand experience for a conceptual Japanese energy drink. Custom typography, dark editorial aesthetic, countdown drop mechanic.',
        url: 'https://sakura-void.vercel.app/',
        behance: null,
        thumb: null,
        isVercel: true,
      },
      {
        name: 'Noir & Ground',
        tag: 'Landing Page · Specialty Coffee',
        desc: 'Dark luxury brand experience for a specialty coffee concept. Editorial layout, moody art direction, full visual identity.',
        url: 'https://noir-and-ground.vercel.app/',
        behance: null,
        thumb: null,
        isVercel: true,
      },
      {
        name: 'Ember & Salt',
        tag: 'Digital Menu · F&B UX',
        desc: 'Live-fire restaurant digital menu with QR code integration, designed for ambiance-first dining experiences.',
        url: 'https://ember-and-salt-iota.vercel.app/',
        behance: null,
        thumb: null,
        isVercel: true,
      },
    ],
  },
  {
    id: 'product',
    label: 'Product Design — App Dashboard',
    items: [
      {
        name: 'Pulse — AI Fitness Dashboard',
        tag: 'SaaS UI · Dashboard · Anthropic API',
        desc: 'AI-powered fitness SaaS dashboard built with the Anthropic API. Dark interface, data-rich layout, deployed on Vercel.',
        url: 'https://pulse-sepia-ten.vercel.app/',
        behance: null,
        thumb: null,
        isVercel: true,
      },
      {
        name: 'Pulse — Case Study',
        tag: 'Case Study · Product Strategy',
        desc: 'Full product case study documenting the Pulse dashboard — strategy, design decisions, and process breakdown.',
        url: 'https://case-study-pulse.vercel.app/',
        behance: null,
        thumb: null,
        isVercel: true,
      },
    ],
  },
  {
    id: 'shooting',
    label: 'AI Shootings — Editorial',
    items: [
      {
        name: 'Chanel Le Lift — AI Editorial',
        tag: 'AI Photography · Editorial · Beauty',
        desc: 'Full AI editorial campaign for Chanel Le Lift. Face-lock methodology, luxury lighting, Paris setting.',
        url: 'https://www.behance.net/gallery/250635083/Chanel-Le-Lift-AI-Editorial-Campaign',
        behance: 'https://www.behance.net/gallery/250635083/Chanel-Le-Lift-AI-Editorial-Campaign',
        thumb: null,
        isVercel: false,
      },
      {
        name: 'Dark Luxury — Fashion & Streetwear',
        tag: 'AI Photography · Fashion · Editorial',
        desc: 'Cinematic AI brand film — dark luxury streetwear editorial set in Liverpool and Manchester. NB Pro + Higgsfield.',
        url: 'https://www.behance.net/gallery/251612075/Dark-Luxury-AI-Editorial-Fashion-Streetwear',
        behance: 'https://www.behance.net/gallery/251612075/Dark-Luxury-AI-Editorial-Fashion-Streetwear',
        thumb: null,
        isVercel: false,
      },
      {
        name: 'Full AI Automotive Editorial',
        tag: 'AI Photography · Automotive',
        desc: 'Fully AI-generated automotive editorial. Photoreal environments, studio-grade lighting, zero traditional photography.',
        url: 'https://www.behance.net/gallery/250549001/Full-AI-automotive-editorial',
        behance: 'https://www.behance.net/gallery/250549001/Full-AI-automotive-editorial',
        thumb: null,
        isVercel: false,
      },
    ],
  },
  {
    id: 'ugc',
    label: 'AI UGC & Video',
    items: [
      {
        name: 'AI UGC — Makeup & Beauty',
        tag: 'AI Video · UGC · Beauty',
        desc: 'AI-generated UGC video for a makeup brand. Avatar creation, script, voice via ElevenLabs, video via Kling.',
        url: 'https://www.behance.net/gallery/249617565/AI-Generated-UGC-Video-Makeup-Beauty-Creator',
        behance: 'https://www.behance.net/gallery/249617565/AI-Generated-UGC-Video-Makeup-Beauty-Creator',
        thumb: null,
        isVercel: false,
      },
      {
        name: 'AI UGC — Skincare Demo',
        tag: 'AI Video · UGC · Skincare',
        desc: 'Product demo UGC video built entirely with AI tools. Face-lock avatar, scripted testimonial, Veo 3 production.',
        url: 'https://www.behance.net/gallery/249617839/AI-Generated-UGC-Video-Skincare-Product-Demo',
        behance: 'https://www.behance.net/gallery/249617839/AI-Generated-UGC-Video-Skincare-Product-Demo',
        thumb: null,
        isVercel: false,
      },
      {
        name: 'Fem8 — VSL DTC Campaign',
        tag: 'VSL · DTC · AI Video',
        desc: 'Full VSL (Video Sales Letter) for Fem8 DTC brand. Script, avatar, voice and final edit — AI-native production pipeline.',
        url: 'https://www.behance.net/gallery/251730769/Fem8-(VSL-DTC)',
        behance: 'https://www.behance.net/gallery/251730769/Fem8-(VSL-DTC)',
        thumb: null,
        isVercel: false,
      },
    ],
  },
  {
    id: 'meta',
    label: 'Meta Ads — Static & Video',
    items: [
      {
        name: 'Selected Works — Branding & Social',
        tag: 'Meta Ads · Static · Branding',
        desc: 'Curated selection of static and animated ad creatives for paid traffic. Meta and Google campaigns.',
        url: 'https://www.behance.net/gallery/245038457/Selected-Works-Branding-Design-Social-Media',
        behance: 'https://www.behance.net/gallery/245038457/Selected-Works-Branding-Design-Social-Media',
        thumb: null,
        isVercel: false,
      },
      {
        name: 'Selected Works — Brand Identity & Video',
        tag: 'Meta Ads · Video · Identity',
        desc: 'Motion graphics and video ads for brand identity and performance campaigns across Meta and TikTok.',
        url: 'https://www.behance.net/gallery/245056949/Selected-Works-Brand-Identity-Video',
        behance: 'https://www.behance.net/gallery/245056949/Selected-Works-Brand-Identity-Video',
        thumb: null,
        isVercel: false,
      },
    ],
  },
];

// Gradient fallbacks per category
const gradients = {
  ui:       'linear-gradient(135deg, #1A0810 0%, #4A0F1E 60%, #6B1A2A 100%)',
  product:  'linear-gradient(135deg, #080F1A 0%, #0F2A40 60%, #185FA5 100%)',
  shooting: 'linear-gradient(135deg, #100A1A 0%, #2A0F40 60%, #534AB7 100%)',
  ugc:      'linear-gradient(135deg, #180808 0%, #420F0F 60%, #8B1A1A 100%)',
  meta:     'linear-gradient(135deg, #080F0A 0%, #0F2A14 60%, #3B6D11 100%)',
};

// ── RENDER ──

function setFeaturedBg(project, catId) {
  const bg = document.getElementById('featured-bg');
  if (project.isVercel) {
    bg.style.backgroundImage = `url(${MICROLINK(project.url)}), ${gradients[catId]}`;
  } else {
    bg.style.backgroundImage = gradients[catId];
  }
}

function updateFeatured(project, catId) {
  const tag = document.getElementById('featured-tag');
  const title = document.getElementById('featured-title');
  const desc = document.getElementById('featured-desc');
  const btnView = document.getElementById('featured-btn-view');
  const btnBehance = document.getElementById('featured-btn-behance');
  
  if(tag) tag.textContent = project.tag;
  if(title) title.textContent = project.name;
  if(desc) desc.textContent = project.desc;
  if(btnView) btnView.href = project.url;
  if(btnBehance) btnBehance.href = project.behance || 'https://www.behance.net/drewsatil';
  
  setFeaturedBg(project, catId);
}

function buildCard(project, catId) {
  const a = document.createElement('a');
  a.className = 'case-card';
  a.href = project.url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.dataset.catId = catId;

  const bg = document.createElement('div');
  bg.className = 'card-bg';

  bg.style.background = gradients[catId];
  bg.style.backgroundSize = 'cover';
  bg.style.backgroundPosition = 'center top';

  if (project.isVercel) {
    const thumbUrl = MICROLINK(project.url);
    const img = new Image();
    img.onload = () => {
      bg.style.backgroundImage = `url(${thumbUrl})`;
    };
    img.onerror = () => {
      console.warn('Thumb failed for:', project.url);
    };
    setTimeout(() => { img.src = ''; }, 5000);
    img.src = thumbUrl;
  }

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const content = document.createElement('div');
  content.className = 'card-content';
  content.innerHTML = `
    <p class="card-tag">${project.tag}</p>
    <p class="card-name">${project.name}</p>
  `;

  a.appendChild(bg);
  a.appendChild(overlay);
  a.appendChild(content);

  // Removed mouseenter listener for auto-rotate logic

  return a;
}

function buildCategory(cat) {
  const block = document.createElement('div');
  block.className = 'category-block';

  const label = document.createElement('p');
  label.className = 'category-label';
  label.textContent = cat.label;

  const track = document.createElement('div');
  track.className = 'cards-track';

  cat.items.forEach(project => {
    track.appendChild(buildCard(project, cat.id));
  });

  block.appendChild(label);
  block.appendChild(track);
  return block;
}

// --- AUTO ROTATE LOGIC ---
const allProjects = categories.flatMap(cat =>
  cat.items.map(item => ({ ...item, catId: cat.id }))
);

let currentIndex = 0;
let autoTimer = null;

function showProject(index) {
  const project = allProjects[index];
  const featured = document.getElementById('featured-case');

  if (!featured) return;

  // Fade out
  featured.style.opacity = '0';
  featured.style.transition = 'opacity 0.3s ease';

  setTimeout(() => {
    updateFeatured(project, project.catId);
    updateDots(index);

    // Fade in
    featured.style.opacity = '1';
    featured.style.transition = 'opacity 0.4s ease';
  }, 300);
}

function startAutoRotate() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % allProjects.length;
    showProject(currentIndex);
  }, 3000);
}

function buildDots() {
  const container = document.getElementById('carousel-dots');
  if (!container) return;
  
  allProjects.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      currentIndex = i;
      showProject(i);
      startAutoRotate();
    });
    container.appendChild(dot);
  });
}

function updateDots(index) {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// INIT
const container = document.getElementById('categories-container');
if (container) {
    categories.forEach(cat => container.appendChild(buildCategory(cat)));

    buildDots();
    showProject(0);
    startAutoRotate();

    const featuredEl = document.getElementById('featured-case');
    if (featuredEl) {
        featuredEl.addEventListener('mouseenter', () => {
            clearInterval(autoTimer);
        });
        featuredEl.addEventListener('mouseleave', () => {
            startAutoRotate();
        });
    }
}

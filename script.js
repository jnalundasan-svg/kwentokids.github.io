/**
 * Kuya Jay's Digital Store — Interactive Features
 * Handles carousel, lightbox, tabs, and smooth scrolling
 */

// ═══════════════════════════════════════════════════════════════
// FLIP-THROUGH CAROUSEL (Video Preview Section)
// ═══════════════════════════════════════════════════════════════

class FlipCarousel {
  constructor() {
    this.previewEl = document.getElementById('flipPreview');
    this.captionEl = document.getElementById('flipCaption');
    this.controlsEl = document.getElementById('flipControls');
    this.playBtn = this.previewEl?.querySelector('.flip-play-btn');
    
    this.slides = this.previewEl?.querySelectorAll('.flip-slide') || [];
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isAutoPlaying = false;

    if (this.slides.length === 0) return;

    this.init();
  }

  init() {
    // Create dot indicators
    this.slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `flip-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => this.goToSlide(idx));
      this.controlsEl.appendChild(dot);
    });

    // Wire play button
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.toggleAutoPlay());
    }

    // Start auto-play on load (optional — remove if you prefer manual control)
    // this.startAutoPlay();
  }

  goToSlide(index) {
    // Deactivate previous
    this.slides[this.currentIndex].classList.remove('active');
    this.controlsEl.children[this.currentIndex].classList.remove('active');

    // Activate new
    this.currentIndex = index;
    this.slides[index].classList.add('active');
    this.controlsEl.children[index].classList.add('active');

    // Update caption
    const caption = this.slides[index].getAttribute('data-caption');
    if (this.captionEl && caption) {
      this.captionEl.textContent = caption;
    }
  }

  nextSlide() {
    const next = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(next);
  }

  startAutoPlay() {
    if (this.isAutoPlaying) return;
    this.isAutoPlaying = true;
    if (this.playBtn) {
      this.playBtn.style.opacity = '0.5';
      this.playBtn.setAttribute('aria-pressed', 'true');
    }
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000); // 3-second dwell
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.playBtn) {
      this.playBtn.style.opacity = '1';
      this.playBtn.setAttribute('aria-pressed', 'false');
    }
    clearInterval(this.autoPlayInterval);
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// LIGHTBOX (Spread Card Zoom)
// ═══════════════════════════════════════════════════════���═══════

class Lightbox {
  constructor() {
    this.lightboxEl = document.querySelector('.lightbox');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.lightboxImg = this.lightboxEl?.querySelector('img');

    if (!this.lightboxEl) return;

    this.init();
  }

  init() {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on background click
    this.lightboxEl.addEventListener('click', (e) => {
      if (e.target === this.lightboxEl) {
        this.close();
      }
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightboxEl.classList.contains('open')) {
        this.close();
      }
    });

    // Wire spread cards
    this.wireSpreadCards();
  }

  wireSpreadCards() {
    const spreadCards = document.querySelectorAll('.spread-card');
    spreadCards.forEach((card) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img) {
          this.open(img.src);
        }
      });
    });
  }

  open(imageSrc) {
    if (this.lightboxImg) {
      this.lightboxImg.src = imageSrc;
    }
    this.lightboxEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightboxEl.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ═══════════════════════════════════════════════════════════════
// TAB SWITCHING (What's Inside Section)
// ═══════════════════════════════════════════════════════════════

class TabSwitcher {
  constructor() {
    this.tabs = document.querySelectorAll('.tab-btn');
    this.panels = document.querySelectorAll('.spreads-panel');

    if (this.tabs.length === 0) return;

    this.init();
  }

  init() {
    this.tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => this.switchTab(idx));
    });
  }

  switchTab(index) {
    // Deactivate all
    this.tabs.forEach((tab) => tab.classList.remove('active'));
    this.panels.forEach((panel) => panel.classList.remove('active'));

    // Activate selected
    this.tabs[index].classList.add('active');
    this.panels[index].classList.add('active');
  }
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL (Navigation Links)
// ═══════════════════════════════════════════════════════════════

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // Skip empty anchors

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZE ALL ON DOM READY
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  new FlipCarousel();
  new Lightbox();
  new TabSwitcher();
  initSmoothScroll();

  console.log('✨ Kuya Jay\'s Digital Store interactive features loaded!');
});
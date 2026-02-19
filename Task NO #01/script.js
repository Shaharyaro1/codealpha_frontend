// Sample image data - Replace with your actual images
const images = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        title: 'Mountain Landscape',
        category: 'nature',
        alt: 'Beautiful mountain landscape with clear sky'
    },
    {
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
        title: 'City Skyline',
        category: 'architecture',
        alt: 'Modern city skyline at sunset'
    },
    {
        src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
        title: 'Portrait',
        category: 'people',
        alt: 'Portrait of a person'
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        title: 'Forest Path',
        category: 'nature',
        alt: 'Misty forest path'
    },
    {
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        title: 'Modern Building',
        category: 'architecture',
        alt: 'Contemporary architecture building'
    },
    {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        title: 'Business Portrait',
        category: 'people',
        alt: 'Professional business portrait'
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        title: 'Autumn Forest',
        category: 'nature',
        alt: 'Colorful autumn forest'
    },
    {
        src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800',
        title: 'Glass Building',
        category: 'architecture',
        alt: 'Modern glass building facade'
    },
    {
        src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
        title: 'Woman Portrait',
        category: 'people',
        alt: 'Portrait of a woman'
    }
];

// State management
let currentImageIndex = 0;
let filteredImages = [...images];

// DOM Elements
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxCounter = document.querySelector('.lightbox-counter');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize gallery
function initGallery() {
    renderGallery(images);
    setupEventListeners();
}

// Render gallery items
function renderGallery(imagesToRender) {
    gallery.innerHTML = '';
    
    imagesToRender.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        galleryItem.setAttribute('data-category', image.category);
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('aria-label', `View ${image.title}`);
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="gallery-caption">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        `;
        
        gallery.appendChild(galleryItem);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Gallery item clicks
    gallery.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        }
    });

    // Keyboard navigation for gallery items
    gallery.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const item = e.target.closest('.gallery-item');
            if (item) {
                e.preventDefault();
                const index = parseInt(item.getAttribute('data-index'));
                openLightbox(index);
            }
        }
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterGallery(filter);
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Filter gallery
function filterGallery(category) {
    if (category === 'all') {
        filteredImages = [...images];
        renderGallery(images);
    } else {
        filteredImages = images.filter(img => img.category === category);
        renderGallery(filteredImages);
    }
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    closeBtn.focus();
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Touch support for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGallery);

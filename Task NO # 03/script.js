// Text animation for hero section
const texts = [
    'I build cool web apps 💻',
    'I create amazing UI/UX ✨',
    'I solve complex problems 🧩',
    'I bring ideas to life 🚀'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const animatedText = document.querySelector('.animated-text');

function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        animatedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        animatedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

setTimeout(typeText, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('.btn-primary');
    const originalText = btn.innerHTML;

    // Update button to show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #5b21b6, #3b82f6)';
            form.reset();
        } else {
            throw new Error('Failed');
        }
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2500);
    })
    .catch(error => {
        btn.innerHTML = '<i class="fas fa-times"></i> Failed! Try Again';
        btn.style.background = 'linear-gradient(135deg, #ff4757, #ff3838)';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2500);
    });
}

// Attach form handler
document.getElementById('contact-form').addEventListener('submit', handleSubmit);

// Theme toggle function
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}



// cv download function
    function downloadCV() {
    const link = document.createElement('a');
    link.href = 'resume/sheri-resume.pdf';
    link.download = 'Sheri-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}




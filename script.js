// Smooth scrolling, mobile navigation, counter animation, form validation, and page effects
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const counterElement = document.getElementById('visitor-count');
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const ageError = document.getElementById('age-error');
const messageError = document.getElementById('message-error');
const charCount = document.getElementById('char-count');
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');

const VISITOR_TARGET = 500;

function safeQuerySelector(href) {
    return href && href !== '#' ? document.querySelector(href) : null;
}

function closeMobileNav() {
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

function handleAnchorClick(event) {
    const href = event.currentTarget.getAttribute('href');
    const target = safeQuerySelector(href);

    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMobileNav();
}

anchorLinks.forEach(link => {
    if (link.getAttribute('href') === '#') {
        return;
    }
    link.addEventListener('click', handleAnchorClick);
});

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function animateVisitorCount(target) {
    if (!counterElement) {
        return;
    }

    let count = 0;
    const increment = 10;
    const interval = 80; // Adjust for animation speed

    const intervalId = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(intervalId);
        }
        counterElement.innerText = count;
    }, interval);
}

animateVisitorCount(VISITOR_TARGET);

const typedText = document.getElementById('typed-text');
const typingRoles = ['AI & ML Engineer', 'Flutter Developer', 'Full Stack Developer'];
let typingRoleIndex = 0;
let typingCharIndex = 0;
let isDeleting = false;

function runTypingAnimation() {
    if (!typedText) {
        return;
    }

    const currentRole = typingRoles[typingRoleIndex];
    const displayedText = isDeleting
        ? currentRole.substring(0, typingCharIndex - 1)
        : currentRole.substring(0, typingCharIndex + 1);

    typedText.innerText = displayedText;

    if (!isDeleting && typingCharIndex < currentRole.length) {
        typingCharIndex += 1;
        setTimeout(runTypingAnimation, 120);
    } else if (!isDeleting) {
        isDeleting = true;
        setTimeout(runTypingAnimation, 1400);
    } else if (isDeleting && typingCharIndex > 0) {
        typingCharIndex -= 1;
        setTimeout(runTypingAnimation, 60);
    } else {
        isDeleting = false;
        typingRoleIndex = (typingRoleIndex + 1) % typingRoles.length;
        setTimeout(runTypingAnimation, 500);
    }
}

runTypingAnimation();

function updateCharCount() {
    const count = messageInput.value.length;
    charCount.innerText = `Characters: ${count}/1000`;
    charCount.style.color = count >= 1000 ? '#ff6b6b' : '#00d9ff';
}

function validateField(value, validator) {
    return validator(value.trim());
}

function validateForm() {
    const nameErrorMessage = validateField(nameInput.value, value => {
        return value === '' ? 'Name cannot be empty' : '';
    });

    const emailErrorMessage = validateField(emailInput.value, value => {
        if (value === '') return 'Email cannot be empty';
        if (!value.includes('@')) return 'Email must contain @';
        return '';
    });

    const ageErrorMessage = validateField(ageInput.value, value => {
        if (value === '') return 'Age cannot be empty';
        if (!/^[0-9]+$/.test(value)) return 'Age must be numeric';
        return '';
    });

    const messageErrorMessage = validateField(messageInput.value, value => {
        if (value === '') return 'Message cannot be empty';
        if (value.length > 1000) return 'Message cannot exceed 1000 characters';
        return '';
    });

    nameError.innerText = nameErrorMessage;
    emailError.innerText = emailErrorMessage;
    ageError.innerText = ageErrorMessage;
    messageError.innerText = messageErrorMessage;

    return [nameErrorMessage, emailErrorMessage, ageErrorMessage, messageErrorMessage].every(msg => msg === '');
}

if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        alert('Form submitted successfully!');
        form.reset();
        updateCharCount();
    });
}

if (messageInput) {
    messageInput.addEventListener('input', updateCharCount);
}

if (backToTopBtn) {
    backToTopBtn.style.display = 'none';

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const observerOptions = {
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));
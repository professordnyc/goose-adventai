// Winter Festival Countdown App - JavaScript
// Handles countdown timer, fun facts rotation, and email signup

// ===========================
// Countdown Timer
// ===========================

// Target date: December 1, 2026 at 10:00 AM
const targetDate = new Date('December 1, 2026 10:00:00').getTime();

// DOM elements for countdown
let daysElement, hoursElement, minutesElement, secondsElement;

/**
 * Calculate time remaining until target date
 * @returns {Object} Object containing days, hours, minutes, seconds
 */
function calculateTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // If countdown is finished
    if (distance < 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            finished: true
        };
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    return {
        days,
        hours,
        minutes,
        seconds,
        finished: false
    };
}

/**
 * Add leading zero to single digit numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted number with leading zero if needed
 */
function formatNumber(num) {
    return num < 10 ? '0' + num : num.toString();
}

/**
 * Update element with smooth transition
 * @param {HTMLElement} element - Element to update
 * @param {string} newValue - New value to display
 */
function updateElementWithTransition(element, newValue) {
    if (element.textContent !== newValue) {
        // Add transition class
        element.classList.add('updating');
        
        // Update value
        element.textContent = newValue;
        
        // Remove transition class after animation
        setTimeout(() => {
            element.classList.remove('updating');
        }, 300);
    }
}

/**
 * Update the countdown display
 */
function updateCountdown() {
    const timeRemaining = calculateTimeRemaining();
    
    if (timeRemaining.finished) {
        // Countdown finished
        daysElement.textContent = '000';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Optional: Stop the interval
        clearInterval(countdownInterval);
        
        // Optional: Show celebration message
        console.log('Festival has begun! 🎉');
    } else {
        // Update display with animation classes
        updateElementWithTransition(daysElement, String(timeRemaining.days).padStart(3, '0'));
        updateElementWithTransition(hoursElement, formatNumber(timeRemaining.hours));
        updateElementWithTransition(minutesElement, formatNumber(timeRemaining.minutes));
        updateElementWithTransition(secondsElement, formatNumber(timeRemaining.seconds));
    }
}

/**
 * Initialize countdown timer
 */
function initCountdown() {
    // Get DOM elements
    daysElement = document.getElementById('days');
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    return setInterval(updateCountdown, 1000);
}

// Store interval ID globally so we can clear it if needed
let countdownInterval;


// ===========================
// Rotating Fun Facts
// ===========================

// Array of festival fun facts
const festivalFacts = [
    "The first Winter Festival was held in 1952 in a small mountain town!",
    "Over 50,000 lights illuminate the festival each year.",
    "Our hot chocolate bar serves 20+ flavors, including peppermint bark!",
    "The ice sculpture contest features artists from 12 countries.",
    "Festival tradition: make a wish under the Grand Tree at midnight.",
    "Local artisans showcase handmade ornaments, candles, and warm woolen goods."
];

// Current fact index
let currentFactIndex = 0;

// DOM element for fun fact
let funFactElement;

/**
 * Display a fact with fade-in effect
 * @param {number} index - Index of fact to display
 */
function displayFact(index) {
    if (!funFactElement) return;
    
    // Fade out
    funFactElement.classList.remove('fade-in');
    funFactElement.classList.add('fade-out');
    
    // Wait for fade out, then change text and fade in
    setTimeout(() => {
        funFactElement.textContent = festivalFacts[index];
        funFactElement.classList.remove('fade-out');
        funFactElement.classList.add('fade-in');
    }, 300);
}

/**
 * Rotate to next fun fact
 */
function rotateFacts() {
    // Move to next fact (circular)
    currentFactIndex = (currentFactIndex + 1) % festivalFacts.length;
    displayFact(currentFactIndex);
}

/**
 * Initialize fun facts rotation
 */
function initFunFacts() {
    // Get DOM element
    funFactElement = document.getElementById('funFact');
    
    // Display first fact immediately
    if (funFactElement) {
        funFactElement.textContent = festivalFacts[0];
        funFactElement.classList.add('fade-in');
        
        // Rotate every 6 seconds
        return setInterval(rotateFacts, 6000);
    }
}

// Store interval ID
let funFactsInterval;


// ===========================
// Email Signup Form
// ===========================

// DOM elements for email form
let emailForm, emailInput, formMessage;

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateEmail(email) {
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Store email in localStorage
 * @param {string} email - Email to store
 */
function storeEmail(email) {
    try {
        // Get existing emails or create new array
        let emails = JSON.parse(localStorage.getItem('festivalEmails')) || [];
        
        // Check if email already exists
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('festivalEmails', JSON.stringify(emails));
        }
    } catch (error) {
        console.error('Error storing email:', error);
    }
}

/**
 * Show form message (success or error)
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

/**
 * Handle email form submission
 * @param {Event} event - Submit event
 */
function handleEmailSubmit(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showFormMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Store email in localStorage
    storeEmail(email);
    
    // Show success message
    showFormMessage('Thank you! You\'re now signed up for updates! 🎉', 'success');
    
    // Clear form
    emailInput.value = '';
}

/**
 * Initialize email signup form
 */
function initEmailForm() {
    // Get DOM elements
    emailForm = document.getElementById('emailForm');
    emailInput = document.getElementById('email');
    formMessage = document.getElementById('formMessage');
    
    // Add submit event listener
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmit);
    }
}



// ===========================
// Initialize when DOM is ready
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Winter Festival Countdown App initialized');
    
    // Start countdown timer
    countdownInterval = initCountdown();
    
    // Start fun facts rotation
    funFactsInterval = initFunFacts();
    
    // Initialize email signup form
    initEmailForm();
});

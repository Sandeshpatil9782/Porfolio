/**
 * EmailJS Integration
 * Handles contact form validation, submission, and UI states.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("5sVO8ovrFa1g9t547");

    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Original button text
    const originalBtnText = submitBtn.textContent;

    // Select inputs and their error message spans
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    /**
     * Show Toast Notification
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icon based on type
        const icon = type === 'success'
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">${message}</div>
        `;

        toastContainer.appendChild(toast);

        // Trigger reflow for animation
        void toast.offsetWidth;
        toast.classList.add('show');

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition to finish
        }, 4000);
    }

    /**
     * Set Error State on Input
     */
    function setError(input, errorElement, message) {
        input.parentElement.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    /**
     * Clear Error State
     */
    function clearError(input, errorElement) {
        input.parentElement.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }

    /**
     * Clear all form errors
     */
    function clearAllErrors() {
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);
    }

    /**
     * Validate Email Format
     */
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Form Validation
     */
    function validateForm() {
        let isValid = true;
        clearAllErrors();

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Validate Name
        if (nameValue === '') {
            setError(nameInput, nameError, 'Name cannot be empty.');
            isValid = false;
        }

        // Validate Email
        if (emailValue === '') {
            setError(emailInput, emailError, 'Email cannot be empty.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Message
        if (messageValue === '') {
            setError(messageInput, messageError, 'Message cannot be empty.');
            isValid = false;
        } else if (messageValue.length < 10) {
            setError(messageInput, messageError, 'Message must be at least 10 characters long.');
            isValid = false;
        }

        // Focus the first invalid input for accessibility
        if (!isValid) {
            if (nameValue === '') nameInput.focus();
            else if (emailValue === '' || !isValidEmail(emailValue)) emailInput.focus();
            else if (messageValue === '' || messageValue.length < 10) messageInput.focus();
        }

        return isValid;
    }

    // Handle Form Submit
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Set loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

        // Prepare template parameters
        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        try {
            // Send email using EmailJS
            // in this enter your emailjs service id and template id
            const response = await emailjs.send(
                'service_bn0seua',
                'template_k7c3ren',
                templateParams
            );

            // Success State
            showToast(' Message Sent Successfully!<br><span style="font-size:0.85rem;opacity:0.8;">Thank you for reaching out. I\'ll get back to you soon.</span>', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            // Error State
            showToast('Unable to send your message.<br><span style="font-size:0.85rem;opacity:0.8;">Please try again later.</span>', 'error');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // Allow 'Enter' to submit form from inputs (Textarea needs Shift+Enter, naturally handled by browser)
    const inputs = [nameInput, emailInput];
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                contactForm.dispatchEvent(new Event('submit', { cancelable: true }));
            }
        });
    });
});

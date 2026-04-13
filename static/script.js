const password = document.getElementById('password');
const requirements = document.getElementById('requirements');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

if (password) {
    password.addEventListener('focus', () => {
        requirements.classList.add('show');
    });

    password.addEventListener('input', () => {
        const val = password.value;

        const checks = {
            'req-length':  val.length >= 8,
            'req-upper':   /[A-Z]/.test(val),
            'req-lower':   /[a-z]/.test(val),
            'req-number':  /[0-9]/.test(val),
            'req-special': /[!@#$%^&*(),.?":{}|<>]/.test(val),
        };

        let met = 0;
        for (const [id, passed] of Object.entries(checks)) {
            const el = document.getElementById(id);
            if (passed) { el.classList.add('met'); met++; }
            else { el.classList.remove('met'); }
        }

        // Strength bar
        const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981'];
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong 💪'];
        const pct = (met / 5) * 100;

        strengthFill.style.width = pct + '%';
        strengthFill.style.background = colors[met - 1] || '#e5e7eb';
        strengthText.textContent = met > 0 ? labels[met - 1] : '';
        strengthText.style.color = colors[met - 1] || '#9ca3af';
    });

    // Block submit if password weak
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        const val = password.value;
        const allMet =
            val.length >= 8 &&
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /[0-9]/.test(val) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(val);

        if (!allMet) {
            e.preventDefault();
            requirements.classList.add('show');
            password.classList.add('invalid');
            password.focus();
        }
    });
}
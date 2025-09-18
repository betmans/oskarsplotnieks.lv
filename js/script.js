// --- THEME SWITCHER ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = themeToggle.querySelector('i');

function setTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark');
    toggleIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
});

// --- LANGUAGE SWITCHER ---
const langOptions = document.querySelectorAll('.lang-option');
const langIndicator = document.getElementById('lang-indicator');

function setLanguage(lang) {
    document.documentElement.lang = lang; // Update the lang attribute of the <html> tag
    localStorage.setItem('language', lang); // Save user's preference
    langIndicator.textContent = lang.toUpperCase();

    // Update the active class in the dropdown
    langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });

    // Find all elements with a data-key and translate them
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(element => {
        const key = element.dataset.key;
        if (translations[lang] && translations[lang][key]) {
            // Check for link text with an icon
            const icon = element.querySelector('i');
            if (icon) {
                element.innerHTML = translations[lang][key] + ' ' + icon.outerHTML;
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Update the CV download link
    const cvLink = document.querySelector('a[data-key="contact_cv"]');
    if (cvLink && translations[lang] && translations[lang].cv_file) {
        cvLink.setAttribute('href', translations[lang].cv_file);
    }
}

langOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent page from reloading
        const selectedLang = option.dataset.lang;
        setLanguage(selectedLang);
    });
});

// --- INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'en'; // Default to English
    setLanguage(savedLanguage);
});
// Theme management
(function() {
    'use strict';
    
    const THEME_STORAGE_KEY = 'theme-preference';
    const html = document.documentElement;
    
    function getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function getTheme() {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        return saved || getSystemPreference();
    }
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }
    
    function setTheme(theme) {
        applyTheme(theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    
    function toggleTheme() {
        let current;
        if (html.getAttribute('data-theme') === 'dark') {
            current = 'dark';
        } else {
            current = 'light';
        }
        let newTheme;
        if (current === 'dark') {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }
        setTheme(newTheme);
        return newTheme;
    }
    
    applyTheme(getTheme());
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    });
})();


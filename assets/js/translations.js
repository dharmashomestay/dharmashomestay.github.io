// Language handling
let currentLanguage = localStorage.getItem('preferredLanguage') || 'kn';
let translations = {};

// Load translations
async function loadTranslations() {
    try {
        const [enResponse, knResponse] = await Promise.all([
            fetch('assets/locales/en.json'),
            fetch('assets/locales/kn.json')
        ]);
        
        translations = {
            en: await enResponse.json(),
            kn: await knResponse.json()
        };
        
        // Set initial HTML lang attribute
        document.documentElement.lang = currentLanguage;
        
        // Initial content update
        updateContent();
        
        // Update button text
        updateLanguageToggle();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Language toggle
const langToggle = document.getElementById('langToggle');

// Set initial language state
langToggle.checked = currentLanguage === 'kn';

langToggle.addEventListener('change', () => {
    currentLanguage = langToggle.checked ? 'kn' : 'en';
    // Save preference
    localStorage.setItem('preferredLanguage', currentLanguage);
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
    // Update content
    updateContent();
    updateFontForLanguage();
});

// Update language toggle button text
function updateLanguageToggle() {
    langToggle.textContent = translations[currentLanguage].buttons.toggleLang;
}

// Update content based on selected language
function updateContent() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                // Preserve any existing child elements (like icons)
                const childElements = Array.from(element.children);
                if (childElements.length > 0) {
                    // If element has children (like icons), only update text nodes
                    const textNode = Array.from(element.childNodes)
                        .find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.nodeValue = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        }
    });

    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = translations[currentLanguage].metaDescription || '';
    }
}

// Helper function to get nested translations
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((p, c) => p && p[c], obj);
}

// Font adjustments for Kannada
function updateFontForLanguage() {
    if (currentLanguage === 'kn') {
        document.body.classList.add('kannada-font');
    } else {
        document.body.classList.remove('kannada-font');
    }
}

// Load translations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    updateFontForLanguage();
});

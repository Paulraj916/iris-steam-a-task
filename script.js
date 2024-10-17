// Initialize variables
const langBtn = document.getElementById('lang-btn');
const dropdown = document.getElementById('dropdown-content');
const searchInput = document.getElementById('search-lang');
const langListItems = document.querySelectorAll('#lang-list li');
const contentElements = document.querySelectorAll('[data-translate]');

// Toggle dropdown visibility
langBtn.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    langListItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? 'block' : 'none';
    });
});

// Handle language selection
langListItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedLang = item.getAttribute('data-code');
        translatePage(selectedLang);
        dropdown.style.display = 'none'; // Hide dropdown after selection
    });
});

// Function to translate page content using LibreTranslate
async function translatePage(lang) {
    try {
        // Collect all translatable text
        const texts = Array.from(contentElements).map(el => el.textContent.trim());

        // Translate texts
        const response = await axios.post('https://libretranslate.de/translate', {
            q: texts,
            source: 'en', // Assuming the original language is English
            target: lang,
            format: 'text'
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        const translations = response.data.translations.map(t => t.translatedText);

        // Update the DOM with translated texts
        contentElements.forEach((el, index) => {
            el.textContent = translations[index];
        });
    } catch (error) {
        console.error('Translation Error:', error);
        alert('Failed to translate the page. Please try again later.');
    }
}

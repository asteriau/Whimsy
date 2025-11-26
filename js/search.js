const searchEngines = {
    google: 'https://www.google.com/search?q=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    youtube: 'https://www.youtube.com/results?search_query=',
    github: 'https://github.com/search?q='
};

let currentEngine = 'google';

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const engineButtons = document.querySelectorAll('.search-engine');
    
    engineButtons.forEach(button => {
        button.addEventListener('click', () => {
            engineButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentEngine = button.dataset.engine;
        });
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const searchUrl = searchEngines[currentEngine] + encodeURIComponent(query);
                window.open(searchUrl, '_blank');
                searchInput.value = '';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
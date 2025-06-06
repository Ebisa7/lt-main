document.addEventListener('DOMContentLoaded', function() {
    const navPlaceholder = document.querySelector('.navbar-placeholder');
    const mobileNavPlaceholder = document.querySelector('.mobile-navbar-placeholder');

    if (!navPlaceholder || !mobileNavPlaceholder) {
        console.error('Navbar placeholder not found in HTML.');
        return;
    }

    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) {
        currentPage = 'index.html'; // Treat root URL as index.html
    }

    const navLinks = [
        { text: 'Home', icon: 'fas fa-home', link: 'index.html', activeOn: 'index.html' },
        { text: 'Apps', iconSrc: 'lt-ai.png', link: 'apps.html', activeOn: 'apps.html' },
        { text: 'Updates', icon: 'fas fa-bell', link: 'updates.html', activeOn: 'updates.html' },
        { text: 'Profile', icon: 'fas fa-user', link: 'profile.html', activeOn: 'profile.html' }

    ];

    let navbarHTML = `
        <nav class="navbar">
            <div class="app-name">
                <img src="lt-ai.png" alt="LT AI" style="filter: brightness(20) ; width:50px;height:50px;border-radius:20px;">
                <h1 style="font-size: 25px;"></h1>
            </div>
            <div class="nav-separator"></div>
            <div class="nav-links">
    `;

    let mobileNavbarHTML = `
        <nav class="mobile-navbar">
            <div class="mobile-nav-links">
    `;

    navLinks.forEach(link => {
        const isActive = link.activeOn === currentPage;
        const linkHref = (isActive && link.link === 'index.html') ? '#' : link.link;
        const activeClass = isActive ? 'active' : '';

        let iconHTML = '';
        if (link.icon) {
            iconHTML = `<i class="${link.icon}"></i>`;
        } else if (link.iconSrc) {
            iconHTML = `<img src="${link.iconSrc}" alt="${link.text}" style="width:28px;height:25px;vertical-align:middle;filter:brightness(20);">`;
        }

        navbarHTML += `<a href="${linkHref}" class="${activeClass}">${iconHTML} <span>${link.text}</span></a>`;
        mobileNavbarHTML += `<a href="${linkHref}" class="${activeClass}">${iconHTML} <span>${link.text}</span></a>`;
    });

    navbarHTML += `
            </div>
        </nav>
    `;

    mobileNavbarHTML += `
            </div>
        </nav>
    `;

    navPlaceholder.outerHTML = navbarHTML;
    mobileNavPlaceholder.outerHTML = mobileNavbarHTML;

    // Handle active state for nav items
    function setActiveLink(link) {
        document.querySelectorAll('.navbar a, .mobile-nav-links a').forEach(item => {
            item.classList.remove('active');
        });
        link.classList.add('active');
    }
    document.querySelectorAll('.navbar a, .mobile-nav-links a').forEach(link => {
        // Only preventDefault for Home (index.html)
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                setActiveLink(this);
            });
        }
    });
});
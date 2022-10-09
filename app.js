const hamburger = document.querySelector('#hamburger');
const navContent = document.querySelector('.nav-content');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    if(navContent.style.visibility == 'hidden'){
        navContent.style.visibility = 'visible';
    } else {
        navContent.style.visibility = 'hidden';
    }
});

// Navbar Media Query
function navbarDisplay() {
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    if(mediaQuery.matches){
        navContent.style.visibility = 'visible';
    } else {
        navContent.style.visibility = 'hidden';
    }
};

window.addEventListener('resize', navbarDisplay);

navbarDisplay();
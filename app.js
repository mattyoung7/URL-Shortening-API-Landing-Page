const hamburger = document.querySelector('#hamburger');
const navContent = document.querySelector('.nav-content');
const shortenContainer = document.querySelector('.shorten-container');
const urlInput = document.querySelector('.shorten-input');
const shortenBtn = document.querySelector('.shorten-btn');
const appendedList = document.querySelector('.appended-list');
const error = document.querySelector('.error');

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

// API
async function shortenURL() {
    try {
        const response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`);
        createElement(response.data.result.original_link, response.data.result.full_short_link)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

// Create Element
function createElement(oldLink, newLink){
    const newAppendedItem = document.createElement('div');
    newAppendedItem.classList.add('appended-item');
    newAppendedItem.innerHTML = 
    `<div class="appended-item-old">
        <p class="link-old">${oldLink}</p>
        <hr class="appended-line">
    </div>
    <div class="appended-item-new">
        <a class="link-new" ref="https://rel.ink">${newLink}</a>
        <button class="btn copy-btn">Copy</button>
    </div>`
    appendedList.append(newAppendedItem);

    let copyBtns = document.querySelectorAll('.copy-btn');
    for(let copyBtn of copyBtns){
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(copyBtn.previousElementSibling.innerHTML);
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)';
        })
    }
}

// Shorten URL
shortenBtn.addEventListener('click', () => {
    if (!urlInput.value){
        urlInput.style.border = '1px solid #F46363';
        error.classList.remove('hidden');
        shortenContainer.style.paddingBottom = '20px';

    } else {
        shortenURL();
        urlInput.value = '';
        urlInput.style.border = 'none';
        error.classList.add('hidden');
        if(window.screen.width >= 992) {
            shortenContainer.style.paddingBottom = '52px';
        }
    }
})
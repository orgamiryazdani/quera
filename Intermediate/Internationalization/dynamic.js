/* write your code here ... */

const changeLanguageButton = document.querySelector('button[aria-label="Change Language"]');
const playGameBtn = document.querySelector('.info button');
const nameText = document.querySelector('.info span');
const titleText = document.querySelector('.info h2');
const descriptionText = document.querySelector('.info p');
const coverImage = document.querySelector('.cover img');
const activePage = document.querySelectorAll('ul li button');
const htmlDirection = document.querySelector('html');

const savedStep = JSON.parse(localStorage.getItem('pageStep'));
if (savedStep) {
    activePage.forEach((btn) => {
        if (btn.innerText === savedStep) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

activePage.forEach((btn) => btn.addEventListener('click', async (e) => {
    const stepClicked = e.target.innerText;
    localStorage.setItem('pageStep', JSON.stringify(stepClicked));
    activePage.forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
    fetchNewData()
}));

const fetchNewData = async () => {
    const language = await JSON.parse(localStorage.getItem('language')) || 'en';
    const text = await getText(language);
    const data = await getData()
    renderHtml(data, text);
}

document.addEventListener('DOMContentLoaded', async () => {
    const language = await JSON.parse(localStorage.getItem('language')) || 'en';
    localStorage.setItem('language', JSON.stringify(language));
    const pageStep = await JSON.parse(localStorage.getItem('pageStep')) || '01';
    localStorage.setItem('pageStep', JSON.stringify(pageStep));
    htmlDirection.dir = language === 'en' ? 'ltr' : 'rtl';
    htmlDirection.lang = language;
    fetchNewData()
})

const renderHtml = async (data, text) => {
    const pageStep = await JSON.parse(localStorage.getItem('pageStep')) || '01';
    const selectedPageNumber = pageStep - 1;
    titleText.innerText = text.GAMES[selectedPageNumber].HEADING
    descriptionText.innerText = text.GAMES[selectedPageNumber].DESCRIPTION
    playGameBtn.innerText = text.GENERAL.CALL_TO_ACTION;
    nameText.innerText = data[selectedPageNumber].name;
    playGameBtn.style.color = data[selectedPageNumber].callToActionButton.color
    playGameBtn.style.backgroundColor = data[selectedPageNumber].callToActionButton.backgroundColor
    coverImage.src = data[selectedPageNumber].image
}

const getText = async (language) => {
    const response = await fetch(`./languages/${language}.json`);
    const data = await response.json();
    return data;
}

const getData = async () => {
    const response = await fetch(`./data/games.json`);
    const data = await response.json();
    return data;
}


changeLanguageButton.addEventListener('click', () => {
    const language = JSON.parse(localStorage.getItem('language')) || 'en';
    localStorage.setItem('language', JSON.stringify(language === 'en' ? 'fa' : 'en'));
    htmlDirection.dir = language == 'fa' ? 'ltr' : 'rtl';
    htmlDirection.lang = language === 'en' ? 'fa' : 'en';
    fetchNewData();
})
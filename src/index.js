import { news } from './news';
import { langArr } from './translation';

const newsBoxEl = document.querySelector('.news__box');
const prevButtonEL = document.querySelector('#prev-button');
const nextButtonEL = document.querySelector('#next-button');

let pagenumber = 0;

const renderNews = () => {
  newsBoxEl.innerHTML = '';
  const visibleNews = news[pagenumber];

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('news__image-wrapper');
  imageWrapper.style.backgroundImage = `url('${visibleNews.imageUrl}')`;

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('news__text-wrapper');

  const text = document.createElement('p');
  text.innerHTML = `${visibleNews.description}`;
  text.classList.add('news__text');

  const date = document.createElement('p');
  date.innerHTML = `Опубліковано: ${visibleNews.date}`;
  date.classList.add('news__date');

  newsBoxEl.appendChild(imageWrapper);
  textWrapper.appendChild(text);
  textWrapper.appendChild(date);
  newsBoxEl.appendChild(textWrapper);
};

const checkPageNumber = () => {
  if (pagenumber <= 0) {
    prevButtonEL.setAttribute('disabled', 'true');
  } else {
    prevButtonEL.removeAttribute('disabled');
  }

  if (pagenumber === news.length - 1) {
    nextButtonEL.setAttribute('disabled', 'true');
  } else {
    nextButtonEL.removeAttribute('disabled');
  }
};

checkPageNumber();
renderNews();

prevButtonEL.addEventListener('click', () => {
  pagenumber -= 1;
  checkPageNumber();
  renderNews();
});

nextButtonEL.addEventListener('click', e => {
  pagenumber += 1;
  checkPageNumber();
  renderNews();
});

const uaButton = document.querySelector('#button-ua');
const enButton = document.querySelector('#button-en');
const heroLogoImg = document.querySelector('.hero-logo');
const footerLogoImg = document.querySelector('.footer-logo');
const allLang = ['en', 'ua'];
let currentLang;

function changeURLLanguage(lang) {
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

uaButton.addEventListener('click', () => {
  if (currentLang === uaButton.textContent) return;
  currentLang = uaButton.textContent;
  changeURLLanguage(currentLang);
});

enButton.addEventListener('click', () => {
  if (currentLang === enButton.textContent) return;
  currentLang = enButton.textContent;
  changeURLLanguage(currentLang);
});

function changeLanguage() {
  let hash = window.location.hash.slice(1);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ua';
    location.reload();
  }
  if (hash === 'ua') {
    uaButton.classList.add('active-lang');
    enButton.classList.remove('active-lang');
    heroLogoImg.setAttribute('src', './images/logo_hero_ua.png');
    footerLogoImg.setAttribute('src', './images/logo_footer_ua.png');
  }
  if (hash === 'en') {
    enButton.classList.add('active-lang');
    uaButton.classList.remove('active-lang');
    heroLogoImg.setAttribute('src', './images/logo_hero_en.png');
    footerLogoImg.setAttribute('src', './images/logo_footer_en.png');
  }
  document.querySelector('title').innerHTML = langArr['websiteTitle'][hash];
  for (let key in langArr) {
    let elem = document.querySelector(`#${key}`);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }
}

changeLanguage();

import { newsUa, newsEn } from './news';
import { langArr } from './translation';
import logoFooterUa from './images/logo_footer_ua.png';
import logoFooterEn from './images/logo_footer_en.png';
import logoHeroUa from './images/logo_hero_ua.png';
import logoHeroEn from './images/logo_hero_en.png';

const newsBoxEl = document.querySelector('.news__box');
const prevButtonEL = document.querySelector('#prev-button');
const nextButtonEL = document.querySelector('#next-button');

let pagenumber = 0;
let hash = window.location.hash.slice(1);

const renderNews = () => {
  newsBoxEl.innerHTML = '';
  let visibleNews;
  if (hash === 'ua') {
    visibleNews = newsUa[pagenumber];
  } else if (hash === 'en') {
    visibleNews = newsEn[pagenumber];
  }

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('news__image-wrapper');
  console.log(visibleNews);
  imageWrapper.style.backgroundImage = `url('${visibleNews.imageUrl}')`;

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('news__text-wrapper');

  const text = document.createElement('p');
  text.innerHTML = `${visibleNews.description}`;
  text.classList.add('news__text');

  const date = document.createElement('p');
  date.innerHTML = `${visibleNews.date}`;
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

  if (pagenumber === newsUa.length - 1) {
    nextButtonEL.setAttribute('disabled', 'true');
  } else {
    nextButtonEL.removeAttribute('disabled');
  }
};

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
const heroLogoImg = document.querySelector('#hero-logo');
const footerLogoImg = document.querySelector('#footer-logo');
const heroSection = document.querySelector('#hero-section');
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
    heroLogoImg.setAttribute('src', logoHeroUa);
    footerLogoImg.setAttribute('src', logoFooterUa);
    heroSection.classList.add('hero-ua');
  }
  if (hash === 'en') {
    enButton.classList.add('active-lang');
    uaButton.classList.remove('active-lang');
    heroLogoImg.setAttribute('src', logoHeroEn);
    footerLogoImg.setAttribute('src', logoFooterEn);
    heroSection.classList.add('hero-en');
  }
  document.querySelector('title').innerHTML = langArr['websiteTitle'][hash];
  for (let key in langArr) {
    let elem = document.querySelector(`#${key}`);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }
}

checkPageNumber();
renderNews();
changeLanguage();

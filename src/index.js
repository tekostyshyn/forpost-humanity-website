import { news } from './news/news';

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

  console.log(pagenumber);
  console.log(news.length);

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

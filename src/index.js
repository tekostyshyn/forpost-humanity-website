const url = 'https://646e285f9c677e23218b2f9c.mockapi.io/allnews';

const newsListEL = document.querySelector('.news__list');
const newsButtonEL = document.querySelector('.news__button');


const fetchNews = async pagenumber => {
  try {
    const response = await fetch(`${url}?limit=3&page=${pagenumber}`);
    const news = await response.json();
    console.log(news);

    const markup = news
      .map(el => `<li class=""><p>${el.title}</p></li>`)
      .join('');
    newsListEL.innerHTML = markup;

  } catch (error) {
    console.log(error.message);
  }
};

fetchNews(1);
newsButtonEL.addEventListener('click', () => {
    fetchNews(2)
})

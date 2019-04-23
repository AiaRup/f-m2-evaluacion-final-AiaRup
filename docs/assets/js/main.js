'use strict';
const searchButton = document.querySelector('.form__button'),
  searchInput = document.querySelector('.form__input'),
  seriesList = document.querySelector('.series'),
  favoritiesList = document.querySelector('.series__favorities'),
  errorContainer = document.querySelector('.error');
let favoriteSeries = [];
const findInArray = (e, t) => e.findIndex(e => e.id === parseInt(t)),
  changeSeriesArray = (e, t) => {
    const a = findInArray(favoriteSeries, t);
    -1 !== a ? favoriteSeries.splice(a, 1) : favoriteSeries.push(e),
      saveStorageData(favoriteSeries),
      paintFavorities(favoriteSeries);
  },
  showObject = (e, t, a) => ({ name: e, image: t, id: a });
function saveStorageData(e) {
  localStorage.setItem('favoriteShows', JSON.stringify(e));
}
function getStorageData(e) {
  return JSON.parse(localStorage.getItem(e));
}
function removeStorageData(e) {
  localStorage.removeItem(e);
}
function showOnClick(e, t) {
  const { currentTarget: a } = e;
  a.classList.toggle('favorite');
  const s = a.dataset.id;
  changeSeriesArray(t, s);
}
function deleteFavorite(e) {
  const t = findInArray(favoriteSeries, e);
  favoriteSeries.splice(t, 1), paintFavorities(favoriteSeries);
  const a = document.querySelectorAll('.favorite');
  for (const t of a)
    parseInt(t.dataset.id) === e && t.classList.remove('favorite');
  removeStorageData('favoriteShows'), saveStorageData(favoriteSeries);
}
const fetchOnEnter = e => {
  13 === e.keyCode && searchSeries(apiUrl);
};
window.addEventListener('keyup', fetchOnEnter);
const apiUrl = 'http://api.tvmaze.com/search/shows?q=',
  defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV',
  takeUserInput = () => {
    const e = { text: searchInput.value, status: !0 };
    return (
      e.text
        ? errorContainer.classList.add('hidden')
        : ((e.status = !1), errorContainer.classList.remove('hidden')),
      e
    );
  },
  checkImage = e => (e ? e.medium : defaultImage),
  showSeries = ({ show: e }) => {
    let { image: t, name: a, id: s } = e;
    t = checkImage(t);
    const i = document.createElement('li');
    i.classList.add('show'),
      i.setAttribute('data-id', s),
      -1 !== findInArray(favoriteSeries, s) && i.classList.add('favorite');
    const r = document.createElement('div'),
      o = document.createElement('img');
    r.classList.add('show__image'),
      o.setAttribute('alt', a),
      o.setAttribute('src', t),
      o.classList.add('show__image-fake'),
      r.setAttribute('style', `background-image:url('${t}')`);
    const n = document.createElement('h3');
    n.classList.add('show__title');
    const c = document.createTextNode(a);
    n.appendChild(c), i.appendChild(r), i.appendChild(n);
    const d = showObject(a, t, s);
    i.addEventListener('click', e => {
      showOnClick(e, d);
    }),
      seriesList.appendChild(i);
  };
function searchSeries(e) {
  const t = takeUserInput();
  t.status &&
    fetch(`${e}${t.text}`)
      .then(e => e.json())
      .then(e => {
        seriesList.innerHTML = '';
        for (const t of e) showSeries(t);
      })
      .catch(e => console.log('error', e));
}
function paintFavorities(e) {
  favoritiesList.innerHTML = '';
  for (const t of e) {
    const { id: e, image: a, name: s } = t,
      i = document.createElement('li');
    i.classList.add('show__favorite'), i.setAttribute('data-id', e);
    const r = document.createElement('div'),
      o = document.createElement('img');
    r.classList.add('favorite__image'),
      o.setAttribute('alt', s),
      o.setAttribute('src', a),
      o.classList.add('favorite__image-fake'),
      r.setAttribute('style', `background-image:url('${a}')`);
    const n = document.createElement('div');
    n.classList.add('favorite__title-container');
    const c = document.createElement('h4');
    c.classList.add('favorite__title');
    const d = document.createTextNode(s);
    c.appendChild(d);
    const l = document.createElement('i');
    l.classList.add('fas', 'fa-times-circle', 'delete-icon'),
      l.addEventListener('click', () => {
        deleteFavorite(e);
      }),
      n.appendChild(c),
      n.appendChild(l),
      i.appendChild(r),
      i.appendChild(n),
      favoritiesList.appendChild(i);
  }
}
searchButton.addEventListener('click', () => {
  searchSeries(apiUrl);
});
const loadFavorites = () => {
  favoriteSeries = [];
  const e = getStorageData('favoriteShows');
  e && ((favoriteSeries = e), paintFavorities(e));
};
loadFavorites();

'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');

// Variables to work with
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const favorities = [];
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';

// Functions
const takeUserInput = () => {
  const value = {
    text: searchInput.value,
    status: true,
  };
  // check if value is empty
  if (!value.text) {
    value.status = false;
  } else {
    // SHOW MESSAGE
  }
  return value;
};

const showSeries = ({ show }) => {
  console.log('show', show);
};
const searchSeries = url => {
  const userValue = takeUserInput();
  // if user entered a search value search the api
  if (userValue.status) {
    console.log(`${url}${userValue.text}`);
    fetch(url + userValue.text)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        for (const series of data) {
          showSeries(series);
        }
      });
  }
};
const favoriteSeries = () => {};

// Event listeners
searchButton.addEventListener('click', () => {
  searchSeries(apiUrl);
});

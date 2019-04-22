'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');
const favoritiesList = document.querySelector('.series__favorities');

// Variables to work with
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let favoriteSeries = [];
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';

// Functions

// function to take user input from input
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

// function to save in local storage
const saveStorageData = array => {
  localStorage.setItem('favoriteShows', JSON.stringify(array));
};

// function to take data from local storage
const getStorageData = text => {
  return JSON.parse(localStorage.getItem(text));
};

// function to take data from local storage
const removeStorageData = item => {
  localStorage.removeItem(item);
};

// function to check if show's image is available
const checkImage = img => {
  return img ? img.medium : defaultImage;
};

// function to add or remove show's id from array
const changeSeriesArray = (show, id) => {
  const filteredArray = favoriteSeries.filter(show => show.id === parseInt(id));

  if (filteredArray.length) {
    favoriteSeries.splice(favoriteSeries.indexOf(filteredArray), 1);
  } else {
    favoriteSeries.push(show);
  }
  saveStorageData(favoriteSeries);
};

// function for the show event listener
const showOnClick = (event, show) => {
  const { currentTarget: listItem } = event;
  listItem.classList.toggle('favorite');
  // create show object
  const clickedId = listItem.dataset.id;
  console.log('id clicked', clickedId);

  changeSeriesArray(show, clickedId);
};

// function to create show object
const showObject = (name, image, id) => {
  return {
    name,
    image,
    id,
  };
};

// function to paint shows on the page
const showSeries = ({ show }) => {
  // console.log(show);
  let { image, name, id } = show;
  // check if image exists
  image = checkImage(image);

  const showContainer = document.createElement('li');
  showContainer.classList.add('show');
  showContainer.setAttribute('data-id', id);

  const imageShow = document.createElement('div');
  const fakeImage = document.createElement('img');
  imageShow.classList.add('show__image');
  fakeImage.setAttribute('alt', name);
  fakeImage.setAttribute('src', image);
  fakeImage.classList.add('show__image-fake');
  imageShow.setAttribute('style', `background-image:url('${image}')`);

  const nameShow = document.createElement('h2');
  nameShow.classList.add('show__title');
  const showTitle = document.createTextNode(name);
  nameShow.appendChild(showTitle);

  showContainer.appendChild(nameShow);
  showContainer.appendChild(imageShow);

  // create shoe object
  const showObj = showObject(name, image, id);
  showContainer.addEventListener('click', e => {
    showOnClick(e, showObj);
  });

  seriesList.appendChild(showContainer);
};

// function to fatch series from the api
const searchSeries = url => {
  const userValue = takeUserInput();
  // if user entered a search value search the api
  if (userValue.status) {
    fetch(`${url}${userValue.text}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        for (const show of data) {
          showSeries(show);
        }
      });
  }
};

// function to paint favorities on page
const paintFavorities = listShows => {
  console.log('favorities', listShows);
};

//function for the delete event of favorite
const deleteFavorite = show => {
  // delete from local array

  // delete from page

  // delete from local storage
  removeStorageData('favoriteShows');
};

// function to take favorites as the page loads
const loadFavorites = () => {
  favoriteSeries = [];
  const favorites = getStorageData('favoriteShows');
  if (favorites) {
    favoriteSeries = favorites;
    paintFavorities(favorites);
  }
};

// Event listeners
searchButton.addEventListener('click', () => {
  searchSeries(apiUrl);
});

loadFavorites();

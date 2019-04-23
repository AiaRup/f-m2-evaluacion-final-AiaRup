'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');
const favoritiesList = document.querySelector('.series__favorities');
const errorContainer = document.querySelector('.error');
const deleteAllButton = document.querySelector('.button__delete-all');
const counterElement = document.querySelector('.counter');

// Variables to work with
let favoriteSeries = [];
let counterFav = 0;

/** Helper Functions **/
const findInArray = (array, element) => {
  return array.findIndex(item => item.id === parseInt(element));
};

// function to add or remove show from array
const changeSeriesArray = (show, id) => {
  const indexOfShow = findInArray(favoriteSeries, id);
  if (indexOfShow !== -1) {
    favoriteSeries.splice(indexOfShow, 1);
    counterFav--;
    counterElement.innerHTML = counterFav;
  } else {
    favoriteSeries.push(show);
    counterFav++;
    counterElement.innerHTML = counterFav;
  }
  saveStorageData(favoriteSeries);
  paintFavorities(favoriteSeries);
};

// function to create object with properties of show
const createShowObject = (name, image, id) => {
  return {
    name,
    image,
    id,
  };
};

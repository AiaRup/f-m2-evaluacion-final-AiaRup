'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');
const favoritiesList = document.querySelector('.series__favorities');
const errorContainer = document.querySelector('.error');

// Variables to work with
let favoriteSeries = [];

// Functions

// function to add or remove show from array
const changeSeriesArray = (show, id) => {
  const filteredArray = favoriteSeries.filter(show => show.id === parseInt(id));

  if (filteredArray.length) {
    favoriteSeries.splice(favoriteSeries.indexOf(filteredArray), 1);
  } else {
    favoriteSeries.push(show);
  }
  saveStorageData(favoriteSeries);
  paintFavorities(favoriteSeries);
};

// function to create show object
const showObject = (name, image, id) => {
  return {
    name,
    image,
    id,
  };
};

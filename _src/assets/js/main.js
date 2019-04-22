'use strict';

// Elements to work with
const searchButton = document.querySelector('.form__button');
const searchInput = document.querySelector('.form__input');
const seriesList = document.querySelector('.series');
const favoritiesList = document.querySelector('.series__favorities');
const errorContainer = document.querySelector('.error');

// Variables to work with
let favoriteSeries = [];
// let seriesResults = [];

/** Helper Functions **/

const findInArray = (array, element) => {
  return array.findIndex(item => item.id === parseInt(element));
};

// function to add or remove show from array
const changeSeriesArray = (show, id) => {
  const indexOfShow = findInArray(favoriteSeries, id);
  // const indexOfShow = favoriteSeries.findIndex(
  //   show => show.id === parseInt(id)
  // );

  if (indexOfShow !== -1) {
    favoriteSeries.splice(indexOfShow, 1);
  } else {
    favoriteSeries.push(show);
  }
  saveStorageData(favoriteSeries);
  paintFavorities(favoriteSeries);
};

// function to create object with properties of show
const showObject = (name, image, id) => {
  return {
    name,
    image,
    id,
  };
};

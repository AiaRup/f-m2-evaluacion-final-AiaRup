'use strict';

// function for the show event listener on click
function showOnClick(event, show) {
  const { currentTarget: listItem } = event;
  listItem.classList.toggle('favorite');
  // create show object
  const clickedId = listItem.dataset.id;
  changeSeriesArray(show, clickedId);
}

const findInArray = (array, element) => {
  return array.findIndex(item => item.id === parseInt(element));
};

//function for the delete event of favorite
function deleteFavorite(showId) {
  // delete from local array
  // const indexOfShow = favoriteSeries.findIndex(
  //   item => item.id === parseInt(showId)
  // );

  const indexOfShow = findInArray(favoriteSeries, showId);

  console.log('index', indexOfShow);
  favoriteSeries.splice(indexOfShow, 1);
  // delete from page
  paintFavorities(favoriteSeries);

  // change class favorite if exist in search container
  const indexShow = findInArray(seriesResults, showId);
  // const indexShow = seriesResults.findIndex(
  //   item => item.id === parseInt(showId)
  // );

  const pageSeriesResults = document.querySelectorAll('.favorite');
  for (const listItem of pageSeriesResults) {
    if (listItem.dataset('id') === showId) {
      listItem.classList.remove('favorite');
    }
  }
  console.log('element', pageSeriesResults);
  pageSeriesResults[indexShow].classList.remove('favorite');

  // delete from local storage
  removeStorageData('favoriteShows');
  saveStorageData(favoriteSeries);
}

const fetchOnEnter = event => {
  if (event.keyCode === 13) {
    searchSeries(apiUrl);
  }
};

window.addEventListener('keyup', fetchOnEnter);

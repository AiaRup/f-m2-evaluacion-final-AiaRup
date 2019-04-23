'use strict';

// function for the show event listener on click
function showOnClick(event, show) {
  const { currentTarget: listItem } = event;
  listItem.classList.toggle('favorite');
  // create show object
  const clickedId = listItem.dataset.id;
  changeSeriesArray(show, clickedId);
}

//function for the delete event of favorite
function deleteFavorite(showId) {
  // delete from local array
  const indexOfShow = findInArray(favoriteSeries, showId);
  favoriteSeries.splice(indexOfShow, 1);
  // delete from page
  paintFavorities(favoriteSeries);

  // change class favorite if exist in search container
  const pageSeriesResults = document.querySelectorAll('.favorite');
  for (const listItem of pageSeriesResults) {
    if (parseInt(listItem.dataset.id) === showId) {
      listItem.classList.remove('favorite');
    }
  }
  // delete from local storage
  removeStorageData('favoriteShows');
  saveStorageData(favoriteSeries);
}

// function to delete all favorites
const deleteAllFav = array => {
  array = [];
  removeStorageData('favoriteShows');
  favoritiesList.innerHTML = '';
  // update count of favorites
};

const fetchOnEnter = event => {
  if (event.keyCode === 13) {
    searchSeries(apiUrl);
  }
};

window.addEventListener('keyup', fetchOnEnter);
deleteAllButton.addEventListener('click', () => {
  deleteAllFav(favoriteSeries);
});

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
  const indexOfShow = favoriteSeries.findIndex(
    item => item.id === parseInt(showId)
  );
  console.log('index', indexOfShow);
  favoriteSeries.splice(indexOfShow, 1);
  // delete from page
  paintFavorities(favoriteSeries);

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

'use strict';

// function for the show event listener on click
function onShowClick(event, show) {
  const { currentTarget: listItem } = event;
  listItem.classList.toggle('favorite');
  const heartIcon = listItem.querySelector('.heart-icon');
  heartIcon.classList.toggle('fa-heart');
  heartIcon.classList.toggle('fa-heart-broken');

  // create show object
  const clickedId = listItem.dataset.id;
  // update favorites array and update page
  changeSeriesArray(show, clickedId);
}

// function for the delete event of favorite
function deleteFavorite(showId) {
  // delete from local array
  const indexOfShow = findInArray(favoriteSeries, showId);
  favoriteSeries.splice(indexOfShow, 1);
  // delete from page
  paintFavorities(favoriteSeries);
  // update counter
  counterFav--;
  counterElement.innerHTML = counterFav;

  // hide button to delete all if counter is 0
  if (!counterFav) {
    deleteAllButton.classList.add('hidden');
  }

  // remove class favorite if exist in search container
  const pageSeriesResults = document.querySelectorAll('.favorite');
  for (const listItem of pageSeriesResults) {
    if (parseInt(listItem.dataset.id) === showId) {
      const heartIcon = listItem.querySelector('.heart-icon');
      listItem.classList.remove('favorite');
      heartIcon.classList.remove('fa-heart');
      heartIcon.classList.add('fa-heart-broken');
    }
  }
  // delete from local storage
  removeStorageData('favoriteShows');
  saveStorageData(favoriteSeries);
}

// function to delete all favorites
const deleteAllFav = arr => {
  arr.length = 0;
  removeStorageData('favoriteShows');
  favoritiesList.innerHTML = '';
  // update list of result and change class if needed
  const pageSeriesResults = document.querySelectorAll('.favorite');
  for (const listItem of pageSeriesResults) {
    if (listItem.classList.contains('favorite')) {
      const heartIcon = listItem.querySelector('.heart-icon');
      listItem.classList.remove('favorite');
      heartIcon.classList.remove('fa-heart');
      heartIcon.classList.add('fa-heart-broken');
    }
  }
  // update count of favorites
  counterFav = 0;
  counterElement.innerHTML = counterFav;
  // hide button to delete all
  deleteAllButton.classList.add('hidden');
};

// function for collapse favorites
const onCollapseClick = () => {
  leftPanelElement.classList.toggle('favorite__show');
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

collapseIcon.addEventListener('click', onCollapseClick);

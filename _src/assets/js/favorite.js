'use strict';

// function to paint favorities on page
function paintFavorities(listShows) {
  favoritiesList.innerHTML = '';
  for (const show of listShows) {
    const { id, image, name } = show;
    const showContainer = document.createElement('li');
    showContainer.classList.add('show__favorite');
    showContainer.setAttribute('data-id', id);
    const imageShow = document.createElement('div');
    const fakeImage = document.createElement('img');
    imageShow.classList.add('favorite__image');
    fakeImage.setAttribute('alt', name);
    fakeImage.setAttribute('src', image);
    fakeImage.classList.add('favorite__image-fake');
    imageShow.setAttribute('style', `background-image:url('${image}')`);

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('favorite__title-container');

    const nameShow = document.createElement('h4');
    nameShow.classList.add('favorite__title');
    const showTitle = document.createTextNode(name);
    nameShow.appendChild(showTitle);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-times-circle', 'delete-icon');

    deleteIcon.addEventListener('click', () => {
      deleteFavorite(id);
    });

    titleContainer.appendChild(nameShow);
    titleContainer.appendChild(deleteIcon);

    showContainer.appendChild(imageShow);
    showContainer.appendChild(titleContainer);
    favoritiesList.appendChild(showContainer);
  }
}

// function to take favorites as the page loads
const loadFavorites = () => {
  favoriteSeries = [];
  const favorites = getStorageData('favoriteShows');
  if (favorites) {
    favoriteSeries = favorites;
    paintFavorities(favorites);
  }
};

loadFavorites();

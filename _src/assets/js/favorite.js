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
    const nameShow = document.createElement('h2');
    nameShow.classList.add('favorite__title');
    const showTitle = document.createTextNode(name);
    nameShow.appendChild(showTitle);

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('favorite__delete-icon');
    const iconText = document.createTextNode('x');
    deleteIcon.appendChild(iconText);

    deleteIcon.addEventListener('click', () => {
      deleteFavorite(id);
    });

    showContainer.appendChild(nameShow);
    showContainer.appendChild(imageShow);
    showContainer.appendChild(deleteIcon);
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

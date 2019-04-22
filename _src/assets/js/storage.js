// function to save in local storage
function saveStorageData(array) {
  localStorage.setItem('favoriteShows', JSON.stringify(array));
}

// function to take data from local storage
function getStorageData(text) {
  return JSON.parse(localStorage.getItem(text));
}

// function to take data from local storage
function removeStorageData(item) {
  localStorage.removeItem(item);
}

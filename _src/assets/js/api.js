'use strict';
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

// function to take user input from input
const takeUserInput = () => {
  const value = {
    text: searchInput.value,
    status: true,
  };
  // check if value is empty
  if (!value.text) {
    value.status = false;
    errorContainer.classList.remove('hidden');
  } else {
    // SHOW MESSAGE
    errorContainer.classList.add('hidden');
  }
  return value;
};

// function to check if show's image is available
const checkImage = img => {
  return img ? img.medium : defaultImage;
};

// function to paint shows on the page
const showSeries = ({ show }) => {
  // console.log(show);
  let { image, name, id } = show;
  // check if image exists
  image = checkImage(image);

  const showContainer = document.createElement('li');
  showContainer.classList.add('show');
  showContainer.setAttribute('data-id', id);

  // check if the show is already on the favorites list
  const indexOfShow = favoriteSeries.findIndex(item => item.id === id);

  if (indexOfShow !== -1) {
    showContainer.classList.add('favorite');
  }

  const imageShow = document.createElement('div');
  const fakeImage = document.createElement('img');
  imageShow.classList.add('show__image');
  fakeImage.setAttribute('alt', name);
  fakeImage.setAttribute('src', image);
  fakeImage.classList.add('show__image-fake');
  imageShow.setAttribute('style', `background-image:url('${image}')`);

  const nameShow = document.createElement('h3');
  nameShow.classList.add('show__title');
  const showTitle = document.createTextNode(name);
  nameShow.appendChild(showTitle);

  showContainer.appendChild(imageShow);
  showContainer.appendChild(nameShow);

  // create show object
  const showObj = showObject(name, image, id);
  showContainer.addEventListener('click', event => {
    showOnClick(event, showObj);
  });

  // add each object to the results array
  seriesResults.push(showObj);
  console.log('results', seriesResults);

  seriesList.appendChild(showContainer);
};

// function to fatch series from the api
function searchSeries(url) {
  const userValue = takeUserInput();
  // if user entered a search value search the api
  if (userValue.status) {
    fetch(`${url}${userValue.text}`)
      .then(response => response.json())
      .then(data => {
        seriesResults = [];
        seriesList.innerHTML = '';
        for (const show of data) {
          showSeries(show);
        }
      })
      .catch(error => console.log('error', error));
  }
}

searchButton.addEventListener('click', () => {
  searchSeries(apiUrl);
});

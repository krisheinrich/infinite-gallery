const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoadedCount = 0;
let photosArray = [];

const imageCount = 10;
const imageCountInitial = 5;
let isInitial = true;
const getTotalCount = () => isInitial ? imageCountInitial : imageCount;

// Unsplash API proxy
// TODO: update for production(?)
const apiProxyUrl = 'http://localhost:3000';
const getApiUrl = () => `${apiProxyUrl}/api/search?count=${getTotalCount()}`;

function imageLoaded() {
  imagesLoadedCount++;
  if (imagesLoadedCount == getTotalCount()) {
    ready = true;
    loader.hidden = true;
    isInitial = false;
  }
}

function renderPhotos() {
  imagesLoadedCount = 0;
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(getApiUrl());
    photosArray = await res.json();
    renderPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('scroll', () => {
  if (ready && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    ready = false;
    loader.hidden = false;
    getPhotos();
  }
});

// on load
getPhotos();

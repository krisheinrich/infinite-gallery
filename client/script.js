const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let photosArray = [];

// Unsplash API proxy
const count = 3;
// TODO: update for production
const apiProxyUrl = 'http://localhost:3000';
const apiUrl = `${apiProxyUrl}/api/search?count=${count}`;

function displayPhotos() {
  photosArray.forEach(photo => {
    // anchor
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // image
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    // append
    item.appendChild(img);
    imageContainer.appendChild(item);
  });

  loader.hidden = true;
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}


// on load
getPhotos();

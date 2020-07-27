
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

// Unsplash API
const apiKey = "";
let imageCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// Updates api with new image count
function updateAPIURLWithNewCount(count){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

// Checks if all images were loaded
function imageLoaded(){

    imagesLoaded++;

    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function that sets attributes for the images on the DOM
function setAttributes(element, attributes){
    for(const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos then add to the DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // Create a link to unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create image element for the photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event listener to check when each photo is finished loading
        img.addEventListener('load', imageLoaded);

        // Put img element inside he a tag, then add both inside the image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api
async function getPhotos(){
    try{

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        if(isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }

    }catch(error){
        console.log(error);
    }
}

// Check to see if scrolling near the bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
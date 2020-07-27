
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API
const apiKey = "";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function that sets attributes for the images on the DOM
function setAttributes(element, attributes){
    for(const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos then add to the DOM
function displayPhotos(){
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

    }catch(error){
        console.log(error);
    }
}

// On Load
getPhotos();
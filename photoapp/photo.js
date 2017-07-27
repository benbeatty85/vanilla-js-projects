//348d610e39736195b837adc439effa70 flickr key
//https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=YOUR_API_KEY&text=THE_SEARCH_TEXT

(function() { //IIFE - immediately invoked function expression
var FLICKR_API_KEY = '348d610e39736195b837adc439effa70';
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api+key='

function getPhotosForSearch(searchTerms) {
//ES6 template string - to concatenate our variables together into the url we'll use to ask the API for data
var url = `${FLICKR_API_URL}${FLICKR_API_KEY}&text=${searchTerms}`;
return(fetch(url)
    .then(response => response.json()) 
    .then(data => data.photos.photo) // t
    .then(function(photo) {
     //tell FLickr what info we want and how we want it; from the data.photos.photo array (example at https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=8284bf026642da8da2022909704338cb&text=dog)
            return photo.map(function(photo) {
                return {thumb: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`, large: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`, title: `${photo.title}` }
                //these URL formats are found at https://www.flickr.com/services/api/misc.urls.html    
                //we want to retrieve the thumbnail, the large photo and the image title
            });
        })
)}
// Wire up a search form submit event to start the search using the word(s) in the 
// form input. When receiving the results, clear a pre-existing container div and put the results in there. 
function createFlickrThumb(photoData) {
  var link = document.createElement('a'); //create a new link
  link.setAttribute('href', photoData.large); //set the link's href attribute. so we have the large photo; it exists as a link to the larger image. it doesn't appear on our page.
  link.setAttribute('target', '_blank'); // set the links target attribute. this will open link in a new tab
  var image = document.createElement('img'); //now we have the link, we are going to create the img 
  image.setAttribute('src', photoData.thumb); //set the img's source attribute
  image.setAttribute('alt', photoData.title); //set the img alt attribute (for screen readers or if the img cant load for some reason)
  link.appendChild(image); //add the image to the link
  // the function createFlickrThumb actually returns an anchor with a image inside that would look like this:
  // <a href="URL OF THE LARGE IMAGE" target="_blank">
  //   <img src="URL OF THE THUMBNAIL" alt="TITLE OF THE IMAGE">
  // </a>
  return link; //now we can disply the link, which "contains" an image - when I click on the image, I'l go to a new tab with the larger image
}
//set variables from our HTML for the event listener to understand
//just like with the weather app
var app = document.querySelector('#app');
var searchForm = app.querySelector('.search-form');
var searchInput = searchForm.querySelector('.search-input');
var flickrPhotos = app.querySelector('.flickr-photos');
//event listener - this is where everything comes together
searchForm.addEventListener('submit', function(event) { 
  event.preventDefault(); 
  getPhotosForSearch(searchInput.value) //takes our search terms
    .then(photos => { //takes the array that we get back
      photos.forEach(function(photo) { //for each photo in the array
        flickrPhotos.appendChild(createFlickrThumb(photo)); //create a new thumbnail and add it to the gallery by calling the create function
      });
    });
});

getPhotosForSearch();

//page loader

var overlay = document.getElementById("overlay");

window.addEventListener('load', function () {
  overlay.style.display = 'none';

    
});


}) (); //end of IIFE
import config from "../conf/index.js";

async function init() {
   console.log(config.backendEndpoint);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
 
  //Updates the DOM with the cities
  // console.log(“From init()”);
  console.log(cities);
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const data = await fetch(config.backendEndpoint + "/cities");
    return await data.json();  
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  
  let parentElem=document.getElementById("data");

  //Creating the div with col size of the grid
  let newElem=document.createElement("div");
  newElem.setAttribute("class","col-sm-6 col-lg-3 g-5");

  //ahref of the card
  let ahref=document.createElement("a");
  ahref.setAttribute("target", "_blank");
  ahref.setAttribute("class","tile");
 
  //div for city title and text
  let cityDiv=document.createElement("div");
  cityDiv.setAttribute("class"," tile-text text-center");  

  //heading city name
  let heading=document.createElement("h5");

  //no of attractionns in city
  let paragraph=document.createElement("p");
  heading.innerText=city;
  paragraph.innerText=description;

  //image of the card
  let cardImage=document.createElement("img");
  //checking if the id is correct
    if(id.length=== city.length){
        ahref.setAttribute("href",`pages/adventures/?city=${id}`);
        ahref.setAttribute("id", id);
        cardImage.setAttribute("src",`${image}`);
        cardImage.setAttribute("alt",`${city}`);
        //appending from child to parent
        cityDiv.appendChild(heading);
        cityDiv.appendChild(paragraph);
        ahref.appendChild(cityDiv);
        ahref.appendChild(cardImage);
        newElem.appendChild(ahref);
        parentElem.appendChild(newElem);
  
  }
}

export { init, fetchCities, addCityToDOM };

import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params=new URLSearchParams(search);
   return (params.get("city"));
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data  
  try{
  console.log(getCityFromURL());
  let data =await fetch(config.backendEndpoint+"/adventures?city="+ city);
  let response = await data.json();
  console.log(response);
  return response;
  }catch(error){
  return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //call the parent element
  adventures.forEach((element) => {
  let parentElem=document.getElementById("data");
  //create the div for grid col
  let divCol=document.createElement("div");
  divCol.setAttribute("class","col-6 col-lg-3 mb-4 position-relative");
  //create the a tag 
  let a=document.createElement("a");
  a.setAttribute("href",`detail/?adventure=${element.id}`);
  a.setAttribute("id",`${element.id}`);
  //create a div for content of the card
  let divCard=document.createElement("div");
  divCard.setAttribute("class","card activity-card" )
  //create the image tag
  let imageTag=document.createElement("img");
  imageTag.setAttribute("src",`${element.image}`)
  imageTag.setAttribute("class","card-img-top rounded")
  //create a div for banner
  let divBanner=document.createElement("div")
  divBanner.setAttribute("class","category-banner")
  divBanner.innerText=element.category
  //create a div to hold the content ==price
  let divBody=document.createElement("div");
  divBody.setAttribute("class","body container-fluid")
  let divRow1=document.createElement("div");
  divRow1.setAttribute("class","d-md-flex justify-content-md-between ");
  let para=document.createElement("p");
  para.innerText=element.name;
  let para2=document.createElement("p");
  para2.innerText=element.currency + element.costPerHead;
  let divRow2=document.createElement("div");
  divRow2.setAttribute("class","d-md-flex justify-content-md-between ");
  let para3=document.createElement("p");
  para3.innerText="Duration";
  let para4=document.createElement("p");
  para4.innerText=element.duration;

  //Appending it to dom
  divRow1.appendChild( para);
  divRow1.appendChild(para2);
  divRow2.appendChild(para3);
  divRow2.appendChild(para4);
  divBody.appendChild(divRow1);
  divBody.appendChild(divRow2);
  divCard.appendChild(imageTag);
  divCard.appendChild(divBody);
  a.appendChild(divCard);
  divCol.appendChild(a);
  divCol.appendChild(divBanner);
  parentElem.appendChild(divCol);
});

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList=list;
  console.log(low)
  let filterdlist=newList.filter((element) => {
    if(element.duration>=low && element.duration <=high){
      return element.duration;
    }
    else{
       return false
      }
  });
  console.log(filterdlist);
  return filterdlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let newList=list;
  let resultList=newList.filter((items)=> categoryList.includes(items.category));
  return resultList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[];
  //pre-processing
  let resultArray=filters['duration'].split("-");
  let low=resultArray[0];
  let high=resultArray[1];
  //condtions
  if(filters.duration.length>0 && filters.category.length>0){
    let a = filterByCategory(list, filters.category);
    let b = filterByDuration(list, low, high);
    a.forEach((key1) => {
      b.forEach((key2) => {
        if(key1.id === key2.id){
          return filteredList.push(key1);
        }
      })
    });
  }
  else if(filters.category.length>0 && filters.duration.length===0){
    filteredList =filterByCategory(list,filters.category);
  }
  else if(filters.duration.length>0 && filters.category.length===0){
    filteredList=(filterByDuration(list,low,high));
  }
  else{
    return list;
  }
  console.log(filteredList);
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  //Create a category pill in dom
  let list=filters.category;
  for(let i=0;i<list.length;i++){
  let parent=document.getElementById("category-list");
  let divCategory=document.createElement("div");
  divCategory.setAttribute("class","category-filter")
  divCategory.textContent=list[i];
  //appending
  parent.appendChild(divCategory);
 }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

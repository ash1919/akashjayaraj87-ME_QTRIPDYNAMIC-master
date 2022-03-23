import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params=new URLSearchParams(search);
  let newParams = params.get("adventure");
  // Place holder for functionality to work in the Stubs
  return newParams;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId){
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let data =await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
  let response=await data.json();
  console.log(response);
  return response;
}
catch(err){
  return null;
}
  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let parentDiv=document.getElementById("adventure-detail-card");
  let headingh1=document.getElementById("adventure-name");
  headingh1.textContent=adventure.name;
  // console.log(headingh1);
  let subtitle=document.getElementById("adventure-subtitle");
  subtitle.textContent=adventure.subtitle;
  let imagesList=document.getElementById("photo-gallery");
  adventure.images.forEach((item) => {
    let imgDiv=document.createElement("div");
    let imageTag=document.createElement("img");
    imageTag.setAttribute("src",`${item}`);
    imageTag.setAttribute("class","activity-card-image");
    imgDiv.appendChild(imageTag);
    imagesList.appendChild(imgDiv);
  });
  let bottomContent=document.getElementById("adventure-content");
  let para=document.createElement("p");
  para.textContent=adventure.content;
  bottomContent.appendChild(para);
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let imagesList=document.getElementById("photo-gallery");
  imagesList.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-img">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

images.forEach((img, index) => {
  let div = document.createElement("div");
  div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
  div.innerHTML = `
    <img class="activity-card-image" src="${img}">
  `;
  document.getElementById("carousel-img").appendChild(div);
});
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationForm=document.getElementById("reservation-panel-available");
  let soldOut=document.getElementById("reservation-panel-sold-out");
  if(adventure.available){
    soldOut.style.display="none";
    reservationForm.style.display="block";
    //cost per head
    let costHead=document.getElementById("reservation-person-cost");
    costHead.textContent=adventure.costPerHead;
  }
  else{
    reservationForm.style.display="none";
    soldOut.style.display="block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservCost=adventure.costPerHead*persons;
  let totalCost=document.getElementById("reservation-cost");
  totalCost.textContent=reservCost;
  return reservCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 let reservForm=document.getElementById("myForm");
 reservForm.addEventListener('submit',async(event)=>{
   event.preventDefault();
  //  let api= config.backendEndpoint+ "/reservations/new";
   const api= `${config.backendEndpoint}/reservations/new`;
   let bodyStriing= JSON.stringify({
    name: reservForm.elements["name"].value,
    date: reservForm.elements["date"].value,
    person: reservForm.elements["person"].value,
    adventure:adventure.id
   });
 
 try{
   console.log(api);
   const res= await fetch(api,{
    method: 'POST',
    body:bodyStriing,
    headers: {
    'Content-Type': 'application/json',
      }
   });
  if(res.ok){
    alert("Success!");
    window.location.reload();
  }
  else{
    let data=await res.json();
    alert(`Failed!-${data.message}`);
    window.location.reload();
  }}
  catch(err){
    console.log("error");
    alert("Failed!-Fetch call resulted in error")
  }
});
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reserveBanner=document.getElementById("reserved-banner");
  if(adventure.reserved){
    reserveBanner.style.display='block';
  }
  else{
    reserveBanner.style.display='none';
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

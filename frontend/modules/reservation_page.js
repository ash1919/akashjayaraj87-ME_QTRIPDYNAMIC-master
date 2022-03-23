import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
  let data= await fetch(`${config.backendEndpoint}/reservations/`);
  let result=await data.json();
  return result;
  }
  // Place holder for functionality to work in the Stubs
  catch(e){
  return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
 
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tableBody=document.getElementById("reservation-table");
  let tableEle=document.createElement('tr');
   reservations.forEach((element,idx) => {
    let tableEle=document.createElement('tr');
    tableEle.innerHTML=`  
      <th>${element.id}</th>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleDateString("en-IN")}</td>
      <td>${element.price}</td>
      <td>${new Date(element.time).toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric",
        hour12:true,
      })}</td>
      <td><div class=" reservation-visit-button" id=${element.id}><a href="../detail/?adventure=${element.adventure}">Visit Adventure</div></a></td>
    `
      tableBody.appendChild(tableEle);
   });
  
   //Conditionally render the no-reservation-banner and reservation-table-parent
   if(reservations.length>0){
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
  }
    else{
      document.getElementById("no-reservation-banner").style.display="block";
      document.getElementById("reservation-table-parent").style.display="none";
    }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };

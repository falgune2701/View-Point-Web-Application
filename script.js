import { viewPointsInfo } from "./data.js";

const mainContainer = document.querySelector(".main-container");
const searchInput = document.querySelector("#input");
searchInput.addEventListener("keyup", handleSearch)
let searchValue = "";
let filteredArrOfViewpoint = [];
 
const createElement = (element) => document.createElement(element);


// Create viewPoint Card

const createViewpointCard = (viewPointsInfo) => {
    viewPointsInfo.forEach(viewPoint => {

        // create card container
        const cardContainer = createElement("div");
        cardContainer.classList.add("card-container");

        // create image container
        const imgContainer = createElement("div");
        imgContainer.classList.add("img-div");

        // create card image
        const imgEleme = createElement("img");
        imgEleme.setAttribute("src", viewPoint.img_url);
        imgEleme.setAttribute("alt", viewPoint.name)
        imgContainer.appendChild(imgEleme);
 

        //create card details container
        const cardDetails = createElement("div");
        cardDetails.classList.add("details");

        // card viewpoint name
        const vpNameEle = createElement("h3")
        vpNameEle.innerText = viewPoint.name;

        // create loc-info container
        const locInfoEle = createElement("div");
        locInfoEle.classList.add("loc-info");

        // card location info
         const locEle = createElement("p")
         if(viewPoint.loc_info){
            locEle.innerText = `${viewPoint.loc_info.city}, ${viewPoint.loc_info.state}`;
         } else{
            locEle.innerText = "Location Information not Available"
         }
        // create location logo
        const logoEle = createElement("i")
        logoEle.classList.add("fa-solid", "fa-location-dot");
        logoEle.setAttribute("id", "loc-logo");

        locInfoEle.appendChild(locEle);
        locInfoEle.appendChild(logoEle);
        cardDetails.appendChild(vpNameEle);
        cardDetails.appendChild(locInfoEle);

        // create moreinfo container
        const moreInfoEle = createElement("div");
        moreInfoEle.classList.add("more-info");

        moreInfoEle.addEventListener("click" ,() => {
            window.location.href = `${viewPoint.moreInfoUrl}`
        })
        // create moreinfo button
        const butEle = createElement("button");
        butEle.innerText = "More Info";
        const arrowEle = createElement("i");
        arrowEle.classList.add("fa-solid", "fa-arrow-right");
        butEle.appendChild(arrowEle);
        moreInfoEle.appendChild(butEle);

        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(cardDetails);
        cardContainer.appendChild(moreInfoEle);

        mainContainer.appendChild(cardContainer);
    });
}
 function handleSearch(event){
    searchValue = event.target.value.toLowerCase();
    filteredArrOfViewpoint = searchValue?.length > 0 ? viewPointsInfo.filter((viewPoint) => 
        searchValue === viewPoint.name.toLowerCase() || 
        searchValue === viewPoint.loc_info.state.toLowerCase() ||
        searchValue === viewPoint.loc_info.city.toLowerCase()) 
        : viewPointsInfo;
    mainContainer.innerHTML = "";
    createViewpointCard(filteredArrOfViewpoint);    
}


createViewpointCard(viewPointsInfo);
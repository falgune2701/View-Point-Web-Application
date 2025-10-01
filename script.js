import { viewPointsInfo } from "./data.js";

const mainContainer = document.querySelector(".main-container");
const searchInput = document.querySelector(".input");
const selectState = document.querySelector(".select-state");
let state = "";
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
        // create location icon
        const locIcon = createElement("i")
        locIcon.classList.add("fa-solid", "fa-location-dot");
        locIcon.setAttribute("id", "loc-logo");

        locInfoEle.appendChild(locEle);
        locInfoEle.appendChild(locIcon);
        cardDetails.appendChild(vpNameEle);
        cardDetails.appendChild(locInfoEle);

        // create butAndRatingCon container
        const butAndRatingCon = createElement("div")
        butAndRatingCon.classList.add("but-rat")

        // create moreinfo container
        const moreInfoEle = createElement("div");
        moreInfoEle.classList.add("more-info");

        moreInfoEle.addEventListener("click" ,() => {
            window.location.href = `${viewPoint.moreInfoUrl}`
        })
        // create moreinfo button
        const butEle = createElement("button");
        butEle.innerText = "More Info";
        //create arrow icon
        const arrowIcon = createElement("i");
        arrowIcon.classList.add("fa-solid", "fa-arrow-right");
        butEle.appendChild(arrowIcon);
        moreInfoEle.appendChild(butEle);

        //create rating container
        const ratingEle = createElement("div");
        ratingEle.classList.add("rating");

        // create star icon
        const starIcon = createElement("i");
        starIcon.classList.add("fa-solid", "fa-star");
        ratingEle.appendChild(starIcon);

        const starText = createElement("span");
        starText.innerText = viewPoint.star;
        ratingEle.appendChild(starText);
        butAndRatingCon.appendChild(moreInfoEle);
        butAndRatingCon.appendChild(ratingEle)

        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(cardDetails);
        cardContainer.appendChild(butAndRatingCon);
        // cardContainer.appendChild(ratingEle);

        mainContainer.appendChild(cardContainer);
    });
}

function getFilterData () {
   filteredArrOfViewpoint = searchValue?.length > 0 ? viewPointsInfo.filter((viewPoint) => 
        searchValue === viewPoint.name.toLowerCase() ||
        searchValue === viewPoint.loc_info.state.toLowerCase()  
        ) 
        : viewPointsInfo;
        return filteredArrOfViewpoint;
}
 function handleSearch(event){
    searchValue = event.target.value.toLowerCase();
    let filterBySearch = getFilterData();
    mainContainer.innerHTML = "";
    createViewpointCard(filterBySearch);    
}
//  function handleStateSelector (event){
//     state = event.target.value.toLowerCase();
//     filteredArrOfViewpoint =  state?.length > 0 ?viewPointsInfo.filter((viewPoint) => 
//         state === viewPoint.loc_info.state.toLowerCase()
//     )
//     : viewPointsInfo;
//     mainContainer.innerHTML = "";
//     createViewpointCard(filteredArrOfViewpoint);
//  }
function debounce (callback, delay){
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

const debouncedInput =  debounce(handleSearch, 800); 
searchInput.addEventListener("keyup", debouncedInput);
// selectState.addEventListener("change",handleStateSelector);

createViewpointCard(viewPointsInfo);
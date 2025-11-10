import { viewPointsInfo } from "./data.js";

const mainContainer = document.querySelector(".main-container");
const searchInput = document.querySelector(".input");
const selectRating = document.querySelector(".select-rating");
let ratingValue = "0";
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
        starText.innerText = viewPoint.rating;
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


// here write a function for filtering the data based on user input value 
function getFilterData () {
   filteredArrOfViewpoint = searchValue?.length > 0 ? viewPointsInfo.filter((viewPoint) => 
        searchValue === viewPoint.name.toLowerCase() ||
        searchValue === viewPoint.loc_info.state.toLowerCase()
        ) 
        : viewPointsInfo;

        if(ratingValue > 0){
            filteredArrOfViewpoint = searchValue?.length > 0 ? filteredArrOfViewpoint : viewPointsInfo;
            filteredArrOfViewpoint = filteredArrOfViewpoint.filter((viewPoint) => ratingValue <= viewPoint.rating);
        }
        return filteredArrOfViewpoint;
}

// start handleSearch function
 function handleSearch(event){
    searchValue = event.target.value.toLowerCase();
    let filterBySearch = getFilterData();
    mainContainer.innerHTML = "";
    createViewpointCard(searchValue ? filterBySearch : viewPointsInfo);    
}
// end handleSearch function

// start handleRating function based on rating show the matcching viewpoint card
selectRating.addEventListener("change",handleRating);
function handleRating(event){
    ratingValue = Number(event.target.value);
    let filterByRatig = getFilterData();
    mainContainer.innerHTML = "";
    createViewpointCard(ratingValue ? filterByRatig : viewPointsInfo); 
}
// end handleRating function


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

createViewpointCard(viewPointsInfo)


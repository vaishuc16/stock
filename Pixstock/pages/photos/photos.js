
"use strict";

/**
 * Import
 */

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";

/**
 * Show filtered bar if searched anything
 */

const /** {NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * Init filter
 */
const /** {NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach( $filterWrappers => {
    filter($filterWrappers, window.filterObj, (newObj) => {
        window.filterObj = newObj;
            updateUrl(newObj, "photos");
        
        
    });
});

/**
 * Render Curated or searched photos
 * if searched something then render searched photos
 * otherwise render curated photos
 */

const /** {NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]");
const /** {NodeElement} */ $title = document.querySelector("[data-title]");
const /** {Object} */ photoGrid = gridInit($photoGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {String} */ searchUrl = window.location.search.slice(1);
let /** {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** {String} */ title = searchObj ? `${searchObj.query} photos` : "Curated photos"

$title.textContent = title;
document.title = title;

/**
 * Render all photos
 * @param {Number} currentPage Current page number
 */

const  renderPhotos = function (currentPage) {

    client.photos[searchObj ? "search" : "curated"]({ ...searchObj, perPage: 
    perPage, page: currentPage }, data => {

        

        totalPage = Math.ceil(data.total_results / perPage);
        
    data.photos.forEach(photo => {

    const /** {NodeElement} */ $photoCard = photoCard(photo);

    updateUrl($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
});

        //when photos loaded
        isLoaded = true;

        //when no more photo found, hide loader
        if(currentPage >= totalPage) $loader.style.display = "none";

     });
}

renderPhotos(currentPage);

/**
 * Load More photos
 * 
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {

    console.log($loader.getBoundingClientRect().top);
    if($loader.getBoundingClientRect().top < (window.innerHeight * 2) &&
    currentPage <= totalPage && isLoaded) {

        currentPage++;
        renderPhotos(currentPage);
        isLoaded = false;
    }
});

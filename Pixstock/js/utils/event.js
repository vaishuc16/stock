
"use strict";

/**
 * Add event on multiple elements
 * @param {NodeList} $elements NodeList 
 * @param {String} eventType Event Type eg. "click"
 * @param {Function} callback callback function
 */

export const addEventOnElements = function ($elements, eventType, callback) {
    $elements.forEach($element => $element.addEventListener(eventType, callback));
}
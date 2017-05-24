/**
 * Name:        updateProgressBar.js
 * Description: Updates the progess bar as the crawler runs
 */

/**
 * Checks an input box to validate the users search type is correct
 *
 * @param {float} value
 */
function updateProgressBar(value) {
    newWidth = value + "%";
    $("#progress-bar-row").animate({width:newWidth},400);
    $("#progress-bar-row").attr("aria-valuenow",value);

}
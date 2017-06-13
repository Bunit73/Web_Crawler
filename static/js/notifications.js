/**
 * Notification Alert
 * @param {object} element that will trigger alert
 * @param {string} text to display on element
 */
function notifyAlert(element,text) {
    $(element).on('click',function () {
        $.alert(text);
    })
}

$(document).ready(function () {
    notifyAlert('#about','This web app searches the web for your keyword. It will start at your starting url and go to each ' +
        'link on that page looking for that word.');
});
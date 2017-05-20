/**
 * Name:        cookieParser.js
 * Description: Parses the cookie provided from the server and updates the dropdown with previous search results
 * References:
 *      https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
 *      https://www.quirksmode.org/js/cookies.html
 *      http://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
 */


var pastSearchHistory = [];

/**
 * Parses the past_search cookie and updates the past searches dropdown
 */
function parsePastSearchesCookie() {
    //If the cookie exists update the past search array
    if($.cookie("past_searches")){
        pastSearches = JSON.parse($.cookie("past_searches").split("\\054").join(","));
        updatePastSearchesDropDown($("#pastSerchesDD"), pastSearches.searches);
    }
    else{
        updatePastSearchesDropDown($("#pastSerchesDD"));
    }

}

/**
 * Parses the past_search cookie and updates the past searches dropdown
 * @param {object} dropDown
 * @param {array} arr
 */
function updatePastSearchesDropDown(dropDown, arr) {
    //Clear out the past search history global array
    pastSearchHistory = [];
    dropDown.empty();
    // If no past searches hide the element
    if(arr === undefined || arr.length === 0){
        dropDown.parent().hide();
    }
    else{
        dropDown.parent().show();
        dropDown.empty();
        dropDown.append("<option></option>");

        //Loop through the array and make an option for each url keyword combo
        arr.forEach(function (i,j) {
            dropDown.append("<option value='"+j+"'>"+i.url+" : " + i.keyword + "</option>");
            pastSearchHistory.push(i);
        });
    }
}

/**
 * Updates the user form with the data from the cookie
 * @param  {object} dropDown
 */
function loadPastSearchData(dropDown) {
    dropDown.on("change",function () {
        //Gets the specs out of the searchSpecs array
        if($(this).val()>=0){
            searchSpecs = pastSearchHistory[$(this).val()];
            $("#url").val(searchSpecs.url);
            $("#searchType").val(searchSpecs.type);
            $("#searchLimit").val(searchSpecs.num);
            $("#searchKeyword").val(searchSpecs.keyword)
        }
        else{
            $("#url").val('');
            $("#searchType").val("Depth");
            $("#searchLimit").val(0);
            $("#searchKeyword").val('');
        }
    })
}

$(document).ready(function () {
    //run on page load
    parsePastSearchesCookie();
    //bind the listener to the dropdown
    loadPastSearchData($("#pastSerchesDD"));
});
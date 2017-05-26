/**
 * Name:        submitForm.js
 * Description: handles the validation and submission of the form. If all validations checkout
 *              from the front end it passes the data to the server. If the server accepts the form information
 *              the web socket will start listing to update the node graph
 * References:  http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
 */

/**
 * Submits the webform to the server. To start the webcrawler and add cookie data
 */
function submitSearch() {
    $("#submitSearch").on("click",function () {
        //Submit the AJAX REQUEST
        if(validateInputs()){
            const url = $("#url").val();
            const type = $("#searchType").val();
            const number = $("#searchLimit").val();
            const keyword = $("#searchKeyword").val();

            data = {
                    url: url,
                    type: type,
                    number: number,
                    keyword: keyword
                };

            $.ajax({
                url:"/cookie_handler",
                method:'GET',
                data: data,
                success: function () {
                    socket.emit('random tree',data);
                    clearOutText();
                    fadeOutForm();
                    showProgressBar();
                    parsePastSearchesCookie();
                },
                error: function () {
                    //TODO: Handle Error
                }
            })
        }
    })
}

/**
 * Validates all web form parts
 * @return {boolean} validations passed
 */
function validateInputs() {
    validateURL($("#url"));
    validateSearchType($("#searchType"));
    validateMaxNum($("#searchLimit"));
    validateKeyword($("#searchKeyword"));

    return validateURL($("#url")) && validateSearchType($("#searchType")) && validateMaxNum($("#searchLimit")) && validateKeyword($("#searchKeyword"));
}


/**
 * Checks an input box to validate the users url is a valid scheme
 *
 * @param {object} urlTextInput
 * @return {boolean} validations passed
 * Reference: http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
 */
function validateURL(urlTextInput) {
    var url = urlTextInput.val();
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if(urlregex.test(url)){
        urlTextInput.removeClass("has-error");
        return true;
    }

    urlTextInput.addClass("has-error");
    return false;
}

/**
 * Checks an input box to validate the users search type is correct
 *
 * @param {object} searchTypeInput
 * @return {boolean} validations passed
 */
function validateSearchType(searchTypeInput) {
    if(searchTypeInput.val() === 'Depth' || searchTypeInput.val() === 'Breadth' ){
        searchTypeInput.removeClass("has-error");
        return true;
    }
    searchTypeInput.addClass("has-error");
    return false;
}

/**
 * Checks an input box to validate the users search depth
 *
 * @param {object} limitInput
 * @return {boolean} validations passed
 */
function validateMaxNum(limitInput){
    if(limitInput.val() > 0){
        limitInput.removeClass("has-error");
        return true;
    }
    limitInput.addClass("has-error");
    return false;
}

/**
 * Checks an input box to validate the users keyword
 *
 * @param {object} keywordInput
 * @return {boolean} validations passed
 */
function validateKeyword(keywordInput) {
    if(keywordInput.val() !== ''){
        keywordInput.removeClass("has-error");
        return true;
    }
    keywordInput.addClass("has-error");
    return false;
}

/**
 * Fades in the search again button
 */
function showSearchAgainBtn() {
    $("#searchAgainBtn").fadeIn();
}

/**
 * Fades in search form and hides search again button
 */
function newSearchStart() {
    $("#searchAgainBtn").on('click',function () {
        fadeInForm();
        $("#searchAgainBtn").hide();
    })
}

$(document).ready(function () {
    //Bind the search button
    submitSearch();
    newSearchStart();
});
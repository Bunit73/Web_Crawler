/**
 * Sends a list of strings to the server to create a text file
 *
 * @param {object} list of string
 */
function makeTextLog(textList) {
    var errorFlag = 0;
    var textStr = '';

    for(var i = 0; i < textList.length; i++){
        if(typeof textList[i] !== 'string' ){
            break;
        }
        else {
            var temp = textList[i] + '\r\n';
            textStr = textStr.concat(temp);
        }
    }
    if(errorFlag){
        $.alert("There Was An Error Making Your Search History");
    }
    else{
        var blob = new Blob([textStr], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "crawlerlog.txt");
    }
}

$(document).ready(function () {
    $("#exportLogBtn").on('click',function () {
        //console.log("submitted text log");
        makeTextLog(textLog);
    })
});
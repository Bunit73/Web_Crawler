/**
 * Creates a text file from the log information
 *
 * @param {object} textList array of string
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

/**
 * Crates a .json file that has has the tree data
 *
 * @param {object} json object
 * @param {string} fileName name of a file
 */
function makeJSONFile(json,fileName) {
    var text = JSON.stringify(json);
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, fileName);
}


$(document).ready(function () {
    $("#exportLogBtn").on('click',function () {
        makeTextLog(textLog);
    });
    $("#exportJsonBtn").on('click',function () {
        makeJSONFile(globalData.tree, "crawlertree.json");
    })
});
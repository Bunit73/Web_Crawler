var startTime, endTime, currTime;
var timeDiff;
var globalData;
var textLog = [];

var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('message',function (data) {
    globalData = data;

    updateProgressBar(data.progress);

    if(data.start){
        appendNewLine("Crawler Start");
        currTime = new Date();
        textLog.push(currTime + ": Crawler Stared");
        setRootData(data.new_node);
        startTime = new Date();
    }
    else{
        currTime = new Date();
        textLog.push(currTime + ": " + data.log);
        appendNewLine(data.log);
        update(data.new_node);
    }
    if(data.final){
        currTime = new Date();
        textLog.push(currTime + ": Crawler Finished");
        endTime = new Date();
        timeDiff = endTime - startTime;
        timeDiff /= 1000;
        Math.round(timeDiff % 60);
        var finishText = "Crawler Ended Elapsed Time: " + timeDiff + "sec";
        appendNewLine(finishText);
        fadeProgressBar();
        showPostSearch();
    }
});
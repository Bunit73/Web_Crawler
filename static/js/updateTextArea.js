function appendNewLine(text) {
    $("#log-text").append("<p-2>"+text+"</p-2>");
    $("#log-text").scrollTop($("#log-text")[0].scrollHeight);
}

function showTextArea() {
    $("#log-area").show();
    $("#log-tab").removeClass("inactive-tab");
    $("#log-tab").addClass("active-tab");
    $("#node-tab").addClass("inactive-tab");
    $("#node-tab").removeClass("active-tab");
}

function hideTextArea() {
    $("#log-area").hide();
    $("#log-tab").addClass("inactive-tab");
    $("#log-tab").removeClass("active-tab");

    $("#node-tab").removeClass("inactive-tab");
    $("#node-tab").addClass("active-tab");
}


function clearOutText() {
    $("#log-text").empty();
}

$(document).ready(function () {
    $("#log-tab").on('click',function () {
        showTextArea();
        hideChartArea()
    })
});
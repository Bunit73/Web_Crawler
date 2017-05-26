function showChartArea() {

    $("#chart-area").show();
    $("#log-tab").removeClass("inactive-tab");
    $("#log-tab").addClass("active-tab");

    $("#node-tab").addClass("inactive-tab");
    $("#node-tab").removeClass("active-tab");
}

function hideChartArea() {
    $("#chart-area").hide();
    $("#log-tab").removeClass("inactive-tab");
    $("#log-tab").addClass("active-tab");

    $("#node-tab").addClass("inactive-tab");
    $("#node-tab").removeClass("active-tab");
}


$(document).ready(function () {
    $("#node-tab").on('click',function () {
        showChartArea();
        hideTextArea();
    })
});
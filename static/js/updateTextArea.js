function appendNewLine(text) {
    $("#log-text").append("<p-2>"+text+"</p-2>");
    $("#log-text").scrollTop($("#log-text")[0].scrollHeight);
}

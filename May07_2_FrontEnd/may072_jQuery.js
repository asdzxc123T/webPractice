var totalPage;
var currentPage = 1;
function connectMachineRegEvent() {
    $("button").click(function() {
        var c = $("#color").val();
        var s = $("#status").val();
        var url = "http://localhost:8888/may07.reg?color=" + c + "&status=" + s;
        $.getJSON(url, function(result) {
            alert(JSON.stringify(result));
        });
        $("input").val("");
        $("textarea").val("");
        connectMachineGetCountEvent();
        connectMachineGetEvent(currentPage);
    });
}

function connectMachineGetCountEvent() {
    var url = "http://localhost:8888/may07.get.count";
    $.getJSON(url, function(result) {
        $("#pageNum").remove();
        $("#contentArea").append($("<table></table>").attr("id", "pageNum").attr("align", "center"));
        var tr = $("<tr></tr>");
        for (var i = 1; i <= result["pageCount"]; i++) {
            tr.append($("<td></td>").attr("class", "page").attr("onclick", "connectMachineGetEvent(" + i + ")").text(i));
        }
        $("#pageNum").append(tr);
        totalPage = result["pageCount"];
    })
}

function connectMachineGetSearchCountEvent() {
    var searchTxt = $("#search").val();
    var url = "http://localhost:8888/may07.get.count.search?searchTxt=" + searchTxt;
    $.getJSON(url, function(result) {
        $("#pageNum").remove();
        $("#contentArea").append($("<table></table>").attr("id", "pageNum").attr("align", "center"));
        var tr = $("<tr></tr>")
        for (var i = 1; i <= result["pageCount"]; i++) {
            tr.append($("<td></td>").attr("class", "page").attr("onclick", "connectMachineGetSearchEvent(" + i + ")").text(i));
        }
        $("#pageNum").append(tr);
        totalPage = result["pageCount"];
    })
}

function connectMachineGetEvent(i) {
    var url = "http://localhost:8888/may07.get.all?pageNum=" + i;
    $.getJSON(url, function(result) {
        $("#machines").empty();
        $.each(result, function(j, m) {
            var br1 = $("<br>");
            var br2 = $("<br>");
            var li1 = $("<li></li>").attr("data-role", "list-divider").text(m["no"]);
            var li2 = $("<li></li>").append($("<a></a>").attr("href", "#detailPage").attr("onclick", "connectMachineDetailEvent(" + m.no + ")").append(m.color, br1, m.status, br2, m.date));
            $("#machines").append(li1, li2);
        });
        $("#machines").listview("refresh");
    });
    $(window).scrollTop(0);
    currentPage = i;
}

function connectMachineGetSearchEvent(i) {
    var searchTxt = $("#search").val();
    var url = "http://localhost:8888/may07.get.search?pageNum=" + i + "&searchTxt=" + searchTxt;
    $.getJSON(url, function(result) {
        $("#machines").empty();
        $.each(result, function(j, m) {
            var br1 = $("<br>");
            var br2 = $("<br>");
            var li1 = $("<li></li>").attr("data-role", "list-divider").text(m["no"]);
            var li2 = $("<li></li>").append($("<a></a>").attr("href", "#detailPage").attr("onclick", "connectMachineDetailEvent(" + m.no + ")").append(m.color, br1, m.status, br2, m.date));
            $("#machines").append(li1, li2);
        });
        $("#machines").listview("refresh");
    });
    $(window).scrollTop(0);
    currentPage = i;
}

function connectMachineSearchEvent() {
    $("#search").keyup(function() {
        currentPage = 1;
        if ($("#search").val() == "") {
            connectMachineGetCountEvent();
            connectMachineGetEvent(currentPage);
        }
        else {
            connectMachineGetSearchCountEvent();
            connectMachineGetSearchEvent(currentPage);
        }
    });
}

function connectMachineDetailEvent(i) {
    $(window).scrollTop(0);
    var url = "http://localhost:8888/may07.get.detail?n=" + i;
    $.getJSON(url, function(result) {
        $("#detailContentAreaUl").empty();
        var li1 = $("<li></li>").attr("data-role", "list-divider").text(result.no);
        var li2 = $("<li></li>").append(result.color);
        var li3 = $("<li></li>").append(result.status);
        var li4 = $("<li></li>").append(result.date);
        $("#detailContentAreaUl").append(li1, li2, li3, li4);
        $("#detailContentAreaUl").listview("refresh");
    });
}

$(function() {
    connectMachineRegEvent();
    connectMachineGetCountEvent();
    connectMachineGetEvent(currentPage);
    connectMachineSearchEvent();
});
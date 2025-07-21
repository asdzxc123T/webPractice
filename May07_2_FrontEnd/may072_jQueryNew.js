var totalPage;
var currentPage = 1;
var isSearching = 0;
function connectMachineRegEvent() {
    $("#regButton").click(function() {
        var c = $("#color").val();
        var s = $("#status").val();
        var url = "http://localhost:8888/may07.reg?color=" + c + "&status=" + s;
        $.getJSON(url, function(result) {
            alert(JSON.stringify(result));
        });
        $("input").val("");
        $("textarea").val("");
        isSearching = 0;
        connectMachineGetCountEvent();
        connectMachineGetEvent(currentPage);
    });
}

function connectMachineGetCountEvent() {
    var url = "http://localhost:8888/may07.get.count";
    $.getJSON(url, function(result) {
        totalPage = result["pageCount"];
    })
    isSearching = 0;
}

function connectMachineGetSearchCountEvent() {
    var searchTxt = $("#search").val();
    var url = "http://localhost:8888/may07.get.count.search?searchTxt=" + searchTxt;
    $.getJSON(url, function(result) {
        totalPage = result["pageCount"];
    })
    isSearching = 1;
}

function connectMachineGetEvent(i) {
    var url = "http://localhost:8888/may07.get.all?pageNum=" + i;
    $.getJSON(url, function(result) {
        $.each(result, function(j, m) {
            var br1 = $("<br>");
            var br2 = $("<br>");
            var li1 = $("<li></li>").attr("data-role", "list-divider").text(m["no"]);
            var li2 = $("<li></li>").append($("<a></a>").attr("href", "#detailPage").attr("onclick", "connectMachineDetailEvent(" + m.no + ")").append(m.color, br1, m.status, br2, m.date));
            $("#machines").append(li1, li2);
        });
        $("#machines").listview("refresh");
    });
    currentPage = i;
}

function connectMachineGetSearchEvent(i) {
    var searchTxt = $("#search").val();
    var url = "http://localhost:8888/may07.get.search?pageNum=" + i + "&searchTxt=" + searchTxt;
    $.getJSON(url, function(result) {
        $.each(result, function(j, m) {
            var br1 = $("<br>");
            var br2 = $("<br>");
            var li1 = $("<li></li>").attr("data-role", "list-divider").text(m["no"]);
            var li2 = $("<li></li>").append($("<a></a>").attr("href", "#detailPage").attr("onclick", "connectMachineDetailEvent(" + m.no + ")").append(m.color, br1, m.status, br2, m.date));
            $("#machines").append(li1, li2);
        });
        $("#machines").listview("refresh");
    });
    currentPage = i;
}

function loadPage() {
    currentPage = 1;
    if ($("#search").val() == "") {
        $("#machines").empty();
        connectMachineGetCountEvent();
        connectMachineGetEvent(currentPage);
    }
    else {
        $("#machines").empty();
        connectMachineGetSearchCountEvent();
        connectMachineGetSearchEvent(currentPage);
    }
}

function connectMachineSearchEvent() {
    $("#search").keyup(function() {
        loadPage();
    });
}

function connectMachineDetailEvent(i) {
    var url = "http://localhost:8888/may07.get.detail?n=" + i;
    $.getJSON(url, function(result) {
        $("#detailContentAreaUl").empty();
        var li1 = $("<li></li>").attr("data-role", "list-divider").attr("id", "updateNo").text(result.no);
        var li2 = $("<li></li>").append("Color : ", $("<input>").attr("id", "updateColor").attr("value", result.color)); // .attr(readonly) 붙이면 input 형태이되 수정 불가능하게 설정 가능
        var li3 = $("<li></li>").append("Status : ", $("<input>").attr("id", "updateStatus").attr("value", result.status));
        var li4 = $("<li></li>").append("Date : ", result.date);
        $("#detailContentAreaUl").append(li1, li2, li3, li4);
        $("#detailContentAreaUl").listview("refresh");
    });
}

function connectMachineUpdateEvent() {
    $("#updateButton").click(function() {
        var updateNo = $("#updateNo").text();
        var updateColor = $("#updateColor").val();
        var updateStatus = $("#updateStatus").val();
        var url = "http://localhost:8888/may07.update?updateNo=" + updateNo + "&updateColor=" + updateColor + "&updateStatus=" + updateStatus;
        $.getJSON(url, function(result) {
            alert(result.result);
        });
        loadPage();
        $.mobile.changePage("#mainPage");
    });
}

function connectMachineDeleteEvent() {
    $("#deleteButton").click(function() {
        var deleteNo = $("#updateNo").text();
        var url = "http://localhost:8888/may07.delete?deleteNo=" + deleteNo;
        $.getJSON(url, function(result) {
            alert(result.result);
        });
        loadPage();
        $.mobile.changePage("#mainPage");
    });
}

$(function() {
    connectMachineRegEvent();
    connectMachineGetCountEvent();
    connectMachineGetEvent(currentPage);
    connectMachineSearchEvent();
    connectMachineUpdateEvent();
    connectMachineDeleteEvent();

    $(window).scroll(function() {
        var htmlHeight = $("#mainPage").height(); // 문서 전체 길이
        var browserHeight = $(window).height(); // 현재 창의 길이
        var scrollOffset = $(window).scrollTop(); // 현재 창의 위쪽 좌표
        var scrollOffsetBottom = scrollOffset + browserHeight; // 현재 창의 아래쪽 좌표

        if (htmlHeight > browserHeight && scrollOffsetBottom >= htmlHeight - 5 && currentPage < totalPage) {
            currentPage += 1;
            if (isSearching) {
                connectMachineGetSearchEvent(currentPage);
            }
            else {
                connectMachineGetEvent(currentPage);
            }
            
        }
    })
});
/*jslint plusplus: true */

"use strict";
var oNewsPager = {
    template: '<div><div class="post-meta"><span>@date</span></div><div class="post-header"><h2>@title</h2></div><div class="post-media"><img alt="News" src="@newsimagesrc"></div><div class="post-entry">@content</div></div>',
    pageIndex: 0,
    pagesize: 3
}, id,
    iTotalNews = 0,
    iIterator = 0,
    iMaxPageIndex,
    oNewsData = null,
    oNewsContainer,
    sScrollElement = "body,html",
    sLoadingClass = "Loading",
        oItalicBookName = [
                        "What I Did Not Learn in B-School: Insights for New Managers"
                        , "What I Did Not Learn at IIT: Transition from Campus to Workplace"
                        , "What I Did Not Learn at IIT - Transitioning from Campus to Workplace"
        ], iCount, iTotal = oItalicBookName.length;
function renderNews() {
    var iStart, iEnd, entry1, sDate, oDatePart, oDate, sTitle, sContent;
    oNewsContainer.removeClass(sLoadingClass);
    if (iTotalNews) {
        iStart = oNewsPager.pageIndex * oNewsPager.pagesize;
        if (iStart >= iTotalNews) {
            iStart = iTotalNews - 1;
            oNewsPager.pageIndex = iStart;
            if (iTotalNews > 1) {
                $("#Previous").removeClass("hidden");
                $("#Next").addClass("hidden");
            }
        } else if (iStart <= 0) {
            iStart = 0;
            oNewsPager.pageIndex = iStart;
            if (iTotalNews > 1) {
                $("#Next").removeClass("hidden");
                $("#Previous").addClass("hidden");
            }
        }
        iEnd = iStart + oNewsPager.pagesize;
        if (iEnd > iTotalNews) {
            iEnd = iTotalNews;
        }
        for (iIterator = iStart; iIterator < iEnd; iIterator++) {
            entry1 = oNewsData.getElementsByTagName('entry').item(iIterator);
            if (entry1) {
                sDate = entry1.getElementsByTagName('published')[0].childNodes[0].nodeValue.toLowerCase().split("t");
                oDatePart = [];
                if (sDate[0]) {
                    oDatePart = sDate[0].split("-");
                }
                oDate = null;
                if (oDatePart.length === 3) {
                    oDate = new Date(oDatePart[0], (oDatePart[1] - 1), oDatePart[2]);
                } else {
                    oDate = new Date(sDate[0]);
                }
                oDate = oDate.format();
                sTitle = entry1.getElementsByTagName('title')[0].childNodes[0].nodeValue;
                sContent = entry1.getElementsByTagName('content')[0].childNodes[0].nodeValue;
                for (iCount = 0; iCount < iTotal; iCount++) {
                    sTitle = sTitle.replace(oItalicBookName[iCount], "<i class='SemiBold'>" + oItalicBookName[iCount] + "</i>");
                }

                $("#bloggerContent").html(sContent);
                var bloggerContent = document.getElementById("bloggerContent");
                var imgs = bloggerContent.getElementsByTagName('img');
                var img, src = "";

                if (typeof imgs !== "undefined" && imgs.length > 0) {
                    img = imgs[0];
                    src = img.src;
                    img.parentNode.removeChild(img);
                }
                sContent = $("#bloggerContent").html();
                oNewsContainer.append(oNewsPager.template.replace("@title", sTitle).replace("@date", oDate).replace("@content", sContent).replace("@newsimagesrc", src));
            }
        }
        oNewsContainer.find("a").attr("target", "_blank");
        oNewsContainer.find("img").addClass("post - media");

        $('#LoadPageNews *').removeAttr('style');
    }
}
function loadNews(sNewsData) {
    try {
        var parser = new DOMParser();
        oNewsData = parser.parseFromString(sNewsData, "text/xml");
        iTotalNews = oNewsData.getElementsByTagName('entry').length;
        if (iTotalNews || oNewsData.getElementsByTagName('content')) {
            iMaxPageIndex = Math.round(iTotalNews / oNewsPager.pagesize);
            $("#Pagination").show();
            renderNews();
        }
    } catch (ignore) {
    }
}
function newsConstructor() {
    oNewsPager.pageIndex = 0;
    oNewsContainer = $("#LoadPageNews");
    var iTop = 0;
    id = getParameterByName("id")
    if (typeof id !== "undefined" && id !== "") {
        $(sScrollElement).animate({ scrollTop: iTop }, 500);
        oNewsPager.pageIndex = id > oNewsPager.pagesize ? 1 : 0;
    }
    $.ajax({
        url: 'https://www.blogger.com/feeds/2523158019509365490/posts/default/-/News',
        type: 'GET',
        dataType: 'jsonp',
        success: function (sResponse) {
            loadNews(sResponse);
            if (typeof id !== "undefined" && id !== "") {
                id = id > oNewsPager.pagesize ? id - oNewsPager.pagesize : id;
                iTop = $("#LoadPageNews").children('div').eq(id - 1).offset().top - 65;
                $(sScrollElement).animate({ scrollTop: iTop }, 500);
            }
        },
        complete: function () {
            oNewsContainer.removeClass(sLoadingClass);
        }
    });

    $("#Pagination p").click(function () {
        var oCurrentElement = $(this),
            iClicked = oCurrentElement.attr("data-clicked");
        if (!oCurrentElement.hasClass("hidden")) {
            if (iClicked === "0") {
                oNewsPager.pageIndex--;
                $("#Next").removeClass("hidden");
                if (oNewsPager.pageIndex <= 0) {
                    oNewsPager.pageIndex = 0;
                    $("#Previous").addClass("hidden");
                }
            } else {
                oNewsPager.pageIndex++;
                if (oNewsPager.pageIndex >= iMaxPageIndex) {
                    oNewsPager.pageIndex = iMaxPageIndex;
                    $("#Next").addClass("hidden");
                } else {
                    $("#Previous").removeClass("hidden");
                }
            }
            oNewsContainer.html("").addClass(sLoadingClass);
            iTop = oNewsContainer.offset().top - 65; // -65 for header/padding
            $(sScrollElement).animate({ scrollTop: iTop }, 500);
            renderNews();
        }
    });
};

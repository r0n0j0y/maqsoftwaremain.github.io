Date.prototype.format = function () {
    "use strict";
    var arrMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        sValue = arrMonths[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear();
    return sValue;
};

function getParameterByName(name) {
    "use strict";
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(decodeURIComponent(location.href));
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//function getParameterByNameSemicolon(name) {
//    "use strict";
//    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//    var regex = new RegExp("[\\?;]" + name + "=([^;#]*)"),
//        results = regex.exec(location.href);
//    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//}

function isCareersPage() {
    if ($('#careers').length) {
        return true;
    }
    return false;
}

function loadCareers(sNewsData, queryParam, oBreadCrumb, oJobTitle, career) {
    "use strict";
    try {
        var parser = new DOMParser(),
            oNewsData = parser.parseFromString(sNewsData, "text/xml"),
            entry1 = oNewsData.getElementsByTagName('entry').item(parseInt(queryParam)),
            sContent = '<div class="BorderBottom"><p class="SemiBold">' + entry1.getElementsByTagName('content')[0].childNodes[0].nodeValue + '</p></div>';
        oBreadCrumb.css("display", "block");
        oJobTitle.css("display", "block");
        $("#ProfileData").html(sContent);
        $('#ProfileData *').removeAttr('style');
    } catch (e) {
        window.location.href = career;
    }
}

function careersInUS() {
    "use strict";
    var sID = getParameterByName("q"),
        sJobPost = getParameterByName("pn"),
        oArticle = $("article[data-post=" + sID + "]");
    if (!oArticle.length) {
        oArticle = $("article[data-post=0]");
    }
    oArticle.show();
    if (!sJobPost || null === sJobPost) {
        sJobPost = oArticle.find(".JobTitle").text();
    }
    $("#RedMail").attr("href", "mailto:RedmondJobs@MAQSoftware.com?Subject=Application%20for%20the%20post%20of%20" + sJobPost).html("RedmondJobs@MAQSoftware.com");
}


function careersInInd() {
    "use strict";
    var oBreadCrumb, sBreadCrumbtext, oJobTitle, queryParam,
        sJobPost = getParameterByName("pn");
    $("#IndMail").attr("href", "mailto:IndiaJobs@MAQSoftware.com?Subject=Application%20for%20the%20post%20of%20" + sJobPost).html("IndiaJobs@MAQSoftware.com");
    oBreadCrumb = $("#BreadCrumb");
    oJobTitle = $("#JobTitle");
    sBreadCrumbtext = oBreadCrumb.html();
    try {
        oBreadCrumb.html(sBreadCrumbtext.replace("@title", sJobPost));
        oJobTitle.html(oJobTitle.html().replace("@title", sJobPost));
        queryParam = getParameterByName("q");
        if (typeof queryParam !== "undefined" && queryParam !== "") {
            $.ajax({
                url: 'https://www.blogger.com/feeds/2523158019509365490/posts/default/-/Openings - India',
                type: 'GET',
                dataType: "jsonp",
                success: function (msg) {
                    loadCareers(msg, queryParam, oBreadCrumb, oJobTitle, "/#careers#?q=India");
                },
                complete: function () {
                    $("#ProfileData").removeClass("Loading");
                }
            });
        } else {
            window.location.href = "/#careers#?q=India";
        }
    } catch (ex) {
        console.log(ex.message);
        setTimeout(careersInInd, 100);
    }
}

function redirectPowerBI() {
    window.location.href = "/#expertise/selfservicebi"; // Redirecting to Power BI Expertise
}
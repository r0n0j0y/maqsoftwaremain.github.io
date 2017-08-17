var oJobPostSection,
    oNewsData = null,
sTemplate = '<div class="accordion-section"><h6 class="accordion-title">@title</h6><div class="accordion-content">@content</div></div>'
    , sNoJobMessage = '<p class="DataSubContent Color595959">No job openings available at this location.<br />Please come back and check again soon.</p>'
    ,sJobServiceIssue = '<p class="DataSubContent Color595959">Issue in connecting to job-post service.<br />Try loading the section again.</p>';

function careersConstructor() {
    oJobPostSection = $("#tabs-2 .accordion");
    var feedUrl = "https://www.blogger.com/feeds/2523158019509365490/posts/default/-/Openings - India";
    $.ajax({
        url: feedUrl,
        type: 'GET',
        dataType: "jsonp",
        success: function (msg) {
            if (msg) {
                loadIndiaCareers(msg);
            } else {
                oJobPostSection.html(sNoJobMessage).removeClass("Loading").removeClass("LoadingHeight");
            }
        },
        error: function () {
            oJobPostSection.html(sJobServiceIssue).removeClass("Loading").removeClass("LoadingHeight");
        }
    });
}

function loadIndiaCareers(sNewsData) {
    var oTempData = [], parser;
    try {
        parser = new DOMParser();
        oNewsData = parser.parseFromString(sNewsData, "text/xml");

        if (oNewsData.getElementsByTagName('feed') && !oNewsData.getElementsByTagName('entry').length) {
            oTempData[0] = oNewsData.getElementsByTagName('entry');
            //oNewsData.feed.entry = oTempData;
        }
        renderTitle(oNewsData.getElementsByTagName('entry'));

    } catch (exception) {
        oJobPostSection.html(sNoJobMessage).removeClass("Loading").removeClass("LoadingHeight");
    }
    accordion();
}
function renderTitle(oData) {
    var oCurrentPost;
    oJobPostSection.html("").removeClass("Loading").removeClass("LoadingHeight");
    for (iIterator = 0; iIterator < oData.length; iIterator++) {
        oCurrentPost = oData.item(iIterator);
        oJobPostSection.append(sTemplate.replace(/@title/g, oCurrentPost.getElementsByTagName("title")[0].childNodes[0].nodeValue).replace(/@content/g, oCurrentPost.getElementsByTagName("content")[0].childNodes[0].nodeValue));
    }
    $("#tabs-2 .accordion *").removeAttr('style');
}
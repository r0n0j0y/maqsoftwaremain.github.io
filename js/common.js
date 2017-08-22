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

function redirectPowerBI() {
    window.location.href = "/#expertise/powerbi"; // Redirecting to Power BI Expertise
}

function setTabNavLinkBehavior() {
    $("#tabs .nav-link").click(function () {
        $("#tabs .nav-link").removeClass('active');
    });
}

function closeMenuIfOpen() {
    $("a, a *, #body, #body *").click(function () {
        if ($(this).hasClass("menu-has-sub")) {
            return; // return in case of sub menu header click
        }
        if ($(".nav-bar-icon").length && $(".nav-bar-icon").hasClass("active")) {
            $(".nav-bar-icon").removeClass("active");
            if ($(".nav-menu").length && $(".nav-menu").hasClass("active")) {
                $(".nav-menu").removeClass("active");
            }
            if ($(".nav-menu .nav-menu-inner .menu-opened").length) {
                $(".nav-menu .nav-menu-inner .menu-opened").removeClass("menu-opened");
            }
            if ($(".nav-menu .nav-menu-inner .fa-angle-up").length) {
                $(".nav-menu .nav-menu-inner .fa-angle-up").each(function () {
                    $(this).removeClass("fa-angle-up").addClass("fa-angle-down");
                })
            }
            if ($(".nav-menu .nav-menu-inner .sub-dropdown").length) {
                $(".nav-menu .nav-menu-inner .sub-dropdown").each(function () {
                    if ($(this).css('display') == 'block') {
                        $(this).css('display', 'none');
                    }
                })
            }
        }
    });
}
function isCareersPage() {
    if ($('#careers').length) {
        return true;
    }
    return false;
}
// Close menu if open
closeMenuIfOpen();

function updateTitle(viewName) {
    var sTitle = "Data Management, Power BI, Artificial Intelligence | MAQ Software";
    if (typeof viewName !== "undefined") {
        switch (viewName.toLowerCase()) {
            case "expertise":
                sTitle = "Expertise | MAQ Software";
                break;
            case "engagement":
                sTitle = "Engagement | MAQ Software";
                break;
            case "news":
                sTitle = "News | MAQ Software";
                break;
            case "careers":
                sTitle = "Careers | MAQ Software";
                break;
            case "contact":
                sTitle = "Contact | MAQ Software";
                break;
            case "privacystatement":
                sTitle = "Privacy Statement | MAQ Software";
                break;
        }
    }
    $("title").text(sTitle);
}
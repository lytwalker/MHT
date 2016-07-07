$(function() { // Same as document.addEventListener("DOMContentLoaded"...

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#menu-nav-button").blur(function(event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#menu-navbar-collapse").collapse('hide');
        }
    });
});

(function(global) {

    var main = {};

    // snippets
    var home_Html = "snippets/pages/home-snippet.html";
    var about_Html = "snippets/pages/about-snippet.html";
    var contact_Html = "snippets/pages/contact-snippet.html";
    var help_Html = "snippets/pages/help-snippet.html";

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function(event) {

        // On first load, show home view
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            home_Html,
            function(responseText) {
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    });

    // Load the about view
    main.loadAbout = function(productId) {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            about_Html,
            function(responseText) {
                // Switch CSS class active to menu button
                $helper.switchMenuToActive("About");
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    };

    // Load the about view
    main.loadContact = function(productId) {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            contact_Html,
            function(responseText) {
                // Switch CSS class active to menu button
                $helper.switchMenuToActive("Contact");
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    };

    // Load the help view
    main.loadHelp = function(productId) {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            help_Html,
            function(responseText) {
                // Switch CSS class active to menu button
                $helper.switchMenuToActive("Home");
                document.querySelector("#main-content")
                    .innerHTML = responseText;
            },
            false);
    };


    global.$main = main;

})(window);

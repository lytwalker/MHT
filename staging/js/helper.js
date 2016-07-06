(function(global) {

    var helper = {};

    // Remove the class 'active' from home and switch to Menu button
    helper.switchMenuToActive = function(buttonClass) {
        // Remove 'active' from home button
        var classes = document.querySelector(".active").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector(".active").className = classes;

        if (buttonClass === 'Wigs') { buttonClass = "Styles"; }
        if (buttonClass === 'Extensions') { buttonClass = "Styles"; }
        if (buttonClass === 'Closures') { buttonClass = "Styles"; }
        // Add 'active' to menu button if not already there
        var buttonClassName = "." + buttonClass + "Button";
        console.log("buttonClassName: " + buttonClassName);
        classes = document.querySelector(buttonClassName).className;
        if (classes.indexOf("active") == -1) {
            classes += " active";
            document.querySelector(buttonClassName).className = classes;
        }
    };

    // Convenience function for inserting innerHTML for 'select'
    helper.insertHtml = function(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    helper.showLoading = function(selector) {
        var html = "<div class='text-center'>";
        html += "<br/><img src='images/ajax-loader.gif'><br/><br/></div>";
        $helper.insertHtml(selector, html);
    };

    // Return substitute of '{{propName}}' 
    // with propValue in given 'string' 
    helper.insertProperty = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    // Appends price with '$' if price exists
    helper.insertItemPrice = function(html, pricePropName, priceValue) {
        // If not specified, replace with empty string
        if (!priceValue) {
            return this.insertProperty(html, pricePropName, "");;
        }

        priceValue = "£" + priceValue.toFixed(2);
        html = this.insertProperty(html, pricePropName, priceValue);
        return html;
    }


    global.$helper = helper;

})(window);

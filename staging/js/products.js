(function(global){


	// daabase
    var categories_Json_Url = "db/categories.json";
    var products_Json_Url = "db/product-items.json";

	// global
	var products = {};

	// snippets
    var page_Header_Html = "snippets/page-header.html";
    var product_Html = "snippets/product.html";
    var product_Details_Html = "snippets/product-details.html";

	// properties
    var categories_Data = "";
    var chosen_Category_Id = "";
    var filtered_Products_Data = "";


    // -- FILTER METHODS --

    // Load the category types view
    function loadCategories() {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            categories_Json_Url,
            function(categories){
    			categories_Data = categories.categories;
            });
    };

	// Filter
    var filterProductsByCategory = function(jsonArray, categoryId) {
        // -- get current category
        var categoryJson = $.grep(categories_Data, function(element, index) {
            return element.id == categoryId;
        });
        var chosenCategoryData = categoryJson[0];
        var chosenCategoryJson =
            '\"category\": {' +
            '\"id\": ' + chosenCategoryData.id + ',' +
            '\"typeName\": \"' + chosenCategoryData.typeName + '\",' +
            '\"name\": \"' + chosenCategoryData.name + '\",' +
            '\"description\": \"' + chosenCategoryData.description + '\",' +
            '\"url\": \"' + chosenCategoryData.url + '\"}}';

        // -- get final json array string
        var finalJsonArrayString = "{\"products\": ";
        var finalJsonArrayData = $.grep(jsonArray, function(element, index) {
            return element.category_id == categoryId;
        });
        finalJsonArrayString += JSON.stringify(finalJsonArrayData);
        finalJsonArrayString = finalJsonArrayString.replace(']', '], ' + chosenCategoryJson);
        finalJsonArrayData = jQuery.parseJSON(finalJsonArrayString);
        return finalJsonArrayData;
    }

    var getProductById = function(jsonArray, productId) {
        // -- get final json array string
        var finalJsonArrayData = $.grep(jsonArray, function(element, index) {
            return element.id == productId;
        });
        var finalJsonArrayString = JSON.stringify(finalJsonArrayData);
        finalJsonArrayData = jQuery.parseJSON(finalJsonArrayString);
        return finalJsonArrayData;
    }

    // -- FILTER METHODS -- END


    /// --- PRODUCT LIST VIEW

    // Load the menu items view
    // 'categoryId' is a short_name for a category
    products.loadProductList = function(categoryId) {
        $helper.showLoading("#main-content");
    	loadCategories();
        chosen_Category_Id = categoryId;
        $ajaxUtils.sendGetRequest(
            products_Json_Url,
            buildProductListHTML);
    };

    // Builds HTML for the single category page based on the data
    // from the server
    function buildProductListHTML(productListData) {
        // -- get list of products filtered by category Id.
        productListData = filterProductsByCategory(productListData.products, chosen_Category_Id);
        // -- store into global variable
        filtered_Products_Data = productListData;

        // Load title snippet of menu items page
        $ajaxUtils.sendGetRequest(
            page_Header_Html,
            function(page_Header_Html) {
                // Retrieve single menu item snippet
                $ajaxUtils.sendGetRequest(
                    product_Html,
                    function(product_Html) {
                        // Switch CSS class active to menu button
                        $helper.switchMenuToActive();

                        var menuItemsViewHtml =
                            showProductListHTML(productListData,
                                page_Header_Html,
                                product_Html);
                        $helper.insertHtml("#main-content", menuItemsViewHtml);
                    },
                    false);
            },
            false);
    }


    // Using category and menu items data and snippets html
    // build menu items view HTML to be inserted into page
    function showProductListHTML(productListData,
        page_Header_Html,
        product_Html) {

        page_Header_Html = $helper.insertProperty(page_Header_Html, "name", productListData.category.name);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "description", productListData.category.description);

        var finalHtml = page_Header_Html;
        finalHtml += "<div class='container-fluid'><section class='row'>";

        // Loop over menu items
        var menuItems = productListData.products;
        for (var i = 0; i < menuItems.length; i++) {
            // Insert menu item values
            var html = product_Html;
            html = $helper.insertProperty(html, "product_id", menuItems[i].id);
            html = $helper.insertProperty(html, "category_id", menuItems[i].category_id);
            html = $helper.insertProperty(html, "thumb", menuItems[i].thumb);
            html = $helper.insertProperty(html, "name", menuItems[i].name);
            html = $helper.insertItemPrice(html, "price", menuItems[i].price);
            finalHtml += html;
        }

        finalHtml += "</section></div>";
        return finalHtml;
    }

    /// --- PRODUCT LIST VIEW --- END


    /// --- PRODUCT DETAILS VIEW

    // Load the item's details view
    // 'productId' is an id for a product
    products.loadProductDetails = function(productId) {
        $helper.showLoading("#main-content");
        buildProductDetailsHTML(productId)
    };

    // Builds HTML for the single product details page based on the data
    // from the filtered products data
    function buildProductDetailsHTML(productId) {
        // -- get product details by product Id. Store it in global variable
        productDetailsData = getProductById(filtered_Products_Data.products, productId);

        if (productDetailsData.length > 0) {
            // product details data
            var productDetailsData = productDetailsData[0];

            // Load title snippet of menu items page
            $ajaxUtils.sendGetRequest(
                page_Header_Html,
                function(page_Header_Html) {
                    // Retrieve single menu item snippet
                    $ajaxUtils.sendGetRequest(
                        product_Details_Html,
                        function(product_Details_Html) {
                            // Switch CSS class active to menu button
                            $helper.switchMenuToActive();

                            var productDetailsViewHtml =
                                showProductDetailsHTML(productDetailsData,
                                    page_Header_Html,
                                    product_Details_Html);
                            $helper.insertHtml("#main-content", productDetailsViewHtml);
                        },
                        false);
                },
                false);
        }
    }


    // Using products data and products-details snippets html
    // build menu items view HTML to be inserted into page
    function showProductDetailsHTML(productDetailsData,
        page_Header_Html,
        product_Details_Html) {

        page_Header_Html = $helper.insertProperty(page_Header_Html, "name", productDetailsData.name);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "description", filtered_Products_Data.category.name);
        console.log("productDetailsData: " + JSON.stringify(productDetailsData.preview));

        var finalHtml = page_Header_Html;
        finalHtml += "<div class='container-fluid'><section class='row'>";

        // Insert product details values
        var html = product_Details_Html;
        html = $helper.insertProperty(html, "product_id", productDetailsData.id);
        html = $helper.insertProperty(html, "protrait", productDetailsData.preview);
        html = $helper.insertProperty(html, "name", productDetailsData.name);
        html = $helper.insertProperty(html, "category_id", productDetailsData.category_id);
        html = $helper.insertItemPrice(html, "price", productDetailsData.price);
        html = $helper.insertProperty(html, "description", productDetailsData.description);
        html = $helper.insertProperty(html, "sku", productDetailsData.sku);
        finalHtml += html;
        

        finalHtml += "</section></div>";
        return finalHtml;
    }


    /// --- PRODUCT DETAILS VIEW --- END



	global.$products = products;

})(window);
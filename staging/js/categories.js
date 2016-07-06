(function(global) {

	// global
	var categories = {};

    // database
    var category_types_Json_Url = "db/category-types.json";
    var categories_Json_Url = "db/categoryList.json";

	// snippets
    var page_Header_Html = "snippets/page-header.html";
    var category_Html = "snippets/category-snippet.html";

	// properties
    var category_Types_Data = "";
    var chosen_Category_Type = "";
    var filtered_Categories_Data = "";


    // -- FILTER METHODS --

    // Load the category types view
    function loadCategoryTypes() {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            category_types_Json_Url,
            function(categoryTypes){
            	category_Types_Data = categoryTypes;
            });
    };

	// Filter
    var filterCategoriesByTypeId = function(jsonArray, typeName) {
        // -- get current category
        var categoryTypeJson = $.grep(category_Types_Data, function(element, index) {
            return element.name === typeName;
        });
        var chosenCategoryTypeData = categoryTypeJson[0];
        var chosenCategoryTypeJson =
            '\"categorytype\": {' +
            '\"id\": ' + chosenCategoryTypeData.id + ',' +
            '\"name\": \"' + chosenCategoryTypeData.name + '\",' +
            '\"description\": \"' + chosenCategoryTypeData.description + '\",' +
            '\"url\": \"' + chosenCategoryTypeData.url + '\"}}';

        // -- get final json array string
        var finalJsonArrayString = "{\"categories\": ";
        var finalJsonArrayData = $.grep(jsonArray, function(element, index) {
            return element.typeName == typeName;
        });
        finalJsonArrayString += JSON.stringify(finalJsonArrayData);
        finalJsonArrayString = finalJsonArrayString.replace(']', '], ' + chosenCategoryTypeJson);
        finalJsonArrayData = jQuery.parseJSON(finalJsonArrayString);
        return finalJsonArrayData;
    }

    // -- FILTER METHODS -- END


    // Load the categories view
    categories.loadCategoryList = function(categoryName) {
        $helper.showLoading("#main-content");
    	loadCategoryTypes();
    	chosen_Category_Type = categoryName;
        $ajaxUtils.sendGetRequest(
            categories_Json_Url,
            buildCategoryListHTML);
    };

    // Builds HTML for the categories page based on the data
    // from the server
    function buildCategoryListHTML(categoriesData) {
        filtered_Categories_Data = filterCategoriesByTypeId(categoriesData.categories, chosen_Category_Type);

        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            page_Header_Html,
            function(page_Header_Html) {
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    category_Html,
                    function(category_Html) {
                        // Switch CSS class active to menu button
                        $helper.switchMenuToActive();

                        var categoriesViewHtml =
                            showCategoryListHTML(filtered_Categories_Data,
                                page_Header_Html,
                                category_Html);
                        $helper.insertHtml("#main-content", categoriesViewHtml);
                    },
                    false);
            },
            false);
    }


    // Using categories data and snippets html
    // build categories view HTML to be inserted into page
    function showCategoryListHTML(categoryData,
        page_Header_Html,
        category_Html) {

        page_Header_Html = $helper.insertProperty(page_Header_Html, "name", categoryData.categorytype.name);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "description", categoryData.categorytype.description);

        var finalHtml = page_Header_Html;
        finalHtml += "<div class='container-fluid'><section class='row list'>";

        // Loop over categories
        var categoryItems = categoryData.categories;
        for (var i = 0; i < categoryItems.length; i++) {
            // Insert category values
            var html = category_Html;
            var name = "" + categoryItems[i].name;
            var thumb = "" + categoryItems[i].thumb;
            var category_id = categoryItems[i].id;
            html = $helper.insertProperty(html, "name", name);
            html = $helper.insertProperty(html, "thumb", thumb);
            html = $helper.insertProperty(html, "category_id", category_id);
            finalHtml += html;
        }

        finalHtml += "</section></div>";
        return finalHtml;
    }



	global.$categories = categories;

})(window);
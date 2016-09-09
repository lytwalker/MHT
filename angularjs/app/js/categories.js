(function(global) {

	// global
	var categories = {};

    // database
    var types_Json_Url = "https://mandyshairtreasures-cms.herokuapp.com/types.json";
    var categories_Json_Url = "https://mandyshairtreasures-cms.herokuapp.com/categories.json";

	// snippets
    var page_Header_Html = "snippets/page-header.html";
    var category_Html = "snippets/category-snippet.html";

	// properties
    var types_Data = "";
    var chosen_Type = "";
    var chosen_Type_Data = "";
    var filtered_Categories_Data = "";


    // -- FILTER METHODS --

    // Load the types view
    function loadTypes() {
        $helper.showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            types_Json_Url,
            function(types){
            	types_Data = types;
            });
    };

	// Filter
    var filterCategoriesByTypeName = function(jsonArray, typeName) {
        // -- get current category
        var type_Json = $.grep(types_Data, function(element, index) {
            return element.name === typeName;
        });
        chosen_Type_Data = type_Json[0];

        // -- get categories with the same type_id as the chosen_Type_data
        var filter_Json_Array_Data = $.grep(jsonArray, function(element, index) {
            return element.type_id == chosen_Type_Data.id;
        });

        return filter_Json_Array_Data;
    }

    // -- FILTER METHODS -- END


    // Load the categories view
    categories.loadCategoryList = function(categoryName) {
        $helper.showLoading("#main-content");
    	loadTypes();
    	chosen_Type = categoryName;
        $ajaxUtils.sendGetRequest(
            categories_Json_Url,
            buildCategoryListHTML);
    };

    // Builds HTML for the categories page based on the data
    // from the server
    function buildCategoryListHTML(categoriesData) {
        filtered_Categories_Data = filterCategoriesByTypeName(categoriesData, chosen_Type);

        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            page_Header_Html,
            function(page_Header_Html) {
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    category_Html,
                    function(category_Html) {
                        // Switch CSS class active to menu button
                        $helper.switchMenuToActive(chosen_Type);

                        var categoriesViewHtml =
                            showCategoryListHTML(
                                filtered_Categories_Data,
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

        page_Header_Html = $helper.insertProperty(page_Header_Html, "type", "types");
        page_Header_Html = $helper.insertProperty(page_Header_Html, "name", chosen_Type_Data.name);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "banner", chosen_Type_Data.banner);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "pagetitle", chosen_Type_Data.name);
        page_Header_Html = $helper.insertProperty(page_Header_Html, "description", chosen_Type_Data.description);

        var finalHtml = page_Header_Html;
        finalHtml += "<div class='container-fluid'><section class='row list'>";

        // Loop over categories
        var categoryItems = categoryData;
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
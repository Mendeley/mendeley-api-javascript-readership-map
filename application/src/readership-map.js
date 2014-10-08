

'use strict';

var populateDropdown = function (docs) {
    var i, len, doc, identifierType, identifierValue,
    	popup_menu = document.getElementById("user_doc_popup");
    for (i = 0, len = docs.length, doc; i < len; i+=1) {
    	doc = docs[i];
    	if (doc.identifiers) {
    		if (doc.identifiers.arxiv) {
	    		identifierType = "arxiv";
	    		identifierValue = doc.identifiers.arxiv;
	    	}
	    	if (doc.identifiers.doi) {
	    		identifierType = "doi";
	    		identifierValue = doc.identifiers.doi;
	    	}
	    }
    	if (identifierType) {
	        var option = document.createElement("option");
			option.textContent = doc.title;	
			option.setAttribute("data-identifier-type", identifierType);
			option.value = identifierValue;	
			popup_menu.appendChild(option);			
    	}        
    }
    $("#user_doc_popup").trigger("change");
};

var updateMap = function (stats) {
	var arrayData = {},
		maxCount = 0,
		ratio;
	$.each(stats, function(i, obj) {
		if (obj.reader_count_by_country) {
			for (var property in obj.reader_count_by_country) {
				if(arrayData[property]) {
					arrayData[property] += obj.reader_count_by_country[property];
				} else {
					arrayData[property] = obj.reader_count_by_country[property];
				}
				maxCount = Math.max(maxCount, arrayData[property]);
			}
		}
	});
	var map_regions = map.contentDocument.getElementsByClassName('land');
	for (var index = 0; index < map_regions.length; index++) {
		var map_region = map_regions[index].getAttribute("title");
		if (arrayData[map_region]) {
			ratio = arrayData[map_region]/maxCount;
			map_regions[index].style.fill = "rgba(157, 22, 32, " + ratio + ")";
		} else {
			map_regions[index].style.fill = "rgb(204,204,204)";
		}
	}
};

var errorHandler = function (req, res) {
    var response;
    console.error('Request failed with status code:', res.status);
    if (res && res.responseText) {
        response = JSON.parse(res.responseText);
        if (response.hasOwnProperty('message')) {
            console.error('Response error message:', response.message);
        } else {
            console.info('No response error message received');
        }
    } else {
        console.info('No response body received');
    }
};

var getDocuments = function () {
    MendeleySDK.API.documents
        .list()
        .done(populateDropdown)
        .fail(errorHandler);
};

var getCatalog = function (event) {
	var identifierType = this.selectedOptions.item(0).dataset.identifierType,
		identifierValue = this.value,
		uriArgs = {};
	uriArgs[identifierType] = identifierValue;
	uriArgs["view"] = "stats";
	MendeleySDK.API.catalog
	.search(uriArgs)
	.done(updateMap)
	.fail(errorHandler);
	event.preventDefault();
}
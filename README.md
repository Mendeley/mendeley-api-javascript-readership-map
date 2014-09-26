# Readership Locations

This is a simple example of an application that consumes the [Mendeley](http://www.mendeley.com) API.  For more information about the API, see the [developer portal](http://dev.mendeley.com).

We have a version of it hosted [here](http://mendeley-locations.herokuapp.com) 

## About the application

A JavaScript example page showing document reader locations are plotted onto a world map. The example takes advantage of matching country names in the SVG map and the reading statistics by country of a *catalog* document.

	** API response **
	"reader_count_by_country": {
	      "Ireland": 2,
	      "United Kingdom": 1
	 }
	 
	 ** SVG document **
	 <path id="GB" title="United Kingdom" class="land" d="M459.38,281l-1.5,3.29l-2.12,-0.98l-1.73…" />
	 <path id="IE" title="Ireland" class="land" d="M457.88,284.29L458.34,287.65L456.22,291.77L451…" />

This sample code illustrates:

* using the API from Javascript as a client side app
* implicit OAuth flow to obtain an access token
* fetching user documents
* requesting readership statistics for catalog documents


## How to run


1. Host the HTML file and SVG on a web server—this can be a local server running on your workstation.
* Register your client at the Mendeley [developer portal](http://dev.mendeley.com/yourapps.html). The value for Redirect URL must be the location you hosted the page at in the previous step.
* Edit the Javascript, in the HTML file, and replace the value ("777") for the variable `mendeley_app_id` *(line 8)* with your application ID from the developer portal.
* Ensure you have a number of documents imported from the catalog in your Mendeley library. A document must have a DOI identifier to be included in the sample tool.
* Open the page in your web browser.
		
## Suggestions for exploration

Once you've understood how the sample code works, try enhancing it by:

* Cache the results of catalog document responses to avoid repeatedly performing identical API requests each time the user changes document in the popup menu
* Use a map color with an alpha value appended `rgba(157, 22, 32, 0.5)` to fill country regions with a color that reflects the relative number of readers

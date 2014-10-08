# Readership Locations

This is a simple example of an application that consumes the [Mendeley](http://www.mendeley.com) API.  For more information about the API, see the [developer portal](http://dev.mendeley.com).

This is a revised version, now using [the Mendeley Javascript SDK](https://github.com/Mendeley/mendeley-javascript-sdk) to communicate with the server.

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

1. Clone this git repository onto your machine.
2. Using [bower](http://bower.io/) run the following command:

        $ bower install

3. Go to [the Mendeley developers site](http://dev.mendeley.com), sign-in with your Mendeley account details and click on "My Apps" and follow the instructions to register a new application and get your ClientID.
  * Note: The default server address is <em>http://localhost:8111/application/</em>
4. Run this command:

        $ cp bower_components/mendeley-javascript-sdk/examples/oauth-config.implicit-grant.js.dist application/oauth-config.js

5. Fill in your ClientID in the <em>application/oatuh-config.js</em> file.
6. Run the following commands: 

        $ npm install
        $ npm start

7. Go to <em>http://localhost:8111/application/</em> in your browser and you should be redirected to log-in to Mendeley. Once logged in you'll be redirected back to the application.
		
## Suggestions for exploration

Once you've understood how the sample code works, try enhancing it by:

* Cache the results of catalog document responses to avoid repeatedly performing identical API requests each time the user changes document in the popup menu
* Use a map color with an alpha value appended `rgba(157, 22, 32, 0.5)` to fill country regions with a color that reflects the relative number of readers

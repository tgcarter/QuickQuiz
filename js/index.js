var feedURL = "https://www.metaweather.com/api/location/44418/";

$(document).on('pagecreate', '#feedPage', function(event) {
	
	
	<!-- Use an HTML GET request to obtain data from a Yahoo Pipe
	<!-- The Yahoo pipe currently parses the BBC News RSS feed  -->
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", feedURL, false);
	xmlhttp.send();
		
		
	<!-- parse the resulting JSON into Javascript Data Object -->
	<!-- you can use a live parser to inspect the contents of the JSON
	<!-- http://json.parser.online.fr/ -->
	var weather= JSON.parse(xmlhttp.responseText);
	
	
	<!-- Define Ractive binding -->
	var ractive = new Ractive({
    	el: 'container', <!-- where -->
    	template: '#myTemplate', <!-- how -->
    	data: { weather : weather.consolidated_weather } <!-- what - specify the list of news articles 'items' using dot notation-->
	});
	
});